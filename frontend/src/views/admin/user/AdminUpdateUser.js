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
  CFormSwitch,
  CInputGroup,
  CRow,
  CFormCheck,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CFormSelect,
} from "@coreui/react";
import AdminService from "src/services/AdminService";
import { ClientEnum } from "src/ClientEnum";

import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminUpdateUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = location.state;
  const [name, setName] = useState(userData[0].name);
  const [email, setEmail] = useState(userData[0].email);
  const [phone, setPhone] = useState(userData[0].phone);
  const [type, setType] = useState(userData[0].role);
  const [status, setStatus] = useState(userData[0].status);

  useEffect(() => {}, []);

  const handleSubmit = async () => {
    if (name === "") return;
    if (email === "") return;
    if (phone === "") return;

    userData[0].status = status;
    userData[0].role = type;
    const payload = userData[0];

    const response = await AdminService.instance.updateUser(payload);

    if (response.status) {
      Swal.fire({
        title: "Update Successful!",
        text: "User has been updated.",
        icon: "success",
      }).then(() => {
        navigate("/admin/user/inactive-user-list");
      });
    } else {
      Swal.fire({
        title: "Update Failed!",
        text: "Please try again.",
        icon: "error",
      }).then(() => {
        navigate("/admin/user/inactive-user-list");
      });
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Update User</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">
                  Activate User
                </CFormLabel>
                <CFormSelect
                  id="formSelectDefault"
                  className="ms-auto"
                  value={status}
                  onChange={(e) =>
                    setStatus(
                      e.target.value === ClientEnum.USER_ACTIVE
                        ? ClientEnum.USER_ACTIVE
                        : ClientEnum.USER_INACTIVE,
                    )
                  }
                >
                  <option value={ClientEnum.USER_ACTIVE}>Active</option>
                  <option value={ClientEnum.USER_INACTIVE}>Inactive</option>
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
                <CFormInput
                  type="text"
                  value={name}
                  readOnly
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
                  readOnly
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
                  readOnly
                  id="exampleFormControlInput1"
                  placeholder="+8801234567890"
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">
                  User Type
                </CFormLabel>
                <CInputGroup className="mb-3 d-inline-flex align-items-center">
                  <CFormCheck
                    inline
                    type="radio"
                    id="inlineCheckbox2"
                    value={ClientEnum.TEACHER_TYPE}
                    label="TEACHER"
                    checked={type === ClientEnum.TEACHER_TYPE}
                    onChange={(e) => setType(e.target.value)}
                  />
                  <CFormCheck
                    inline
                    type="radio"
                    id="inlineCheckbox3"
                    value={ClientEnum.STUDENT_TYPE}
                    label={ClientEnum.STUDENT_TYPE}
                    checked={type === ClientEnum.STUDENT_TYPE}
                    onChange={(e) => setType(e.target.value)}
                  />
                  <CFormCheck
                    inline
                    type="radio"
                    id="inlineCheckbox3"
                    value={ClientEnum.GUEST_TYPE}
                    label={ClientEnum.GUEST_TYPE}
                    checked={type === ClientEnum.GUEST_TYPE}
                    onChange={(e) => setType(e.target.value)}
                  />
                </CInputGroup>
              </div>
              <div className="mb-3 text-center"></div>
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

export default AdminUpdateUser;
