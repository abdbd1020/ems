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

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async () => {
    const payload = {
      userEmail: email,
      userPassword: password,
      userType: type,
    };
    console.log(payload);
    const response = await DefaultService.instance.login(payload);
    if (response.status) {
      console.log(response);
      response.user[0].type = type;
      localStorage.setItem("user", JSON.stringify(response.user[0]));
      if (type === ClientEnum.ADMIN_TYPE)
        navigate("/admin/teacher/teacher-list", { replace: true });
      else if (type === ClientEnum.TEACHER_TYPE)
        navigate("/teacher/course-list", { replace: true });
      else if (type === ClientEnum.STUDENT_TYPE)
        navigate("/student/course-list", { replace: true });
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
                        id="exampleFormControlInput2"
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
