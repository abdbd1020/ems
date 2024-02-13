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

const TeacherAddSyndicate = () => {
  const [name, setName] = useState('')
  const [courseList, setCourseList] = useState([])
  const [selectedCourseId, setSelectedCourseId] = useState('')
  const [exerciseList, setExerciseList] = useState([])
  const [selectedExerciseId, setSelectedExerciseId] = useState('')

  useEffect(() => {
    fetchCourseList()
  }, [])

  const fetchCourseList = async () => {
    const response = await TeacherService.instance.getCourseList()
    console.log(response)
    if (response.status) setCourseList(response.teacherCourseData)
  }

  const fetchExerciseList = async (courseId) => {
    if (courseId === '') return
    const payload = { courseId: courseId }
    const response = await TeacherService.instance.getAllExercise(payload)
    console.log(response)
    if (response.status) {
      setExerciseList(response.exerciseList)
    }
  }

  const handleSubmit = async () => {
    if (name === '') return
    if (selectedExerciseId === '') return

    const payload = {
      syndicateName: name.trim(),
      exerciseId: selectedExerciseId,
    }

    const response = await TeacherService.instance.addSyndicate(payload)
    console.log(response)
    if (response.status) {
      setName('')
      setSelectedCourseId('')
    }
  }

  const handleCourseSelect = (e) => {
    setSelectedCourseId(e.target.value)
    fetchExerciseList(e.target.value)
  }

  const handleExerciseSelect = (e) => {
    setSelectedExerciseId(e.target.value)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Syndicate</strong>
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
              <div>
                <CFormLabel value={selectedCourseId} htmlFor="exampleFormControlInput3">
                  Select Course
                </CFormLabel>
                <CFormSelect
                  value={selectedCourseId}
                  onChange={handleCourseSelect}
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
              <div>
                <CFormLabel value={selectedCourseId} htmlFor="exampleFormControlInput3">
                  Select Exercise
                </CFormLabel>
                <CFormSelect
                  value={selectedExerciseId}
                  onChange={handleExerciseSelect}
                  aria-label="Default select example"
                >
                  <option value="">Choose An Exercise</option>
                  {exerciseList.map((exercise) => {
                    return (
                      <option key={exercise.exerciseId} value={exercise.exerciseId}>
                        {exercise.exerciseName}
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

export default TeacherAddSyndicate
