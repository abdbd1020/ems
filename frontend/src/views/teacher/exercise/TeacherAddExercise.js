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
import TeacherService from 'src/services/TeacherService'

const AddCourse = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [courseList, setCourseList] = useState([])
  const [selectedCourseId, setSelectedCourseId] = useState('')

  useEffect(() => {
    fetchCourseList()
  }, [])

  const fetchCourseList = async () => {
    const response = await TeacherService.instance.getCourseList()
    console.log(response)
    if (response.status) setCourseList(response.teacherCourseData)
  }

  const handleSubmit = async () => {
    if (name === '') return
    if (description === '') return
    if (selectedCourseId === '') return

    const payload = {
      exerciseName: name.trim(),
      exerciseDetails: description.trim(),
      courseId: selectedCourseId,
    }
    const response = await TeacherService.instance.addExercise(payload)
    console.log(response)
    if (response.status) {
      setName('')
      setDescription('')
      setSelectedCourseId('')
    }
  }

  const handleSelect = (e) => {
    setSelectedCourseId(e.target.value)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Exercise</strong>
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
                <CFormLabel value={selectedCourseId} htmlFor="exampleFormControlInput3">
                  Select Course
                </CFormLabel>
                <CFormSelect
                  value={selectedCourseId}
                  onChange={handleSelect}
                  aria-label="Default select example"
                >
                  <option value="">Choose A Course</option>
                  {courseList.map((course) => {
                    return (
                      <option key={course.courseId} value={course.courseId}>
                        {course.courseName}
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
