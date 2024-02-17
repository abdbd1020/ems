import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from "@coreui/react";
import AdminService from "src/services/AdminService";
import { ClientEnum } from "src/ClientEnum";

import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import StudentService from "src/services/StudentService";

const CurrentAdvisor = () => {
  const navigate = useNavigate();

  const [currentAdvisorData, setCurrentAdvisorData] = useState([]);
  const [haveAdvisor, setHaveAdvisor] = useState(false);

  useEffect(() => {
    fetchCurrentAdvisorData();
  }, []);

  const fetchCurrentAdvisorData = async () => {
    const currentUserData = JSON.parse(localStorage.getItem("currentUserData"));
    const payload = {
      email: currentUserData.email,
    };
    const response = await StudentService.instance.getCurrentAdvisor(payload);
    // check respose.data length is 0 or not
    if (response?.data?.length !== 0) {
      setHaveAdvisor(true);
    }
  };

  const handleSubmit = async () => {
    const currentUserData = JSON.parse(localStorage.getItem("currentUserData"));
    const payload = {
      email: currentUserData.email,
    };
    const response = await StudentService.instance.removeAdvisor(payload);
    if (response.status) {
      Swal.fire({
        icon: "success",
        title: "Advisor Removed Successfully",
      });
      navigate("/student/advisor/available-advisor-list", { replace: true });
    }
  };

  if (haveAdvisor) {
    return (
      <div>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Availabe Advisor</strong>
              </CCardHeader>
              <CCardBody>
                <h1>You already have an advisor.</h1>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    );
  } else {
    return (
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Current User</strong>
            </CCardHeader>
            <CCardBody>
              <CForm>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">
                    Name
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    value={currentAdvisorData?.emsUser?.name}
                    readOnly
                    id="exampleFormControlInput1"
                    placeholder="Name"
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput2">
                    Email
                  </CFormLabel>
                  <CFormInput
                    type="email"
                    value={currentAdvisorData?.emsUser?.email}
                    readOnly
                    id="exampleFormControlInput2"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput3">
                    Phone
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    value={currentAdvisorData?.emsUser?.phone}
                    readOnly
                    id="exampleFormControlInput1"
                    placeholder="+8801234567890"
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput4">
                    Faculty
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    value={currentAdvisorData?.faculty?.name}
                    readOnly
                    id="exampleFormControlInput1"
                    placeholder="+8801234567890"
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput5">
                    Designation
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    value={currentAdvisorData?.designation}
                    readOnly
                    id="exampleFormControlInput1"
                    placeholder="+8801234567890"
                  />
                </div>
                <div className="mb-3 text-center"></div>
              </CForm>
              <CContainer className="my-3 d-flex justify-content-center">
                <CButton
                  color="danger"
                  onClick={handleSubmit}
                  className="text-white"
                >
                  Remove Advisor
                </CButton>
              </CContainer>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    );
  }
};

export default CurrentAdvisor;
