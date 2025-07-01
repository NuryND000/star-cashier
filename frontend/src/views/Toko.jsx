import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  Alert,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { getToko, updateToko } from "../service/Service";

const Toko = () => {
  const [toko, setToko] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    fetchToko();
  }, []);

  const fetchToko = async () => {
    try {
      const data = await getToko();
      setToko(data[0]);
    } catch (error) {
      console.error("Error fetching toko:", error);
      alert("Gagal memuat data toko.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setToko((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateToko(toko?.id, toko);
      setAlert("Profil toko berhasil diperbarui!");
      setIsEditing(false);
      setTimeout(() => setAlert(""), 3000);
    } catch (error) {
      console.error("Error updating toko:", error);
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
                  name="name"
                  value={toko?.name || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </Form.Group>

              {/* Alamat Toko */}
              <Form.Group className="mb-3 text-start">
                <Form.Label>Alamat</Form.Label>
                <Form.Control
                  type="text"
                  name="alamat"
                  value={toko?.alamat || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </Form.Group>

              {/* No Telepon */}
              <Form.Group className="mb-3 text-start">
                <Form.Label>Nomor Telepon</Form.Label>
                <Form.Control
                  type="text"
                  name="no_telp"
                  value={toko?.no_telp || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </Form.Group>

              {isEditing ? (
                <>
                  <Button
                    variant="primary"
                    onClick={handleSave}
                    className="me-2"
                  >
                    Simpan
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setIsEditing(false)}
                  >
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
