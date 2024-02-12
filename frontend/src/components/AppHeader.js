import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CButton,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from "@coreui/icons";

import { AppBreadcrumb } from "./index";
import { AppHeaderDropdown } from "./header/index";
import { logo } from "../assets/brand/logo";
import { ClientEnum } from "../ClientEnum";

const AppHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const user = JSON.parse(localStorage.getItem("user"));
  let name;
  let type;

  if (user.type === ClientEnum.ADMIN_TYPE) {
    name = user.adminName;
    type = user.type;
  }
  if (user.type === ClientEnum.TEACHER_TYPE) {
    name = user.teacherName;
    type = "INSTRUCTOR";
  }
  if (user.type === ClientEnum.STUDENT_TYPE) {
    name = user.studentName;
    type = user.type;
  }

  const signout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: "set", sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto "></CHeaderNav>
        <CHeaderNav className="ms-3">
          <CNavItem className="me-4 mt-1">
            <h4>
              {name}, {type}
            </h4>
          </CNavItem>
          <CNavItem>
            <CButton onClick={signout}>Signout</CButton>
          </CNavItem>
        </CHeaderNav>
      </CContainer>
      {/* <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer> */}
    </CHeader>
  );
};

export default AppHeader;
