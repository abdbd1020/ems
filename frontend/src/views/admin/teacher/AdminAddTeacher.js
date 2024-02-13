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
  CRow,
} from "@coreui/react";
import AdminService from "src/services/AdminService";

const AddTeacher = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {}, []);

  const handleSubmit = async () => {
    if (name === "") return;
    if (email === "") return;
    if (phone === "") return;

    const payload = {
      teacherName: name.trim(),
      teacherEmail: email.trim(),
      teacherPhone: phone.trim(),
    };

    const response = await AdminService.instance.addTeacher(payload);

    if (response.status) {
      setName("");
      setEmail("");
      setPhone("");

      console.log(response.responseMessage);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Instructor</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
                <CFormInput
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="exampleFormControlInput1"
                  placeholder="Name"
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput2">
                  Email
                </CFormLabel>
                <CFormInput
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="exampleFormControlInput2"
                  placeholder="name@example.com"
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">
                  Phone
                </CFormLabel>
                <CFormInput
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id="exampleFormControlInput1"
                  placeholder="+8801234567890"
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

export default AddTeacher;
