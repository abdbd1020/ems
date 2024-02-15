import React from "react";
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
import { Link, useNavigate } from "react-router-dom";

const column = ["Name", "Email", "Phone", "Role", "Status", "Action"];

const UserTable = ({ userList }) => {
  const navigate = useNavigate();

  const handleUpdate = async (UserId) => {
    const userData = userList.filter((user) => user.id === UserId);
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
                {userList.map((row) => {
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

export default UserTable;
