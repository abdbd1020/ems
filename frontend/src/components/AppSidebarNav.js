import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid"; // Import uuid library

import { CBadge } from "@coreui/react";
import { ClientEnum } from "../ClientEnum";

export const AppSidebarNav = ({ items }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = JSON.parse(localStorage.getItem("userRole"));
  const location = useLocation();

  const generateUniqueId = () => uuidv4(); // Function to generate unique IDs

  const navLink = (id, name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    );
  };

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item;
    const Component = component;
    const uniqueId = generateUniqueId(); // Generate unique ID
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={uniqueId} // Use unique ID as key
        {...rest}
      >
        {navLink(uniqueId, name, icon, badge)}
      </Component>
    );
  };

  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item;
    const Component = component;
    const uniqueId = generateUniqueId(); // Generate unique ID
    return (
      <Component
        idx={String(uniqueId)} // Use unique ID as idx
        key={uniqueId} // Use unique ID as key
        toggler={navLink(uniqueId, name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
      </Component>
    );
  };

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) =>
          item.authority ? (
            item.authority === userRole ? (
              item.items ? (
                navGroup(item, index)
              ) : (
                navItem(item, index)
              )
            ) : (
              <React.Fragment key={generateUniqueId()} /> // Use unique ID as key
            )
          ) : (
            <React.Fragment key={generateUniqueId()} /> // Use unique ID as key
          ),
        )}
    </React.Fragment>
  );
};

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};
