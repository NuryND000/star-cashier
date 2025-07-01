import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Alert, Form, Modal, Tabs, Tab, Card } from 'react-bootstrap';
import { deleteProduk, getProduk, createProduk, updateProduk, getKategori } from '../service/Service';
import ProdukAdd from './ProdukAdd';

const Produk = () => {
  const [lowStockAlert, setLowStockAlert] = useState([]);
  const [produks, setProduks] = useState([]);
  const [filteredProduks, setFilteredProduks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduk, setSelectedProduk] = useState(null);
  const [kategoris, setKategoris] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchProduk();
    fetchKategori();
  }, []);

  useEffect(() => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    let filtered = produks.filter((product) =>
      (product.name && product.name.toLowerCase().includes(lowerCaseTerm)) ||
      (product.barcode && product.barcode.toLowerCase().includes(lowerCaseTerm))
    );
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        const valueA = a[sortBy] || '';
        const valueB = b[sortBy] || '';
        if (typeof valueA === 'string') {
          return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        } else {
          return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
        }
      });
    }
    setFilteredProduks(filtered);
    setLowStockAlert(produks.filter((product) => product.stok <= 10));
  }, [searchTerm, produks, sortBy, sortOrder]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const fetchProduk = async () => {
    try {
      setIsLoading(true);
      const response = await getProduk();
console.log(response.data);
      setProduks(response.data);
      setFilteredProduks(response.data);
    } catch (error) {
      console.error('Error fetching produks:', error);
      alert('Gagal memuat data produk.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchKategori = async () => {
    try {
      const kategori = await getKategori();
      setKategoris(kategori.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      alert('Gagal memuat data kategori.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      try {
        setIsLoading(true);
        await deleteProduk(id);
        setProduks((prev) => prev.filter((produk) => produk.id !== id));
      } catch (error) {
        console.error('Error deleting produk:', error);
        alert('Gagal menghapus produk.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSave = async (formData) => {
    try {
      setIsLoading(true);
      if (selectedProduk) {
        await updateProduk(selectedProduk.id, formData);
        alert('Produk berhasil diperbarui.');
      } else {
        await createProduk(formData);
        alert('Produk berhasil ditambahkan.');
      }
      fetchProduk();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving produk:', error);
      alert('Gagal menyimpan produk.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedProduk(null);
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setSelectedProduk(product);
    setShowModal(true);
  };

  function formatTanggal(datetime) {
    const originalDate = new Date(datetime);
    const day = originalDate.getDate();
    const month = originalDate.getMonth();
    const year = originalDate.getFullYear();
    const hours = originalDate.getHours();
    const minutes = originalDate.getMinutes().toString().padStart(2, "0");

    const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    const dayName = hari[originalDate.getDay()];

    return `${dayName}, ${day} ${bulan[month]} ${year}, ${hours}:${minutes}`;
  }

  return (
    <Container fluid className="mt-3">
      <Row className="mt-4">
        <Col>
          <h1 className='title-01 mb-3'>Daftar Produk</h1>
        </Col>
      </Row>
      {lowStockAlert.length > 0 && (
        <Alert variant="warning">
          <strong>Perhatian:</strong> Produk berikut memiliki stok rendah:
          <ul>
            {lowStockAlert.map((product) => (
              <li key={product.id}>{product.name} ({product.stok})</li>
            ))}
          </ul>
        </Alert>
      )}
      <Row className="mb-3">
        <Col md={4} className="mb-3">
          <Form.Control
            type="text"
            placeholder="Cari berdasarkan nama produk"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Col>
        <Col>
          <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Urutkan Berdasar</option>
            <option value="created_at">Tanggal</option>
            <option value="barcode">Barcode</option>
            <option value="name">Nama Produk</option>
            <option value="merk">Merk</option>
            <option value="kategori">Kategori</option>
            <option value="beli">Harga Beli</option>
            <option value="jual">Harga Jual</option>
            <option value="stok">Stok</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">A-Z / Termurah</option>
            <option value="desc">Z-A / Termahal</option>
          </Form.Select>
        </Col>
        <Col className="text-end">
          <Button variant="warning" onClick={handleAdd}>Tambah Produk</Button>
        </Col>
      </Row>
      <Tabs defaultActiveKey="Tabel" id="uncontrolled-tab-example" className="mb-3 tabs-transparent">
        <Tab eventKey="Tabel" title="Tabel">
          <Card className="p-0">
            <div style={{ overflowX: 'auto' }}>
              <Table striped size="sm" hover className='mt-3'>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Tanggal</th>
                    <th>Gambar</th>
                    <th>Barcode</th>
                    <th>Nama</th>
                    <th>Merk</th>
                    <th>Kategori</th>
                    <th>Harga Beli</th>
                    <th>Harga Jual</th>
                    <th>Stok</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProduks.length > 0 ? (
                    filteredProduks.map((product, index) => (
                      <tr key={product.id}>
                        <td>{index + 1}</td>
                        <td>{formatTanggal(product.created_at)}</td>
                        <td>
                          <img
                            src={`https://star-cashier.myuniv.cloud/storage/${product.image}`}
                            alt={product.name}
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          />
                        </td>
                        <td>{product.barcode}</td>
                        <td>{product.name}</td>
                        <td>{product.merk}</td>
                        <td>{product.kategori?.name || '-'}</td>
                        <td>Rp {product.beli}</td>
                        <td>Rp {product.jual}</td>
                        <td>{product.stok}</td>
                        <td>
                          <Button variant="warning" size="sm" onClick={() => handleEdit(product)} className="me-2">Edit</Button>
                          <Button variant="danger" size="sm" onClick={() => handleDelete(product.id)} disabled={isLoading}>Hapus</Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="11" className="text-center">Data produk tidak tersedia.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card>
        </Tab>
        <Tab eventKey="Card" title="Card" className="title-02">
  <Row xs={1} md={4} className="g-4">
    {filteredProduks.length > 0 ? (
      filteredProduks.map((product) => (
        <Col key={product.id}>
          <Card className="h-100 shadow-sm" style={{ width: '100%' }}>
            <Card.Img
              variant="top"
              src={`https://star-cashier.myuniv.cloud/storage/${product.image}`}
              alt={product.name}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderTopLeftRadius: '0.5rem',
                borderTopRightRadius: '0.5rem',
              }}
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title className="mb-2" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                {product.name} <br />
                <span style={{ fontWeight: 'normal' }}>{product.merk} ~ {product.kategori?.name}</span>
              </Card.Title>
              <Card.Text className="mb-2">
                <small>Harga Beli: Rp{product.beli}</small><br />
                <small>Harga Jual: Rp{product.jual}</small>
              </Card.Text>
              <div className="mt-auto d-flex justify-content-between">
                <Button variant="warning" size="sm" onClick={() => handleEdit(product.id)}>
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(product.id)}>
                  Hapus
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))
    ) : (
      <p className="text-center">Data produk tidak tersedia.</p>
    )}
  </Row>
</Tab>

      </Tabs>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduk ? 'Edit Produk' : 'Tambah Produk'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProdukAdd
            key={selectedProduk?.id || 'new'}
            product={selectedProduk}
            onSave={handleSave}
            onCancel={() => setShowModal(false)}
            kategoris={kategoris}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Produk;
