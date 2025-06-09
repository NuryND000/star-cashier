import React, {  useEffect, useRef } from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavbarKasir from "../components/Navbar"; // Navbar terpisah
import routes from "../routes";
import Footer from "../components/Footer";

const KasirLayout = () => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      if (mainContent.current) {
        mainContent.current.scrollTop = 0;
      }
      hasFetched.current = true;
    }
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "kasir") {
        return <Route path={prop.path} element={prop.component} key={key} exact />;
      }
      return null;
    });
  };

  return (
    <>
      {/* Navbar */}
      <NavbarKasir />

      <div className="main-content justify-content-center" ref={mainContent}>
        <Container fluid>
          <Routes>
            {getRoutes(routes)}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Container>
      </div>
      <Footer/>
    </>
  );
};

export default KasirLayout;
