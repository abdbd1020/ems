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
  CFormSelect,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import AdminService from 'src/services/AdminService'

const AddCourse = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [teacherList, setTeacherList] = useState([])
  const [selectedTeacherId, setSelectedTeacherId] = useState('')

  useEffect(() => {
    fetchTeacherList()
  }, [])

  const fetchTeacherList = async () => {
    const response = await AdminService.instance.getTeacherList()
    console.log(response)
    if (response.status) setTeacherList(response.teacherList)
  }

  const handleSubmit = async () => {
    if (name === '') return
    if (description === '') return
    if (selectedTeacherId === '') return

    const payload = {
      courseName: name.trim(),
      courseDetails: { description: description.trim() },
      madeBy: selectedTeacherId,
    }

    const response = await AdminService.instance.addCourse(payload)

    if (response.status) {
      setName('')
      setDescription('')
      setSelectedTeacherId('')

      console.log(response.responseMessage)
    }
    console.log(payload)
  }

  const handleSelect = (e) => {
    setSelectedTeacherId(e.target.value)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Course</strong>
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
                <CFormLabel htmlFor="exampleFormControlInput2">Description</CFormLabel>
                <CFormTextarea
                  type="email"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="exampleFormControlInput2"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <CFormLabel htmlFor="exampleFormControlInput3">Select Instructor</CFormLabel>
                <CFormSelect onChange={handleSelect} aria-label="Default select example">
                  <option value="">Choose An Instructor</option>
                  {teacherList.map((teacher) => {
                    return (
                      <option key={teacher.teacherId} value={teacher.teacherId}>
                        {teacher.teacherName} - {teacher.teacherEmail}
                      </option>
                    )
                  })}
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
  )
}

export default AddCourse
