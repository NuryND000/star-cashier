import React, { useState, useEffect } from "react";
import { Form, Button, Card, Alert, Row, Col, Container } from "react-bootstrap";
import { getUser, updateUser } from "../service/Service";

const Toko = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      fetchUser(parsedUser.id);
    }
  }, []);

  const fetchUser = async (id) => {
    try {
      const toko = await getUser(id);
      setUser(toko);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Gagal memuat data toko.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateUser(user.id, user);
      setAlert("Profil toko berhasil diperbarui!");
      setIsEditing(false);
      setTimeout(() => setAlert(""), 3000);
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Gagal memperbarui profil toko.");
    }
  };

  return (
    <Container fluid className="mt-3">
      <Row className="mt-4">
        <Col>
          <h1 className="title-01">Profil Toko</h1>
        </Col>
      </Row>
      <Row>
        <Card>
          <Card.Body>
            {alert && <Alert variant="success">{alert}</Alert>}

            <Form>
              {/* Nama Toko */}
              <Form.Group className="mb-3 text-start">
                <Form.Label>Nama Toko</Form.Label>
                <Form.Control
                  type="text"
                  name="nama_toko"
                  value={user?.nama_toko || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  style={{ textAlign: "left" }}
                />
              </Form.Group>

              {/* Alamat Toko */}
              <Form.Group className="mb-3 text-start">
                <Form.Label>Alamat Toko</Form.Label>
                <Form.Control
                  type="text"
                  name="alamat"
                  value={user?.alamat || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  style={{ textAlign: "left" }}
                />
              </Form.Group>

              {/* Nomor Telepon Toko */}
              <Form.Group className="mb-3 text-start">
                <Form.Label>Nomor Telepon Toko</Form.Label>
                <Form.Control
                  type="text"
                  name="no_telp"
                  value={user?.no_telp || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  style={{ textAlign: "left" }}
                />
              </Form.Group>

              {/* Nama Pemilik */}
              <Form.Group className="mb-3 text-start">
                <Form.Label>Nama Pemilik</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={user?.name || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  style={{ textAlign: "left" }}
                />
              </Form.Group>

              {isEditing ? (
                <>
                  <Button variant="primary" onClick={handleSave} className="me-2">
                    Simpan
                  </Button>
                  <Button variant="secondary" onClick={() => setIsEditing(false)}>
                    Batal
                  </Button>
                </>
              ) : (
                <Button variant="warning" onClick={() => setIsEditing(true)}>
                  Edit Profil
                </Button>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default Toko;
