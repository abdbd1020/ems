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
    path: "/admin/update-user",
    name: "Update User",
    element: AdminUpdateUser,
  },
];

export default routes;
