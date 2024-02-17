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
import TeacherService from "src/services/TeacherService";
import React, { useEffect, useState } from "react";
import AdminService from "src/services/AdminService";

const TeacherUpdateProfile = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Add this line to get the location object

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("");

  const currentUserData = JSON.parse(localStorage.getItem("currentUserData"));
  const teacherEmail = currentUserData ? currentUserData.email : null;
  const [userData, setUserData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");

  useEffect(() => {
    if (teacherEmail) {
      fetchFacultyList();
      fetchTeacherfromEmail();
    } else {
      navigate("/500", { replace: true });
    }
  }, [teacherEmail, location.state]);

  const fetchFacultyList = async () => {
    const response = await AdminService.instance.getAllFaculty();
    if (response.status) setTableData(response.facultyList);
  };

  const fetchTeacherfromEmail = async () => {
    try {
      const payload = { email: teacherEmail };
      const response = await TeacherService.instance.getTeacherByEmail(payload);

      if (response.status) {
        setUserData(response.data);
        setName(response.data.emsUser.name);
        response.data.designation
          ? setDesignation(response.data.designation)
          : setDesignation("");
        setEmail(response.data.emsUser.email);
        setPhone(response.data.emsUser.phone);
        response.data.faculty
          ? setSelectedFaculty(response.data.faculty.name)
          : setSelectedFaculty(null);
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
        !selectedFaculty ||
        designation.length < 3
      ) {
        Swal.fire({
          title: "Failed!",
          text: "Please fill all the fields.",
          icon: "error",
        });
        return;
      }
      const facultyId = tableData.filter(
        (faculty) => faculty.name === selectedFaculty,
      );

      const EMSUser = {
        id: userData.emsUser.id,
        name: name,
        email: email,
        phone: phone,
      };
      const faculty = {
        id: facultyId[0].id,
        name: selectedFaculty,
        description: facultyId[0].description,
      };

      const payload = {
        emsUser: EMSUser,
        designation: designation,
        faculty: faculty,
      };
      console.log(payload);
      const response = await TeacherService.instance.updateTeacher(payload);

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
          text: "Profile has been updated.",
          icon: "success",
        }).then(() => {
          navigate("/login");
        });
      } else {
        Swal.fire({
          title: " Failed!",
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
                  Designation
                </CFormLabel>
                <CFormInput
                  type="text"
                  value={designation}
                  id="exampleFormControlInput4"
                  placeholder="Designation"
                  onChange={(e) => setDesignation(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlSelect5">
                  Faculty
                </CFormLabel>

                <CFormSelect
                  id="formSelectDefault"
                  className="ms-auto"
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                >
                  <option value={null}>...</option>
                  {tableData.map((faculty) => (
                    <option key={faculty.id} value={faculty.name}>
                      {faculty.name}
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

export default TeacherUpdateProfile;
