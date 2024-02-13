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
import AdminService from 'src/services/AdminService'
import TeacherService from 'src/services/TeacherService'

const column = ['Number', 'Name']

const AddStudentToCourse = () => {
  const [studentList, setStudentList] = useState([])
  const [allStudentList, setAllStudentList] = useState([])
  const [courseList, setCourseList] = useState([])
  const [selectedCourseId, setSelectedCourseId] = useState('')
  const [selectedStudentId, setSelectedStudentId] = useState('')

  useEffect(() => {
    fetchCourseList()
    fetchStudentList()
  }, [])

  const fetchStudentList = async () => {
    const response = await AdminService.instance.getStudentList()
    console.log(response)
    if (response.status) setAllStudentList(response.studentList)
  }

  const fetchCourseList = async () => {
    const response = await AdminService.instance.getCourseList()
    console.log(response)
    if (response.status) setCourseList(response.courseList)
  }

  const fetchCourseSpecificStudentList = async (courseId) => {
    if (courseId === '') return
    const payload = { courseId: courseId }
    const response = await TeacherService.instance.getCourseStudent(payload)
    console.log(response)
    if (response.status) {
      setStudentList(response.courseStudentData)
    }
  }

  const handleCourseSelect = (e) => {
    setSelectedCourseId(e.target.value)
    fetchCourseSpecificStudentList(e.target.value)
  }

  const handleStudentSelect = (e) => {
    setSelectedStudentId(e.target.value)
  }

  const handleSubmit = async () => {
    if (selectedCourseId === '') return
    if (selectedStudentId === '') return

    const payload = {
      courseId: selectedCourseId,
      studentId: selectedStudentId,
    }
    const response = await AdminService.instance.addStudentToCourse(payload)

    if (response.status) {
      setStudentList([
        ...studentList,
        ...allStudentList.filter((student) => student.studentId === selectedStudentId),
      ])
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Students In Course</strong>
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
              <CFormLabel htmlFor="exampleFormControlInput3">Select Student</CFormLabel>
              <CFormSelect
                className="mb-3"
                onChange={handleStudentSelect}
                aria-label="Default select example"
              >
                <option value="">Choose A Student</option>
                {allStudentList.map((student) => {
                  return (
                    <option key={student.studentId} value={student.studentId}>
                      {student.studentName}
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
                {studentList.map((row, _) => {
                  return (
                    <CTableRow key={row.studentId}>
                      <CTableHeaderCell scope="row">{_ + 1}</CTableHeaderCell>
                      <CTableHeaderCell scope="row">{row.studentName}</CTableHeaderCell>
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
