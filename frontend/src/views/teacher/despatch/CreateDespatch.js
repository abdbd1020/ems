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

const column = ['Name', 'Email', 'Phone']

const CreateDespatch = () => {
  const [syndicateList, setSyndicateList] = useState([])
  const [selectedSyndicateId, setSelectedSyndicateId] = useState('')
  const [courseList, setCourseList] = useState([])
  const [selectedCourseId, setSelectedCourseId] = useState('')
  const [exerciseList, setExerciseList] = useState([])
  const [selectedExerciseId, setSelectedExerciseId] = useState('')

  const [studentId, setStudentId] = useState('')

  const [tableData, setTableData] = useState([])

  const [securityClassification, setSecurityClassification] = useState('')
  const [date, setDate] = useState('')
  const [precedence, setPrecedence] = useState('')
  const [letterNumber, setLetterNumber] = useState('')
  const [originatorNumber, setOriginatorNumber] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

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

  const fetchSyndicateMembers = async (syndicateId) => {
    if (syndicateId === '') return
    const payload = { syndicateId: syndicateId }
    const response = await TeacherService.instance.getSyndicateMembers(payload)
    console.log(response)
    if (response.status) {
      for (let index = 0; index < response.syndicateData.length; index++) {
        const student = response.syndicateData[index]
        if (student.studentRole === ClientEnum.SUPERINDENDENT_TYPE) {
          console.log('found')
          setStudentId(student.studentId)
          break
        }
      }
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

  const handleSyndicateSelect = (e) => {
    setSelectedSyndicateId(e.target.value)
    fetchSyndicateMembers(e.target.value)
  }

  const handleSubmit = async () => {
    if (selectedSyndicateId === '') return
    if (studentId === '') return

    const payload = {
      syndicateId: selectedSyndicateId,
      studentId: studentId,
      teacherId: JSON.parse(localStorage.getItem('user')).teacherId,
      despatchDate: date,
      despatchSecurityClassification: securityClassification,
      despatchPrecedence: precedence,
      despatchFrom: from,
      despatchTo: to,
      despatchLetterNumber: letterNumber,
      despatchOriginatorNumber: originatorNumber,
    }

    console.log(payload)

    const response = await TeacherService.instance.createDespatch(payload)
    console.log(response)
    if (response.status) {
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Create Despatch</strong>
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
            <CForm>
              <CContainer className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Security Classification</CFormLabel>
                <CFormInput
                  type="text"
                  value={securityClassification}
                  onChange={(e) => setSecurityClassification(e.target.value)}
                  placeholder="Security Classification"
                />
              </CContainer>
              <CContainer className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Date</CFormLabel>
                <CFormInput
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Date"
                />
              </CContainer>
              <CContainer className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Precedence</CFormLabel>
                <CFormInput
                  type="text"
                  value={precedence}
                  onChange={(e) => setPrecedence(e.target.value)}
                  placeholder="Precedence"
                />
              </CContainer>
              <CContainer className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Letter No.</CFormLabel>
                <CFormInput
                  type="text"
                  value={letterNumber}
                  onChange={(e) => setLetterNumber(e.target.value)}
                  placeholder="Letter No."
                />
              </CContainer>
              <CContainer className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Originator No.</CFormLabel>
                <CFormInput
                  type="text"
                  value={originatorNumber}
                  onChange={(e) => setOriginatorNumber(e.target.value)}
                  placeholder="Originator's No."
                />
              </CContainer>
              <CContainer className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">From</CFormLabel>
                <CFormInput
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="From"
                />
              </CContainer>
              <CContainer className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">To</CFormLabel>
                <CFormInput
                  type="text"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="To"
                />
              </CContainer>
              <CContainer className="my-3 d-flex justify-content-end">
                <CButton color="primary" onClick={handleSubmit}>
                  Submit
                </CButton>
              </CContainer>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CreateDespatch
