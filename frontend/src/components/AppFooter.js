/* eslint-disable prettier/prettier */
import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        OBC 45
        <span className="ms-1">&copy; 2022</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        STC&amp;S
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
