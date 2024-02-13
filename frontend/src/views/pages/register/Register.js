import React from "react";
import { Link, useNavigate } from "react-router-dom";
import DefaultService from "src/services/DefaultService";
import { useState } from "react";
import Swal from "sweetalert2";

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilPhone, cilUser } from "@coreui/icons";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const payload = {
      name: name,
      email: email,
      password: password,
      phone: phone,
    };
    const response = await DefaultService.instance.register(payload);

    if (response.status) {
      localStorage.setItem("userToken", JSON.stringify(response.data));
      Swal.fire({
        title: "Registration Successful!",
        text: "Please wait for an admin to activate your account.",
        icon: "success",
      }).then(() => {
        navigate("/login");
      });
    } else {
      Swal.fire({
        title: "Registration Failed!",
        text: "Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      id="registerName"
                      placeholder="Username"
                      autoComplete="username"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      id="registerPhone"
                      type="tel"
                      placeholder="Phone"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="registerEmail"
                      placeholder="Email"
                      autoComplete="email"
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>

                    <CFormInput
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="registerPassword"
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton color="success" onClick={handleSubmit}>
                      Create Account
                    </CButton>
                  </div>
                  <CRow className="text-center py-2">
                    <p>
                      Already have an account?
                      <Link to="/login"> Log In </Link>
                    </p>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
