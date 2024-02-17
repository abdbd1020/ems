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
const TeacherUpdateProfile = React.lazy(
  () => import("../views/teacher/profile/TeacherUpdateProfile"),
);
const StudentUpdateProfile = React.lazy(
  () => import("../views/student/profile/StudentUpdateProfile"),
);
const AvailableAdvisorList = React.lazy(
  () => import("../views/student/advisor/AvailableAdvisorList"),
);

const ResetPassword = React.lazy(() => import("../views/user/ResetPassword"));
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
  {
    path: "/teacher/profile/update-profile",
    name: "Update Profile",
    element: TeacherUpdateProfile,
  },
  {
    path: "/user/reset-password",
    name: "Reset Password",
    element: ResetPassword,
  },
  {
    path: "/student/profile/update-profile",
    name: "Update Profile",
    element: StudentUpdateProfile,
  },
  {
    path: "/student/advisor/available-advisor-list",
    name: "Available Advisor List",
    element: AvailableAdvisorList,
  },
];

export default routes;
