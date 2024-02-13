/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
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
import TeacherService from 'src/services/TeacherService'
import { useLocation } from 'react-router-dom'
import { ClientEnum } from 'src/config/ClientEnum'
import StudentService from 'src/services/StudentService'

const ViewExercise = () => {
  const location = useLocation()
  const exercise = location.state.exercise

  const user = JSON.parse(localStorage.getItem('user'))
  /*
  questionTitle : asdasd,
                   questionGeneralIdea : asdasd,
                   questionSpecialIdea : asdasd,
                   questionNarrative1 : asdasd,
                   questionRequirement1 : asdasd,
                   questionNarrative2 : asdasd,
                   questionRequirement2 : asdasd,
                   */
  const [questionTitle, setQuestionTitle] = useState('')
  const [questionGeneralIdea, setQuestionGeneralIdea] = useState('')
  const [questionSpecialIdea, setQuestionSpecialIdea] = useState('')
  const [questionNarrative1, setQuestionNarrative1] = useState('')
  const [questionRequirement1, setQuestionRequirement1] = useState('')
  const [questionNarrative2, setQuestionNarrative2] = useState('')
  const [questionRequirement2, setQuestionRequirement2] = useState('')

  const [activeQuestion, setActiveQuestion] = useState(false)
  const [activeItem, setActiveItem] = useState(0)

  const [questionList, setQuestionList] = useState([])

  useEffect(() => {
    fetchQuestionList()
  }, [])

  const fetchQuestionList = async () => {
    const payload = {
      exerciseId: exercise.exerciseId,
    }

    const response = await StudentService.instance.getQuestions(payload)
    console.log(response)
    if (response.status) {
      setQuestionList(response.questionList)
    }
  }

  const handleSubmit = async () => {
    const payload = {
      exerciseId: exercise.exerciseId,
      teacherId: user.teacherId,
      questionTitle: questionTitle,
      questionGeneralIdea: questionGeneralIdea,
      questionSpecialIdea: questionSpecialIdea,
      questionNarrative1: questionNarrative1,
      questionRequirement1: questionRequirement1,
      questionNarrative2: questionNarrative2,
      questionRequirement2: questionRequirement2,
    }

    const response = await TeacherService.instance.uploadFile(payload)

    if (response.status) {
      console.log(response.responseMessage)
      fetchQuestionList()
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Exercise Details</strong>
          </CCardHeader>
          <CCardBody>
            {user.type === ClientEnum.TEACHER_TYPE ? (
              <CAccordion activeItemKey={activeQuestion ? 1 : 0}>
                <CAccordionItem itemKey={1} onClick={() => setActiveQuestion(!activeQuestion)}>
                  <CAccordionHeader>Create Question</CAccordionHeader>
                  <CAccordionBody>
                    <CForm>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">Question Title</CFormLabel>
                        <CFormInput
                          type="text"
                          value={questionTitle}
                          onChange={(e) => setQuestionTitle(e.target.value)}
                          id="exampleFormControlInput1"
                          placeholder="Title"
                        />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Question General Idea
                        </CFormLabel>
                        <CFormTextarea
                          type="text"
                          value={questionGeneralIdea}
                          onChange={(e) => setQuestionGeneralIdea(e.target.value)}
                          id="exampleFormControlInput1"
                          placeholder="Question General Idea"
                          rows={4}
                        />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Question Special Idea
                        </CFormLabel>
                        <CFormTextarea
                          type="text"
                          value={questionSpecialIdea}
                          onChange={(e) => setQuestionSpecialIdea(e.target.value)}
                          id="exampleFormControlInput1"
                          placeholder="Question Special Idea"
                          rows={4}
                        />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Question Narative 1
                        </CFormLabel>
                        <CFormTextarea
                          type="text"
                          value={questionNarrative1}
                          onChange={(e) => setQuestionNarrative1(e.target.value)}
                          id="exampleFormControlInput1"
                          placeholder="Question Narative 1"
                          rows={4}
                        />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Question Requirement 1
                        </CFormLabel>
                        <CFormTextarea
                          type="text"
                          value={questionRequirement1}
                          onChange={(e) => setQuestionRequirement1(e.target.value)}
                          id="exampleFormControlInput1"
                          placeholder="Question Requirement 1"
                          rows={4}
                        />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Question Narative 2
                        </CFormLabel>
                        <CFormTextarea
                          type="text"
                          value={questionNarrative2}
                          onChange={(e) => setQuestionNarrative2(e.target.value)}
                          id="exampleFormControlInput1"
                          placeholder="Question Narative 2"
                          rows={4}
                        />
                      </div>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Question Requirement 2
                        </CFormLabel>
                        <CFormTextarea
                          type="text"
                          value={questionRequirement2}
                          onChange={(e) => setQuestionRequirement2(e.target.value)}
                          id="exampleFormControlInput1"
                          placeholder="Question Requirement 2"
                          rows={4}
                        />
                      </div>
                    </CForm>
                    <CContainer className="my-3 d-flex justify-content-end">
                      <CButton color="primary" onClick={handleSubmit}>
                        Submit
                      </CButton>
                    </CContainer>
                  </CAccordionBody>
                </CAccordionItem>
              </CAccordion>
            ) : (
              <></>
            )}
            <CAccordion activeItemKey={activeItem}>
              {questionList.map((question, index) => {
                return (
                  <CAccordionItem
                    key={index + 1}
                    itemKey={index + 1}
                    onClick={() => setActiveItem(index + 1)}
                  >
                    <CAccordionHeader>Title: {question.questionTitle}</CAccordionHeader>
                    <CAccordionBody>
                      <CRow>
                        <CContainer>
                          <h4>Question General Idea</h4>
                          <p>{question.questionGeneralIdea}</p>
                        </CContainer>
                      </CRow>
                      <CRow>
                        <CContainer>
                          <h4>Question Special Idea</h4>
                          <p>{question.questionSpecialIdea}</p>
                        </CContainer>
                      </CRow>
                      <CRow>
                        <CContainer>
                          <h4>Question Naratice 1</h4>
                          <p>{question.questionNarrative1}</p>
                        </CContainer>
                      </CRow>
                      <CRow>
                        <CContainer>
                          <h4>Question Requirement 1</h4>
                          <p>{question.questionRequirement1}</p>
                        </CContainer>
                      </CRow>
                      <CRow>
                        <CContainer>
                          <h4>Question Naratice 2</h4>
                          <p>{question.questionNarrative2}</p>
                        </CContainer>
                      </CRow>
                      <CRow>
                        <CContainer>
                          <h4>Question Requirement 2</h4>
                          <p>{question.questionRequirement2}</p>
                        </CContainer>
                      </CRow>
                    </CAccordionBody>
                  </CAccordionItem>
                )
              })}
            </CAccordion>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ViewExercise
