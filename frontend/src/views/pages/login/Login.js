import React, { useState } from "react";
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

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async () => {
    const payload = {
      email: email,
      password: password,
      role: type,
    };
    const response = await DefaultService.instance.login(payload);

    if (response.status) {
      const currentUserData = {
        email: email,
        role: type,
        userJWT: response.data,
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
            text: "Please update your profile first!",
          }).then(() => {
            navigate("/teacher/profile/update-profile", {
              state: { email: email },
              replace: true,
            });
          });
        } else {
          navigate("/teacher/profile/update-profile", {
            state: { email: email },
            replace: true,
          });
        }
      } else if (type === ClientEnum.STUDENT_TYPE) {
        const studentData = await StudentService.instance.getStudentByEmail({
          email: email,
        });

        if (!studentData.data.faculty) {
          Swal.fire({
            icon: "success",
            title: "Incomplete Profile.",
            text: "Please update your profile first!",
          }).then(() => {
            navigate("/student/profile/update-profile", {
              state: { email: email },
              replace: true,
            });
          });
        } else {
          navigate("/student/profile/update-profile", {
            state: { email: email },
            replace: true,
          });
        }
      }
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
                    <CInputGroup className="mb-3">
                      <CFormCheck
                        inline
                        type="radio"
                        id="inlineCheckbox1"
                        value={ClientEnum.ADMIN_TYPE}
                        label={ClientEnum.ADMIN_TYPE}
                        checked={type === ClientEnum.ADMIN_TYPE}
                        onChange={(e) => setType(e.target.value)}
                      />
                      <CFormCheck
                        inline
                        type="radio"
                        id="inlineCheckbox2"
                        value={ClientEnum.TEACHER_TYPE}
                        label="TEACHER"
                        checked={type === ClientEnum.TEACHER_TYPE}
                        onChange={(e) => setType(e.target.value)}
                      />
                      <CFormCheck
                        inline
                        type="radio"
                        id="inlineCheckbox3"
                        value={ClientEnum.STUDENT_TYPE}
                        label={ClientEnum.STUDENT_TYPE}
                        checked={type === ClientEnum.STUDENT_TYPE}
                        onChange={(e) => setType(e.target.value)}
                      />
                    </CInputGroup>

                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={handleSubmit}
                        >
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                    <CRow className="text-end">
                      <p>
                        Don&apos;t have an account?
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
