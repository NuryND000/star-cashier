import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
  Modal,
  Form,
} from "react-bootstrap";
import {
  getUsers,
  deleteUser,
  createUser,
  updateUser,
} from "../service/Service";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    no_telp: "",
    email: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Gagal memuat daftar user.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(userToDelete.id);
      setAlert("User berhasil dihapus.");
      setShowConfirm(false);
      fetchUsers();
      setTimeout(() => setAlert(""), 3000);
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Gagal menghapus user.");
    }
  };

  const handleFormSubmit = async () => {
    try {
      const dataToSend = { ...formData };

      // Kalau update, dan password kosong → hapus dari payload
      if (editMode && !formData.password) {
        delete dataToSend.password;
      }

      if (editMode) {
        await updateUser(formData.id, dataToSend);
        setAlert("User berhasil diperbarui.");
      } else {
        await createUser(dataToSend);
        setAlert("User berhasil ditambahkan.");
      }

      setShowModal(false);
      fetchUsers();
      setTimeout(() => setAlert(""), 3000);
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Gagal menyimpan user.");
    }
  };

  const openAddModal = () => {
    setEditMode(false);
    setFormData({ id: "", name: "", no_telp: "", email: "", role: "" });
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setEditMode(true);
    setFormData(user);
    setShowModal(true);
  };

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col>
          <h1 className="title-01">Daftar User</h1>
        </Col>
      </Row>
      <Row>
        <Col>{alert && <Alert variant="success">{alert}</Alert>}</Col>
        <Col className="text-end">
          <Button onClick={openAddModal} variant="warning">
            Tambah User
          </Button>
        </Col>
      </Row>

      <Row className="mt-3">
        <Card className="p-0">
          <Table striped size="sm" hover className="mt-3">
            <thead>
              <tr>
                <th>Nama</th>
                <th>No. Telepon</th>
                <th>Email</th>
                <th>Role</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.no_telp}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => openEditModal(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        setUserToDelete(user);
                        setShowConfirm(true);
                      }}
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Row>

      {/* Modal Konfirmasi Hapus */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin ingin menghapus user{" "}
          <strong>{userToDelete?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Tambah / Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit User" : "Tambah User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>No. Telepon</Form.Label>
              <Form.Control
                type="text"
                value={formData.no_telp}
                onChange={(e) =>
                  setFormData({ ...formData, no_telp: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                <option value="">-- Pilih Role --</option>
                <option value="kasir">Kasir</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
		autoComplete="new-password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder={
                  editMode ? "(Biarkan kosong jika tidak diubah)" : ""
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserList;
