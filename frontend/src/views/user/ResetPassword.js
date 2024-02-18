import DefaultService from "src/services/DefaultService";
import Swal from "sweetalert2";

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CCardHeader,
  CRow,
  CFormLabel,
} from "@coreui/react";

import React, { useEffect, useState } from "react";

const ResetPassword = () => {
  const [currenPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {}, []);

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "New Password and Confirm Password should be same!",
      });
      return;
    }
    if (newPassword.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Password Length",
        text: "Password should be at least 6 characters long!",
      });
      return;
    }
    try {
      const currentUserData = JSON.parse(
        localStorage.getItem("currentUserData"),
      );

      const payload = {
        email: currentUserData.email,
        currentPassword: currenPassword,
        newPassword: newPassword,
      };
      const response = await DefaultService.instance.resetPassword(payload);
      console.log(response);
      if (response.status) {
        Swal.fire({
          icon: "success",
          title: "Password Updated",
          text: "Password updated successfully!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Password Update Failed",
          text: "Please check your current password and try again!",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>reset Password</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">
                  Current Password
                </CFormLabel>
                <CFormInput
                  type="password"
                  value={currenPassword}
                  id="exampleFormControlInput1"
                  placeholder="******"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput2">
                  New Password
                </CFormLabel>
                <CFormInput
                  type="text"
                  value={newPassword}
                  id="exampleFormControlInput2"
                  placeholder="Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput3">
                  Confirm Password
                </CFormLabel>
                <CFormInput
                  type="text"
                  value={confirmPassword}
                  id="exampleFormControlInput3"
                  placeholder="Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </CForm>
            <CContainer className="my-3 d-flex justify-content-end">
              <CButton color="primary" onClick={handleSubmit}>
                Submit
              </CButton>
            </CContainer>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ResetPassword;
