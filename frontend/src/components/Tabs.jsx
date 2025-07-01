import React from "react";
import { Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const TabsKasir = ({ routes }) => {
  const location = useLocation();
  const role = localStorage.getItem("role"); // ambil role dari localStorage

  // Filter route berdasarkan role
  const filteredRoutes = routes.filter((route) => {
    if (role === "kasir") {
      // Kasir hanya boleh lihat tab kasir
      return route.path === "/kasir";
    }
    // Admin bisa lihat semua
    return true;
  });

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
    <Nav
      variant="tabs"
      className="mt-4 tabs-transparent justify-content-center"
      activeKey={location.pathname}
    >
      {createLinks(filteredRoutes)}
    </Nav>
  );
};

export default TabsKasir;
