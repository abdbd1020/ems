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

const column = ["Name", "Email", "Phone", "Action"];

const TeacherList = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchTeacherList();
  }, []);

  const fetchTeacherList = async () => {
    const response = await AdminService.instance.getTeacherList();
    console.log(response);
    if (response.status) setTableData(response.teacherList);
  };

  const handleDelete = async (teacherId) => {
    const payload = {
      teacherId: teacherId,
    };

    const response = await AdminService.instance.deleteTeacher(payload);
    console.log(response);
    if (response.status) fetchTeacherList();
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Instructor List</strong>
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
                    <CTableRow key={row.teacherId}>
                      <CTableHeaderCell scope="row">
                        {row.teacherName}
                      </CTableHeaderCell>
                      <CTableDataCell>{row.teacherEmail}</CTableDataCell>
                      <CTableDataCell>{row.teacherPhone}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="danger"
                          onClick={() => handleDelete(row.teacherId)}
                        >
                          Delete
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

export default TeacherList;
