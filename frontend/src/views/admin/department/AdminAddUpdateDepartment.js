import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CFormSwitch,
  CInputGroup,
  CRow,
  CFormCheck,
  CDropdownToggle,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CFormSelect,
} from "@coreui/react";
import AdminService from "src/services/AdminService";
import { ClientEnum } from "src/ClientEnum";

import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminAddUpdateDepartment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const departmentData = location.state ? location.state.departmentData : null;
  const [isUpdate, setIsUpdate] = useState(!!departmentData);
  const [tableData, setTableData] = useState([]);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [updateOrCreateString, setUpdateOrCreateString] = useState(
    departmentData ? "Update Department" : "Create Department ",
  );

  useEffect(() => {
    if (isUpdate && departmentData) {
      setName(departmentData[0].name);
      setDescription(departmentData[0].description);
      setSelectedFaculty(departmentData[0].faculty.name);
    }
  }, [isUpdate, departmentData]);
  useEffect(() => {
    fetchFacultyList();
  }, []);

  const fetchFacultyList = async () => {
    const response = await AdminService.instance.getAllFaculty();
    console.log(response);
    if (response.status) setTableData(response.facultyList);
  };

  const handleSubmit = async () => {
    if (name?.length < 3 || description?.length < 3 || selectedFaculty == "") {
      Swal.fire({
        title: "Failed!",
        text: "Please fill all the fields.",
        icon: "error",
      }).then(() => {
        return;
      });
    }

    // get faculty id
    const faculty = tableData.filter(
      (faculty) => faculty.name === selectedFaculty,
    );

    console.log(faculty.length);
    console.log(selectedFaculty);

    var response = null;
    const payload = {
      id: isUpdate ? departmentData[0].id : null,
      facultyId: faculty[0]?.id,
      name: name,
      description: description,
    };

    if (isUpdate) {
      response = await AdminService.instance.updateDepartment(payload);
    } else {
      response = await AdminService.instance.createDepartment(payload);
    }
    // priint each element of payload

    if (response.status) {
      Swal.fire({
        title: "Success!",
        text: "Department has been " + (isUpdate ? "updated" : "created") + ".",
        icon: "success",
      }).then(() => {
        navigate("/admin/department/department-list");
      });
    } else {
      Swal.fire({
        title: "Failed!",
        text: "Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>{updateOrCreateString}</strong>
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
                  Description
                </CFormLabel>
                <CFormTextarea
                  type="text"
                  value={description}
                  id="exampleFormControlInput2"
                  placeholder="description"
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ height: "10em" }}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlSelect1">
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

export default AdminAddUpdateDepartment;
