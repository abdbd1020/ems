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
import TeacherService from "src/services/TeacherService";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const column = ["Name", "department", "Batch No", "Action", "Action"];

const RequestedAdviseeList = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  useState([]);

  useEffect(() => {
    fetchAdviseeRequestList();
    fetchRequestAdadvisorAssignmentList();
  }, []);

  const fetchAdviseeRequestList = async () => {
    const currentUserData = JSON.parse(localStorage.getItem("currentUserData"));
    const payload = {
      email: currentUserData.email,
    };
    const response =
      await TeacherService.instance.getAllAdviseeRequest(payload);
    if (response.status) setTableData(response.data);
    else {
      navigate("/500", { replace: true });
    }
  };
  const fetchRequestAdadvisorAssignmentList = async () => {
    const currentUserData = JSON.parse(localStorage.getItem("currentUserData"));
  };

  const handleAcceptorReject = async (requestId, isAccept) => {
    const currentUserData = JSON.parse(localStorage.getItem("currentUserData"));
    const payload = {
      id: requestId,
    };
    var response;
    if (isAccept) {
      response = await TeacherService.instance.acceptAdvisorRequest(payload);
    } else {
      response = await TeacherService.instance.acceptAdvisorRequest(payload);
    }
    if (response.status) {
      Swal.fire({
        icon: "success",
        title: { isAccept } ? "Accepted" : "Rejected",
        text: { isAccept }
          ? "Request has been accepted"
          : "Request has been rejected",
      }).then(() => {
        const newTableData = tableData.filter((row) => row.id !== UserId);
        setTableData(newTableData);
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Please try again",
      });
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
                    return (
                      <CTableRow key={row.id}>
                        <CTableHeaderCell scope="row">
                          {row.adviseeName}
                        </CTableHeaderCell>
                        <CTableDataCell>{row.adviseeDepartment}</CTableDataCell>
                        <CTableDataCell>{row.adviseeBatchNo}</CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            color={"success"}
                            onClick={() => handleAcceptorReject(row.id, true)}
                          >
                            Accept
                          </CButton>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            color={"danger"}
                            onClick={() => handleAcceptorReject(row.id, false)}
                          >
                            Reject
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

export default RequestedAdviseeList;
