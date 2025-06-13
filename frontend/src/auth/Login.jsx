import React, { useState } from "react";
import { Card, Button, Form, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {login} from "../service/Service";
import logo from "../assets/logo-kasirqu-002.png"
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    // Validasi sederhana
    if (!email || !password) {
      setErrorMessage("Email dan password wajib diisi.");
      return;
    }
    // Proses login (placeholder, tambahkan logika autentikasi sesuai kebutuhan)
    try {
      const response = await login({ email, password });
      setErrorMessage('Login berhasil');
      navigate('/kasir/dashboard');
 // Redirect ke dashboard
    } catch (error) {
      console.error(error);
      setErrorMessage('Login gagal');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="shadow">
              <Card.Body>
              <img
  alt="Logo"
  src={logo}
  className="img-fluid mb-3"
  style={{ maxHeight: "100px", width: "auto" }}
/>

                <h3 className="title-02">LOGIN</h3>
                <hr height="4px"/>
                {errorMessage && (
                  <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
                    {errorMessage}
                  </Alert>
                )}
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Masukkan email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Masukkan password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    Login
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
