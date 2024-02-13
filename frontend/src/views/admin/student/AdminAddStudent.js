/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
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
} from '@coreui/react'
import AdminService from 'src/services/AdminService'

const AddStudent = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {}, [])

  const handleSubmit = async () => {
    if (name === '') return
    if (email === '') return
    if (phone === '') return

    const payload = {
      studentName: name.trim(),
      studentEmail: email.trim(),
      studentPhone: phone.trim(),
      userDetails: {},
    }

    const response = await AdminService.instance.addStudent(payload)

    if (response.status) {
      setName('')
      setEmail('')
      setPhone('')

      console.log(response.responseMessage)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Student</strong>
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
                <CFormLabel htmlFor="exampleFormControlInput2">Email</CFormLabel>
                <CFormInput
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="exampleFormControlInput2"
                  placeholder="name@example.com"
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Index</CFormLabel>
                <CFormInput
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id="exampleFormControlInput1"
                  placeholder=""
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
  )
}

export default AddStudent
