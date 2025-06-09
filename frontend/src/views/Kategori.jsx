import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Form, Modal, Card } from 'react-bootstrap';
import { getKategori, updateKategori, deleteKategori, createKategori } from '../service/Service';

const Kategori = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]); // Untuk kategori hasil filter
  const [searchTerm, setSearchTerm] = useState(''); // Input pencarian
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchKategori();
    handleSearch(searchTerm); // Update daftar hasil pencarian setiap kali `searchTerm` berubah
  }, [searchTerm, categories]);

  const fetchKategori = async () => {
    try {
      const kategori = await getKategori();
      setCategories(kategori.data);
      setFilteredCategories(kategori.data); // Inisialisasi hasil filter dengan semua kategori
    } catch (error) {
      console.error('Error fetching categories:', error);
      alert('Gagal memuat data kategori.');
    }
  };

  const handleSearch = (term) => {
    const lowerCaseTerm = term.toLowerCase();
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(lowerCaseTerm)
    );
    setFilteredCategories(filtered);
  };

  const handleAdd = () => {
    setCurrentCategory(null);
    setCategoryName('');
    setShowModal(true);
  };

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setCategoryName(category.name);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
      try {
        setIsLoading(true);
        await deleteKategori(id);
        setCategories((prev) => prev.filter((category) => category.id !== id));
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Gagal menghapus kategori.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSave = async () => {
    if (!categoryName.trim()) {
      alert('Nama kategori tidak boleh kosong.');
      return;
    }

    try {
      setIsLoading(true);

      if (currentCategory) {
        await updateKategori(currentCategory.id, { name: categoryName });
      } else {
        await createKategori({ name: categoryName });
      }

      fetchKategori();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Gagal menyimpan kategori.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="mt-3">
      <Row className="mt-4">
        <Col>
          <h1 className='title-01'>Daftar Kategori</h1>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={4} className="mb-3">
          <Form.Control
            type="text"
            placeholder="Cari berdasarkan nama kategori"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col className="text-end">
          <Button variant="warning" onClick={handleAdd}>
            Tambah Kategori
          </Button>
        </Col>
      </Row>

      <Card className="p-0">
        <Table striped size="sm" hover className='mt-3'>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Kategori</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, index) => (
                <tr key={category.id}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEdit(category)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(category.id)}
                      disabled={isLoading}
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  Tidak ada kategori ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentCategory ? 'Edit Kategori' : 'Tambah Kategori'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nama Kategori</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama kategori"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Kategori;
