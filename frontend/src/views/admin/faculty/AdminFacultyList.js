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
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { DocsExample } from "src/components";
import AdminService from "src/services/AdminService";
import { useNavigate } from "react-router-dom";

const column = ["Name", "Description", , "Action"];

const AdminFacultysList = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchTeacherList();
  }, []);

  const fetchTeacherList = async () => {
    const response = await AdminService.instance.getAllFaculty();
    console.log(response);
    if (response.status) setTableData(response.facultyList);
  };

  const handleUpdate = async (facultyIid) => {
    const facultyData = tableData.filter(
      (faculty) => faculty.id === facultyIid,
    );
    navigate("/admin/faculty/add-update-faculty", {
      state: { facultyData },
      replace: true,
    });
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Faculty List</strong>
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
                        {row.name}
                      </CTableHeaderCell>
                      <CTableDataCell>{row.description}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="success"
                          onClick={() => handleUpdate(row.id)}
                        >
                          Update
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
  );
};

export default AdminFacultysList;
