import React from "react";
import { Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const TabsKasir = ({ routes }) => {
  const location = useLocation();

  const createLinks = (routes) => {
    return routes.map((prop, key) => (
      <Nav.Item key={key}>
        <Nav.Link href={prop.path} active={location.pathname === prop.path}>
          {prop.name}
        </Nav.Link>
      </Nav.Item>
    ));
  };

  return (
    <Nav variant="tabs" className="mt-3 tabs-transparent justify-content-center" activeKey={location.pathname}>
      {createLinks(routes)}
    </Nav>
  );
};

export default TabsKasir;
