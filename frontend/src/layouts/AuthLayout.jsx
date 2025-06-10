import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavbarKasir from "../components/Navbar"; // Navbar terpisah
import routes from "../routes";
import Footer from "../components/Footer";

const AuthLayout = () => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainContent.current) {
      mainContent.current.scrollTop = 0;
    }
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return <Route path={prop.path} element={prop.component} key={key} exact />;
      }
      return null;
    });
  };

  return (
    <>

      <div className="justify-content-center" ref={mainContent}>
        <Container fluid>
          <Routes>
            {getRoutes(routes)}
            <Route path="*" element={<Navigate to="/star-cashier/auth/login" replace />} />
          </Routes>
        </Container>
      </div>
      <Footer/>
    </>
  );
};

export default AuthLayout;
