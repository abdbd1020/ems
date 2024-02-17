import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";
import { ClientEnum } from "./ClientEnum";

const _nav = [
  {
    component: CNavTitle,
    name: "Admin",
  },
  {
    component: CNavGroup,
    name: "Users",
    to: "/admin/user/",
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    authority: ClientEnum.ADMIN_TYPE,
    items: [
      {
        component: CNavItem,
        name: "Teachers",
        to: "/admin/user/teacher-list",
        authority: ClientEnum.ADMIN_TYPE,
      },
      {
        component: CNavItem,
        name: "Students",
        to: "/admin/user/student-list",
        authority: ClientEnum.ADMIN_TYPE,
      },
      {
        component: CNavItem,
        name: "Inactive Users",
        to: "/admin/user/inactive-user-list",
        authority: ClientEnum.ADMIN_TYPE,
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Faculty",
    to: "/admin/faculty/",
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    authority: ClientEnum.ADMIN_TYPE,
    items: [
      {
        component: CNavItem,
        name: "Faculty List",
        to: "/admin/faculty/faculty-list",
        authority: ClientEnum.ADMIN_TYPE,
      },
      {
        component: CNavItem,
        name: "Add Faculty",
        to: "/admin/faculty/add-update-faculty",
        authority: ClientEnum.ADMIN_TYPE,
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Department",
    to: "/admin/department/",
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    authority: ClientEnum.ADMIN_TYPE,
    items: [
      {
        component: CNavItem,
        name: "Department List",
        to: "/admin/department/department-list",
        authority: ClientEnum.ADMIN_TYPE,
      },
      {
        component: CNavItem,
        name: "Add Department",
        to: "/admin/department/add-update-department",
        authority: ClientEnum.ADMIN_TYPE,
      },
    ],
  },

  {
    component: CNavGroup,
    name: "Profile",
    to: "/teacher",
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    authority: ClientEnum.TEACHER_TYPE,
    items: [
      {
        component: CNavItem,
        name: "Update Profile",
        to: "/teacher/profile/update-profile",
        icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
        authority: ClientEnum.TEACHER_TYPE,
      },
      {
        component: CNavItem,
        name: "Reset Password",
        to: "/user/reset-password",
        icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
        authority: ClientEnum.TEACHER_TYPE,
      },
    ],
  },

  {
    component: CNavGroup,
    name: "Profile",
    to: "/student",
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    authority: ClientEnum.STUDENT_TYPE,
    items: [
      {
        component: CNavItem,
        name: "Update Profile",
        to: "/student/profile/update-profile",
        icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
        authority: ClientEnum.STUDENT_TYPE,
      },
      {
        component: CNavItem,
        name: "Reset Password",
        to: "/user/reset-password",
        icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
        authority: ClientEnum.STUDENT_TYPE,
      },
    ],
  },

  {
    component: CNavItem,
    name: "IN/OUT Register",
    to: "/student/advisor/available-advisor-list",
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    authority: ClientEnum.STUDENT_TYPE,
  },

  {
    component: CNavTitle,
    name: "Components",
  },

  {
    component: CNavTitle,
    name: "Extras",
  },
  {
    component: CNavGroup,
    name: "Pages",
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Login",
        to: "/login",
      },
      {
        component: CNavItem,
        name: "Register",
        to: "/register",
      },
      {
        component: CNavItem,
        name: "Error 404",
        to: "/404",
      },
      {
        component: CNavItem,
        name: "Error 500",
        to: "/500",
      },
    ],
  },
  {
    component: CNavItem,
    name: "Docs",
    href: "https://coreui.io/react/docs/templates/installation/",
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
];

export default _nav;
