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
  const [isRequested, setIsRequested] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [requestedAdvisorsAssignmentData, setRequestedAdvisorsAssignment] =
    useState([]);

  useEffect(() => {
    fetchAdvisorsList();
    fetchRequestAdadvisorAssignmentList();
  }, []);

  const fetchAdvisorsList = async () => {
    const response = await StudentService.instance.getAllAdvisors();
    if (response.status) setTableData(response.userList);
    else {
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
    if (response.status)
      setRequestedAdvisorsAssignment(response.requestedAdvisorsList);
  };

  const handleSendRequest = async (UserId) => {
    const currentUserData = JSON.parse(localStorage.getItem("currentUserData"));
    const payload = {
      studentEmail: currentUserData.email,
      advisorId: UserId,
    };
    const response = await StudentService.instance.sendAdvisorRequest(payload);
    if (response.status) {
      alert("Request sent successfully");
    } else {
      alert("Request failed");
    }
  };

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
                            color={isAlreadyRequested ? "secondary" : "success"}
                            onClick={() => handleSendRequest(row.id)}
                            disabled={isAlreadyRequested}
                          >
                            {isAlreadyRequested ? "Requested" : "Send Request"}
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
};

export default AvailableAdvisorList;
