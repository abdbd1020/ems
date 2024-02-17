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

const column = ["Name", "department", "Batch No", "Email", "Phone", "Action"];

const CurrentAdviseeList = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  useState([]);

  useEffect(() => {
    fetchAdviseeRequestList();
  }, []);

  const fetchAdviseeRequestList = async () => {
    const currentUserData = JSON.parse(localStorage.getItem("currentUserData"));
    const payload = {
      email: currentUserData.email,
    };
    const response =
      await TeacherService.instance.getAllCurrentAdvisee(payload);
    if (response.status) setTableData(response.data);
    else {
      navigate("/500", { replace: true });
    }
  };

  const handleRemove = async (requestId) => {
    const payload = {
      id: requestId,
    };

    const response =
      await TeacherService.instance.removeAdvisorRequest(payload);

    if (response.status) {
      Swal.fire({
        icon: "success",
        title: "Removed",
        text: "Student removed from your advisee list successfully.",
      }).then(() => {
        const newTableData = tableData.filter((row) => row.id !== requestId);
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
              <strong>Current Advisee</strong>
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
                          {row.student.emsUser.name}
                        </CTableHeaderCell>
                        <CTableDataCell>
                          {row.student.department.name}
                        </CTableDataCell>
                        <CTableDataCell>{row.student.batchNo}</CTableDataCell>
                        <CTableDataCell>
                          {row.student.emsUser.email}
                        </CTableDataCell>
                        <CTableDataCell>
                          {row.student.emsUser.phone}
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            color={"danger"}
                            onClick={() => handleRemove(row.id)}
                          >
                            Remove
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

export default CurrentAdviseeList;
