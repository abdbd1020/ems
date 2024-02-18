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

const column = ["Name", "Description", "Faculty", "Action"];

const AdminDepartmentsList = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchTeacherList();
  }, []);

  const fetchTeacherList = async () => {
    const response = await AdminService.instance.getAllDepartment();
    if (response.status) setTableData(response.departmentList);
  };

  const handleUpdate = async (departmentid) => {
    const departmentData = tableData.filter(
      (department) => department.id === departmentid,
    );
    navigate("/admin/department/add-update-department", {
      state: { departmentData },
      replace: true,
    });
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Department List</strong>
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
                      <CTableDataCell>{row.faculty.name}</CTableDataCell>
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

export default AdminDepartmentsList;
