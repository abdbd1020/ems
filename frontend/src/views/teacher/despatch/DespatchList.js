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
import { useNavigate } from 'react-router-dom'

const column = [
  'Letter No.',
  'Security Classification',
  'Date',
  'Precedence',
  "Originator's No",
  'From',
  'To',
  'Status',
  'Actions',
]

const CreateDespatch = () => {
  const navigate = useNavigate()
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    fetchDespatchList()
  }, [])

  const fetchDespatchList = async () => {
    const response = await TeacherService.instance.getDespatchList()
    console.log(response)
    if (response.status) setTableData(response.despatchData)
  }

  const handleView = (row) => {
    navigate('/view-despatch', { state: { despatch: row } })
  }

  const handleDelete = async (despatchId) => {
    const payload = {
      despatchId: despatchId,
    }

    const response = await TeacherService.instance.deleteDespatch(payload)
    console.log(response)
    if (response.status) fetchDespatchList()
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Despatch List</strong>
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
                {tableData.map((row, _) => {
                  return (
                    <CTableRow key={row.despatchId}>
                      <CTableHeaderCell scope="row">{row.despatchLetterNumber}</CTableHeaderCell>
                      <CTableHeaderCell scope="row">
                        {row.despatchSecurityClassification}
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="row">{row.despatchDate}</CTableHeaderCell>
                      <CTableHeaderCell scope="row">{row.despatchPrecedence}</CTableHeaderCell>
                      <CTableHeaderCell scope="row">
                        {row.despatchOriginatorNumber}
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="row">{row.despatchFrom}</CTableHeaderCell>
                      <CTableHeaderCell scope="row">{row.despatchTo}</CTableHeaderCell>
                      <CTableHeaderCell scope="row">{row.despatchStatus}</CTableHeaderCell>
                      <CTableHeaderCell scope="row">
                        <CButton color="success" onClick={() => handleView(row)}>
                          View
                        </CButton>
                        <CButton color="danger" onClick={() => handleDelete(row.despatchId)}>
                          Delete
                        </CButton>
                      </CTableHeaderCell>
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

export default CreateDespatch
