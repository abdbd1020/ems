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
import { Link, useNavigate } from "react-router-dom";

const column = ["Name", "Email", "Phone", "Role", "Status", "Action"];

const UserList = () => {
  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    const response = await AdminService.instance.getAllUsers();
    if (response.status) setTableData(response.userList);
  };

  const handleUpdate = async (UserId) => {
    const userData = tableData.filter((user) => user.id === UserId);
    navigate("/admin/update-user", { state: { userData }, replace: true });
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
                    <CTableRow key={row.id}>
                      <CTableHeaderCell scope="row">
                        {row.name}
                      </CTableHeaderCell>
                      <CTableDataCell>{row.email}</CTableDataCell>
                      <CTableDataCell>{row.phone}</CTableDataCell>
                      <CTableDataCell>{row.role}</CTableDataCell>
                      <CTableDataCell>{row.status}</CTableDataCell>
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

export default UserList;
