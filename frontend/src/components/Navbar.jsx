import React, { useState, useEffect } from "react";
import { Navbar, Container, Dropdown } from "react-bootstrap";
import TabsKasir from "./Tabs";
import routes from "../routes";
import GantiPassword from "../auth/GantiPassword";
import { logout, getUser } from "../service/Service";
import logo from "../assets/logo-kasirqu-001.png";

const NavbarKasir = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser); // Parse JSON dari localStorage
        fetchUser(parsedUser.id);
      }
    }, []);

      const fetchUser = async (id) => {
        try {
          const toko = await getUser(id); // Ambil data user dari API
          setUser(toko); // Simpan data user di state
        } catch (error) {
          console.error("Error fetching data:", error);
          alert("Gagal memuat data toko.");
        }
      };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('token'); // Hapus token dari localStorage
      alert('Logout berhasil');
      window.location.href = '/star-cashier/auth/login'; // Redirect ke login
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleChangePassword = () => {
    setShowModal(true);
  };

  return (
    <div>
      <Navbar className="navbar-gradient p-0" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="/dashboard">
          <img
              alt=""
              src={logo}
              width="auto"
              height="40"
              className="d-inline-block align-top mt-2"
            />{' '}</Navbar.Brand>
          <Dropdown align="end">
            <Dropdown.Toggle variant="outline-light" size="sm">
              {user?.name || ""}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleChangePassword}>
                Ganti Password
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
      <div className="navbar-gradient"
        style={{
          position: "fixed",
          top: "43px",
          width: "100%",
          zIndex: "1020",
        }}
      >
        <TabsKasir routes={routes.filter((route) => route.layout != "/auth")} />
      </div>
      <GantiPassword show={showModal} handleClose={() => setShowModal(false)} />
    </div>
  );
};

export default NavbarKasir;
