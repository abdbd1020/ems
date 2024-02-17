import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import StudentService from "src/services/StudentService";
import { Link, useNavigate } from "react-router-dom";

const column = ["Name", "Faculty", "Designation", "Action"];

const AvailableAdvisorList = () => {
  const navigate = useNavigate();
  const [haveAdvisor, setHaveAdvisor] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [requestedAdvisorsAssignmentData, setRequestedAdvisorsAssignment] =
    useState([]);

  useEffect(() => {
    fetchAdvisorsList();
    fetchRequestAdadvisorAssignmentList();
  }, []);

  const fetchAdvisorsList = async () => {
    const response = await StudentService.instance.getAllAdvisors();
    if (response.status) {
      setTableData(response.data);
    } else {
      navigate("/500", { replace: true });
    }
  };
  const fetchRequestAdadvisorAssignmentList = async () => {
    const currentUserData = JSON.parse(localStorage.getItem("currentUserData"));
    const payload = {
      email: currentUserData.email,
    };
    const response =
      await StudentService.instance.getRequestAdadvisorAssignmentList(payload);
    console.log(response);
    if (response.status) {
      setRequestedAdvisorsAssignment(response.data);
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].accepted) {
          setHaveAdvisor(true);
          break;
        }
      }
    }
  };

  const handleSendRequest = async (UserId) => {
    const currentUserData = JSON.parse(localStorage.getItem("currentUserData"));
    const payload = {
      email: currentUserData.email,
      id: UserId,
    };
    const response = await StudentService.instance.sendAdvisorRequest(payload);
    if (response.status) {
      alert("Request sent successfully");
    } else {
      alert("Request failed");
    }
  };

  // if hadAdvisor is true then return a text that you already have an advisor
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
      <div>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Availabe Advisor</strong>
              </CCardHeader>
              <CCardBody>
                <CTable striped>
                  <CTableHead>
                    <CTableRow>
                      {column.map((col, _) => {
                        return (
                          <CTableHeaderCell key={_} scope="col">
                            {col}
                          </CTableHeaderCell>
                        );
                      })}
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {tableData.map((row) => {
                      const isAlreadyRequested =
                        requestedAdvisorsAssignmentData.some(
                          (data) => data.teacherId === row.id && !data.accepted,
                        );

                      return (
                        <CTableRow key={row.id}>
                          <CTableHeaderCell scope="row">
                            {row.emsUser.name}
                          </CTableHeaderCell>
                          <CTableDataCell>{row.faculty.name}</CTableDataCell>
                          <CTableDataCell>{row.designation}</CTableDataCell>

                          <CTableDataCell>
                            <CButton
                              color={
                                isAlreadyRequested ? "secondary" : "success"
                              }
                              onClick={() => handleSendRequest(row.id)}
                              disabled={isAlreadyRequested}
                            >
                              {isAlreadyRequested
                                ? "Requested"
                                : "Send Request"}
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      );
                    })}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    );
  }
};

export default AvailableAdvisorList;
