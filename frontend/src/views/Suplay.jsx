import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form, Card } from 'react-bootstrap';
import { getProduk, getSuplay, createSuplay, updateSuplay, deleteSuplay } from '../service/Service';

const Suplay = () => {
  const [products, setProduk] = useState([]);
  const [suplies, setSuplies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newSuplay, setNewSuplay] = useState({});
  const [currentSuplay, setCurrentSuplay] = useState(null);

  useEffect(() => {
    fetchSuplay();
    fetchProduk();
  }, []);

  const fetchSuplay = async () => {
    try {
      const suplay = await getSuplay();
      setSuplies(suplay.data);
    } catch (error) {
      console.error('Error fetching suplies:', error);
      alert('Gagal memuat data suplay.');
    }
  };

  const fetchProduk = async () => {
    try {
      const produk = await getProduk();
      setProduk(produk.data);
    } catch (error) {
      console.error('Error fetching produk:', error);
      alert('Gagal memuat data produk.');
    }
  };

  const handleAdd = () => {
    setCurrentSuplay(null);
    setNewSuplay({});
    setShowModal(true);
  };

  const handleEdit = (suplay) => {
    setCurrentSuplay(suplay);
    setNewSuplay(suplay);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus suplai ini?')) {
      try {
        setIsLoading(true);
        await deleteSuplay(id);
        setSuplies((prev) => prev.filter((suplay) => suplay.id !== id));
      } catch (error) {
        console.error('Error deleting suplay:', error);
        alert('Gagal menghapus suplai.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSave = async () => {
    if (!newSuplay.produk_id || !newSuplay.jumlah) {
      alert('Semua field jumlah diisi.');
      return;
    }

    try {
      setIsLoading(true);

      if (currentSuplay) {
        await updateSuplay(currentSuplay.id, newSuplay);
        alert('Suplai berhasil diperbarui.');
      } else {
        await createSuplay(newSuplay);
        alert('Suplai berhasil ditambahkan.');
      }

      fetchSuplay();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving suplay:', error);
      alert('Gagal menyimpan suplai.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSuplies = suplies.filter((suplay) =>
    products.find((product) => product.id === suplay.produk_id)?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTanggal = (tanggalString) => {
  const tanggal = new Date(tanggalString);

  const optionsTanggal = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const optionsJam = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const tanggalFormatted = new Intl.DateTimeFormat('id-ID', optionsTanggal).format(tanggal);
  const jamFormatted = new Intl.DateTimeFormat('id-ID', optionsJam).format(tanggal);

  return `${tanggalFormatted}. ${jamFormatted}`;
};


  return (
    <Container fluid className="mt-3">
      <Row className="mb-2">
        <Col>
          <h1 className='title-01'>Data Suplay</h1>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4} className="mb-3">
          <Form.Control
            type="text"
            placeholder="Cari berdasarkan nama produk"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>

        <Col className="text-end">
          <Button variant="warning" onClick={handleAdd}>Tambah Suplay</Button>
        </Col>
      </Row>
      <Card className="p-0">
  <div style={{ overflowX: 'auto' }}>
        <Table striped size="sm" hover className='mt-3'>
          <thead>
            <tr>
              <th>No</th>
              <th>Produk</th>
              <th>Stok</th>
              <th>Harga Beli</th>
              <th>Harga Jual</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuplies.map((suplay, index) => (
              <tr key={suplay.id}>
                <td>{index + 1}</td>
                <td>{products.find((p) => p.id === suplay.produk_id)?.name || 'Produk Baru'}</td>
                <td>{suplay.jumlah}</td>
                <td>Rp {products.find((p) => p.id === suplay.produk_id)?.beli || 'Produk Baru'}</td>
                <td>Rp {products.find((p) => p.id === suplay.produk_id)?.jual || 'Produk Baru'}</td>
                <td>{formatTanggal(suplay.created_at)}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEdit(suplay)} className="me-2">Edit</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(suplay.id)}>Hapus</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentSuplay ? 'Edit Suplay' : 'Tambah Suplay'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Produk</Form.Label>
              <Form.Select
                value={newSuplay.produk_id || ''}
                onChange={(e) => setNewSuplay({ ...newSuplay, produk_id: e.target.value })}
              >
                <option value="">Pilih Produk</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>{product.name}  -beli:{product.beli}  -jual:{product.jual}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stok</Form.Label>
              <Form.Control
                type="number"
                value={newSuplay.jumlah || ''}
                onChange={(e) => setNewSuplay({ ...newSuplay, jumlah: e.target.value })}
              />
            </Form.Group>
            <p>Isi Jika Harga Berubah.</p>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Harga Beli</Form.Label>
                  <Form.Control
                    type="number"
                    value={newSuplay.beli || ''}
                    onChange={(e) => setNewSuplay({ ...newSuplay, beli: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Harga Jual</Form.Label>
                  <Form.Control
                    type="number"
                    value={newSuplay.jual || ''}
                    onChange={(e) => setNewSuplay({ ...newSuplay, jual: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Batal</Button>
          <Button variant="primary" onClick={handleSave}>Simpan</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Suplay;
