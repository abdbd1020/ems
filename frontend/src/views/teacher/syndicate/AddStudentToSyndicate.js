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
import { ClientEnum } from 'src/config/ClientEnum'

const column = ['Name', 'Email', 'Role']

const AddStudentToCourse = () => {
  const [tableData, setTableDate] = useState([])
  const [studentList, setStudentList] = useState([])
  const [selectedStudentId, setSelectedStudentId] = useState('')
  const [selectedSyndicateId, setSelectedSyndicateId] = useState('')
  const [syndicateList, setSyndicateList] = useState([])
  const [courseList, setCourseList] = useState([])
  const [selectedCourseId, setSelectedCourseId] = useState('')
  const [exerciseList, setExerciseList] = useState([])
  const [selectedExerciseId, setSelectedExerciseId] = useState('')
  const [roles, setRoles] = useState([
    ClientEnum.SUPERINDENDENT_TYPE,
    ClientEnum.IN_OUT_CLERK,
    ClientEnum.ACCEPTANCE_CLERK,
  ])
  const [selectedRole, setSelectedRole] = useState('')

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

  const fetchStudentList = async (courseId) => {
    if (courseId === '') return
    const payload = { courseId: courseId }
    const response = await TeacherService.instance.getCourseStudent(payload)
    console.log(response)
    if (response.status) {
      setStudentList(response.courseStudentData)
    }
  }

  const fetchSyndicateMembers = async (syndicateId) => {
    if (syndicateId === '') return
    const payload = { syndicateId: syndicateId }
    const response = await TeacherService.instance.getSyndicateMembers(payload)
    console.log(response)
    if (response.status) {
      setTableDate(response.syndicateData)
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
    fetchStudentList(e.target.value)
  }

  const handleExerciseSelect = (e) => {
    setSelectedExerciseId(e.target.value)
    fetchSyndicateList(e.target.value)
  }

  const handleStudentSelect = (e) => {
    setSelectedStudentId(e.target.value)
  }

  const handleSyndicateSelect = (e) => {
    setSelectedSyndicateId(e.target.value)
    fetchSyndicateMembers(e.target.value)
  }

  const handleRoleSelect = (e) => {
    setSelectedRole(e.target.value)
  }

  const handleSubmit = async () => {
    if (selectedSyndicateId === '') return
    if (selectedStudentId === '') return
    if (selectedRole === '') return

    const payload = {
      syndicateId: selectedSyndicateId,
      studentId: selectedStudentId,
      studentRole: selectedRole,
    }

    const response = await TeacherService.instance.addStudentToSyndicate(payload)
    console.log(response)
    if (response.status) {
      setSelectedRole('')
      setSelectedStudentId('')
      fetchSyndicateMembers(selectedSyndicateId)
    }
    console.log(payload)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Student to Syndicate</strong>
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
              <CFormLabel htmlFor="exampleFormControlInput3">Select Exercise</CFormLabel>
              <CFormSelect
                onChange={handleExerciseSelect}
                value={selectedExerciseId}
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
            <CContainer className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput3">Select Syndicate</CFormLabel>
              <CFormSelect
                className="mb-3"
                value={selectedSyndicateId}
                onChange={handleSyndicateSelect}
                aria-label="Default select example"
              >
                <option value="">Choose A Syndicate</option>
                {syndicateList.map((syndicate) => {
                  return (
                    <option key={syndicate.syndicateId} value={syndicate.syndicateId}>
                      {syndicate.sydicateName}
                    </option>
                  )
                })}
              </CFormSelect>
            </CContainer>
            <CContainer className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput3">Select Student</CFormLabel>
              <CFormSelect
                className="mb-3"
                value={selectedStudentId}
                onChange={handleStudentSelect}
                aria-label="Default select example"
              >
                <option value="">Choose A Student</option>
                {studentList.map((student) => {
                  return (
                    <option key={student.studentId} value={student.studentId}>
                      {student.studentName}
                    </option>
                  )
                })}
              </CFormSelect>
            </CContainer>
            <CContainer className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput3">Select Role</CFormLabel>
              <CFormSelect
                className="mb-3"
                value={selectedRole}
                onChange={handleRoleSelect}
                aria-label="Default select example"
              >
                <option value="">Choose A Role</option>
                {roles.map((role, _) => {
                  return (
                    <option key={_} value={role}>
                      {role}
                    </option>
                  )
                })}
              </CFormSelect>
              <CButton color="primary" onClick={handleSubmit}>
                Add Student
              </CButton>
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
                {tableData.map((row) => {
                  return (
                    <CTableRow key={row.studentId}>
                      <CTableHeaderCell scope="row">{row.studentName}</CTableHeaderCell>
                      <CTableDataCell>{row.studentEmail}</CTableDataCell>
                      <CTableDataCell>{row.studentRole}</CTableDataCell>
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

export default AddStudentToCourse
