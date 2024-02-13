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
import AdminService from 'src/services/AdminService'

const column = ['Name', 'Email', 'Index', 'Action']

const StudentList = () => {
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    fetchStudentList()
  }, [])

  const fetchStudentList = async () => {
    const response = await AdminService.instance.getStudentList()
    console.log(response)
    if (response.status) setTableData(response.studentList)
  }

  const handleDelete = async (studentId) => {
    const payload = {
      studentId: studentId,
    }

    const response = await AdminService.instance.deleteStudent(payload)
    console.log(response)
    if (response.status) fetchStudentList()
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Student List</strong>
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
                      <CTableDataCell>{row.studentPhone}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="danger" onClick={() => handleDelete(row.studentId)}>
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

export default StudentList
