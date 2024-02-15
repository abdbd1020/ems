import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";

const Page500 = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    localStorage.removeItem("userJWT");
    localStorage.removeItem("userRole");
    navigate("/login", { replace: true });
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <span className="clearfix">
              <h1 className="float-start display-3 me-4">500</h1>
              <h4 className="pt-3">Houston, we have a problem!</h4>
              <p className="text-medium-emphasis float-start">
                The page you are looking for is temporarily unavailable.
              </p>
            </span>
            <p>
              <button onClick={handleButtonClick} className="btn btn-link pl-0">
                Go back to Login Page
              </button>
            </p>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Page500;
