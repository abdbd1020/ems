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
import AdminService from "src/services/AdminService";
import { Link, useNavigate } from "react-router-dom";
import UserTable from "src/views/Table/UserTable";

const column = ["Name", "Email", "Phone", "Role", "Status", "Action"];

const AdminInactiveUserLis = () => {
  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    const response = await AdminService.instance.getAllInactiveUsers();
    if (response.status) setTableData(response.userList);
    else {
      navigate("/500", { replace: true });
    }
  };

  const handleUpdate = async (UserId) => {
    const userData = tableData.filter((user) => user.id === UserId);
    navigate("/admin/update-user", { state: { userData }, replace: true });
  };

  return (
    <div>
      <UserTable userList={tableData} />
    </div>
  );
};

export default AdminInactiveUserLis;
