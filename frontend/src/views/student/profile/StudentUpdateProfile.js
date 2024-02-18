import { Link, useNavigate, useLocation } from "react-router-dom";
import DefaultService from "src/services/DefaultService";
import Swal from "sweetalert2";

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CCardHeader,
  CRow,
  CFormLabel,
  CFormTextarea,
  CFormSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilPhone, cilUser } from "@coreui/icons";
import StudentService from "src/services/StudentService";
import React, { useEffect, useState } from "react";
import AdminService from "src/services/AdminService";

const StudentUpdateProfile = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Add this line to get the location object

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [batchNo, setBatchNo] = useState("");

  const currentUserData = JSON.parse(localStorage.getItem("currentUserData"));
  const studentEmail = currentUserData ? currentUserData.email : null;
  const [userData, setUserData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    if (studentEmail) {
      fetchDepartmentList();
      fetchStudentfromEmail();
    } else {
      navigate("/500", { replace: true });
    }
  }, [studentEmail, location.state]);

  const fetchDepartmentList = async () => {
    const response = await AdminService.instance.getAllDepartment();
    if (response.status) setTableData(response.departmentList);
  };

  const fetchStudentfromEmail = async () => {
    try {
      const payload = { email: studentEmail };
      const response = await StudentService.instance.getStudentByEmail(payload);

      if (response.status) {
        setUserData(response.data);
        setName(response.data.emsUser.name);
        response.data.batchNo
          ? setBatchNo(response.data.batchNo)
          : setBatchNo("");
        setEmail(response.data.emsUser.email);
        setPhone(response.data.emsUser.phone);
        response.data.department
          ? setSelectedDepartment(response.data.department.name)
          : setSelectedDepartment(null);
      }
    } catch (error) {
      navigate("/500", { replace: true });
    }
  };

  const handleSubmit = async () => {
    try {
      if (
        name.length < 3 ||
        email.length < 3 ||
        phone.length < 3 ||
        !selectedDepartment ||
        batchNo == 0
      ) {
        Swal.fire({
          title: "Failed!",
          text: "Please fill all the fields.",
          icon: "error",
        });
        return;
      }
      const departmentId = tableData.filter(
        (department) => department.name === selectedDepartment,
      );

      const EMSUser = {
        id: userData.emsUser.id,
        name: name,
        email: email,
        phone: phone,
      };
      const department = {
        id: departmentId[0].id,
        name: selectedDepartment,
        description: departmentId[0].description,
      };

      const payload = {
        emsUser: EMSUser,
        batchNo: batchNo,
        department: department,
      };
      const response = await StudentService.instance.updateStudent(payload);

      if (response.status) {
        const currentUserData = JSON.parse(
          localStorage.getItem("currentUserData"),
        );
        currentUserData.userJWT = response.data;
        localStorage.setItem(
          "currentUserData",
          JSON.stringify(currentUserData),
        );
        Swal.fire({
          title: "Successful!",
          text: "Account has been updated.",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Failed!",
          text: "Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Update Profile</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
                <CFormInput
                  type="text"
                  value={name}
                  id="exampleFormControlInput1"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput2">
                  Email
                </CFormLabel>
                <CFormInput
                  type="text"
                  value={email}
                  id="exampleFormControlInput2"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput3">
                  Phone
                </CFormLabel>
                <CFormInput
                  type="text"
                  value={phone}
                  id="exampleFormControlInput3"
                  placeholder="Phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput4">
                  BatchNo
                </CFormLabel>
                <CFormInput
                  type="number"
                  value={batchNo}
                  id="exampleFormControlInput4"
                  placeholder="BatchNo"
                  onChange={(e) => setBatchNo(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlSelect5">
                  Department
                </CFormLabel>

                <CFormSelect
                  id="formSelectDefault"
                  className="ms-auto"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value={null}>...</option>
                  {tableData.map((department) => (
                    <option key={department.id} value={department.name}>
                      {department.name}
                    </option>
                  ))}
                </CFormSelect>
              </div>
            </CForm>
            <CContainer className="my-3 d-flex justify-content-end">
              <CButton color="primary" onClick={handleSubmit}>
                Submit
              </CButton>
            </CContainer>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default StudentUpdateProfile;
