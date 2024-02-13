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
import { useLocation } from 'react-router-dom'

const column = ['Name', 'Email', 'Role']

const ViewExercise = () => {
  const [tableData, setTableDate] = useState([])

  const location = useLocation()
  const syndicate = location.state.syndicate

  const fetchSyndicateMembers = async () => {
    const payload = { syndicateId: syndicate.syndicateId }
    const response = await TeacherService.instance.getSyndicateMembers(payload)
    console.log(response)
    if (response.status) {
      setTableDate(response.syndicateData)
    }
  }

  useEffect(() => {
    fetchSyndicateMembers()
  }, [])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Syndicate Details</strong>
          </CCardHeader>
          <CCardBody>
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

export default ViewExercise
