/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import TeacherService from 'src/services/TeacherService'
import StudentService from 'src/services/StudentService'
import { ClientEnum } from 'src/config/ClientEnum'
import { useNavigate } from 'react-router-dom'

const column = ['Number', 'From', 'To', 'Route', 'Status', 'Actions']

const TransitList = () => {
  const [tableData, setTableData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchTransitList()
  }, [])

  const fetchTransitList = async () => {
    const response = await TeacherService.instance.getTransitSlip()
    console.log(response)
    if (response.status) setTableData(response.transitSlipData)
  }

  const handleSend = async (slip) => {
    const payload = {
      transitSlipId: slip.transitSlipId,
      transitSlipStatus: 'SENT',
    }

    const response = await StudentService.instance.updateTransitSlip(payload)
    console.log(response)
    if (response.status) {
      fetchTransitList()
    }
  }

  const handleView = (row) => {
    console.log(row)
    navigate('/view-transit-slip', { state: row })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Transit Slip List</strong>
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
                    <CTableRow key={row.transitSlipId}>
                      <CTableHeaderCell scope="row">{row.transitSlipNumber}</CTableHeaderCell>
                      <CTableHeaderCell scope="row">{row.transitSlipFrom}</CTableHeaderCell>
                      <CTableHeaderCell scope="row">{row.transitSlipTo}</CTableHeaderCell>
                      <CTableHeaderCell scope="row">{row.transitSlipRoute}</CTableHeaderCell>
                      <CTableHeaderCell scope="row">{row.transitSlipStatus}</CTableHeaderCell>
                      <CTableHeaderCell scope="row">
                        <CButton
                          disabled={row.transitSlipStatus !== 'UNSENT'}
                          onClick={() => handleSend(row)}
                        >
                          Send
                        </CButton>
                        <CButton onClick={() => handleView(row)}>View</CButton>
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

export default TransitList
