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
} from "@coreui/react";
import AdminService from "src/services/AdminService";
import { ClientEnum } from "src/ClientEnum";

import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminAddUpdateFaculty = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const facultyData = location.state ? location.state.facultyData : null;
  const [isUpdate, setIsUpdate] = useState(!!facultyData);

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [updateOrCreateString, setUpdateOrCreateString] = useState(
    facultyData ? "Update Faculty" : "Create Faculty",
  );

  useEffect(() => {
    if (isUpdate && facultyData) {
      setName(facultyData[0].name);
      setDescription(facultyData[0].description);
    }
  }, [isUpdate, facultyData]);

  const handleSubmit = async () => {
    if (name === "") return;
    if (description === "") return;

    var response = null;

    if (isUpdate) {
      facultyData[0].name = name;
      facultyData[0].description = description;
      const payload = facultyData[0];
      response = await AdminService.instance.updateFaculty(payload);
    } else {
      const payload = {
        name: name,
        description: description,
      };
      response = await AdminService.instance.createFaculty(payload);
    }

    if (response.status) {
      Swal.fire({
        title: "Success!",
        text: "Faculty has been " + (isUpdate ? "updated" : "created") + ".",
        icon: "success",
      }).then(() => {
        navigate("/admin/faculty/faculty-list");
      });
    } else {
      Swal.fire({
        title: "Failed!",
        text: "Please try again.",
        icon: "error",
      }).then(() => {
        navigate("/admin/faculty/faculty-list");
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

export default AdminAddUpdateFaculty;
