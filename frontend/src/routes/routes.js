import React from "react";
const Dashboard = React.lazy(() => import("../views/dashboard/Dashboard"));

//admin routes

//teacher
const AdminTeachersList = React.lazy(
  () => import("../views/admin/user/AdminTeachersList"),
);
const AdminStudentsList = React.lazy(
  () => import("../views/admin/user/AdminStudentsList"),
);
const AdminInactiveUserList = React.lazy(
  () => import("../views/admin/user/AdminInactiveUserList"),
);
const AdminUpdateUser = React.lazy(
  () => import("../views/admin/user/AdminUpdateUser"),
);
const AdminFacultysList = React.lazy(
  () => import("../views/admin/faculty/AdminFacultyList"),
);
const AdminAddUpdateFaculty = React.lazy(
  () => import("../views/admin/faculty/AdminAddUpdateFaculty"),
);
const AdminDepartmentsList = React.lazy(
  () => import("../views/admin/department/AdminDepartmentList"),
);
const AdminAddUpdateDepartment = React.lazy(
  () => import("../views/admin/department/AdminAddUpdateDepartment"),
);
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },

  {
    path: "/admin/user/teacher-list",
    name: "Teacher List",
    element: AdminTeachersList,
  },
  {
    path: "/admin/user/student-list",
    name: "Add Student",
    element: AdminStudentsList,
  },
  {
    path: "/admin/user/inactive-user-list",
    name: "Inactive User List",
    element: AdminInactiveUserList,
  },
  {
    path: "/admin/user/update-user",
    name: "Update User",
    element: AdminUpdateUser,
  },
  {
    path: "/admin/faculty/faculty-list",
    name: "Faculty List",
    element: AdminFacultysList,
  },
  {
    path: "/admin/faculty/add-update-faculty",
    name: "Add Faculty",
    element: AdminAddUpdateFaculty,
  },
  {
    path: "/admin/department/department-list",
    name: "Department List",
    element: AdminDepartmentsList,
  },
  {
    path: "/admin/department/add-update-department",
    name: "Add Department",
    element: AdminAddUpdateDepartment,
  },
];

export default routes;
