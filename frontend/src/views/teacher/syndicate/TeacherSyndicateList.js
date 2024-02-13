/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
  CForm,
  CFormInput,
  CFormSelect,
  CFormLabel,
  CFormTextarea,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import TeacherService from 'src/services/TeacherService'
import { useNavigate } from 'react-router-dom'
import { ClientEnum } from 'src/config/ClientEnum'

const column = ['Syndicate Name', 'Action']

const TeacherSyndicateList = () => {
  const navigate = useNavigate()
  const [syndicateList, setSyndicateList] = useState([])
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

  const fetchSyndicateList = async (exerciseId) => {
    if (exerciseId === '') return
    const payload = { exerciseId: exerciseId }
    const response = await TeacherService.instance.getAllSyndicate(payload)
    console.log(response)
    if (response.status) {
      setSyndicateList(response.syndicateData)
    }
  }

  const handleCourseSelect = (e) => {
    setSelectedCourseId(e.target.value)
    fetchExerciseList(e.target.value)
  }

  const handleExerciseSelect = (e) => {
    setSelectedExerciseId(e.target.value)
    fetchSyndicateList(e.target.value)
  }

  const handleView = (row) => {
    navigate('/view-syndicate', { state: { syndicate: row, type: ClientEnum.TEACHER_TYPE } })
  }

  const handleDelete = async (syndicateId) => {
    const payload = {
      syndicateId: syndicateId,
    }

    const response = await TeacherService.instance.deleteSyndicate(payload)
    console.log(response)
    if (response.status) fetchSyndicateList(selectedExerciseId)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Syndicate List</strong>
          </CCardHeader>
          <CCardBody>
            <CContainer className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput3">Select Course</CFormLabel>
              <CFormSelect
                onChange={handleCourseSelect}
                value={selectedCourseId}
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
            </CContainer>
            <CContainer className="mb-3">
              <CFormLabel value={selectedCourseId} htmlFor="exampleFormControlInput1">
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
            </CContainer>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  {column.map((col, _) => {
                    return (
                      <CTableHeaderCell key={_} scope="col">
                        {col}
                      </CTableHeaderCell>
                    )
                  })}
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {syndicateList.map((row) => {
                  return (
                    <CTableRow key={row.syndicateId}>
                      <CTableHeaderCell scope="row">{row.sydicateName}</CTableHeaderCell>
                      <CTableDataCell>
                        <CButton color="success" onClick={() => handleView(row)}>
                          View
                        </CButton>
                        <CButton color="danger" onClick={() => handleDelete(row.syndicateId)}>
                          Delete
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default TeacherSyndicateList
