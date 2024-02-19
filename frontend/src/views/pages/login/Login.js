import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormCheck,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { ClientEnum } from "../../../ClientEnum";
import DefaultService from "../../../services/DefaultService";
import TeacherService from "src/services/TeacherService";
import StudentService from "src/services/StudentService";
import Swal from "sweetalert2";
import googleLogo from "src/views/icons/google.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: ClientEnum.GOOGLE_CLIENT_ID,
      callback: handleSubmit,
    });
  }, []);

  const handleSignInClick = async () => {
    // save email password to local storage
    const tempData = {
      email: email,
      password: password,
    };
    localStorage.setItem("tempData", JSON.stringify(tempData));

    try {
      await google.accounts.id.prompt();
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  const handleSubmit = async (googleResponse) => {
    const currentUserData = JSON.parse(localStorage.getItem("tempData"));
    localStorage.removeItem("tempData");

    const payload = {
      email: currentUserData.email,
      password: currentUserData.password,
      googleToken: googleResponse.credential,
    };

    const response = await DefaultService.instance.login(payload);

    if (response.status) {
      const type = response.data.role;

      const currentUserData = {
        email: email,
        role: type,
        userJWT: response.data.token,
      };
      localStorage.setItem("currentUserData", JSON.stringify(currentUserData));
      if (type === ClientEnum.ADMIN_TYPE) {
        navigate("/admin/user/inactive-user-list", { replace: true });
      } else if (type === ClientEnum.TEACHER_TYPE) {
        const teacherData = await TeacherService.instance.getTeacherByEmail({
          email: email,
        });

        if (!teacherData.data.faculty) {
          Swal.fire({
            icon: "success",
            title: "Incomplete Profile.",
            text: "You are a teacher.Please update your profile first!",
          }).then(() => {
            navigate("/teacher/profile/update-profile", {
              replace: true,
            });
          });
        } else {
          navigate("/teacher/advisee/requested-advisee-list", {
            replace: true,
          });
        }
      } else if (type === ClientEnum.STUDENT_TYPE) {
        const studentData = await StudentService.instance.getStudentByEmail({
          email: email,
        });

        if (!studentData.data.department) {
          Swal.fire({
            icon: "success",
            title: "Incomplete Profile.",
            text: "You are a student.Please update your profile first!",
          }).then(() => {
            navigate("/student/profile/update-profile", {
              replace: true,
            });
          });
        } else {
          navigate("/student/advisor/available-advisor-list", {
            replace: true,
          });
        }
      }
    } else {
      Swal.fire({
        title: "Failed!",
        text: "Invalid credentials. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">
                      Sign In to your account
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="exampleFormControlInput1"
                        placeholder="name@example.com"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="exampleFormControlInput2"
                        placeholder="******"
                      />
                    </CInputGroup>
                    <div className="mb-3">
                      <CButton
                        color="primary"
                        className="px-4"
                        onClick={handleSignInClick}
                        style={{
                          width: "100%",
                          backgroundColor: "white",
                          color: "black",
                          borderColor: "black",
                          borderRadius: "25px",
                          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          transition:
                            "background-color 0.3s, color 0.3s, border-color 0.3s",
                        }}
                        onMouseEnter={() => {
                          document.getElementById(
                            "googleButton",
                          ).style.backgroundColor = "#b1b1b1";
                        }}
                        onMouseLeave={() => {
                          document.getElementById(
                            "googleButton",
                          ).style.backgroundColor = "white";
                        }}
                        id="googleButton"
                      >
                        <img
                          src={googleLogo}
                          alt="Google logo"
                          style={{ marginRight: "10px", height: "1.5em" }}
                        />
                        Sign in with Google authorization
                      </CButton>
                    </div>
                    <CRow className="text-end">
                      <p>
                        Don't have an account?
                        <Link to="/register"> Register </Link>
                      </p>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
