import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ProdukAdd = ({ product, onSave, onCancel, kategoris }) => {
const [form, setForm] = useState({
  barcode: '',
  name: '',
  merk: '',
  kategori_id: '',
  beli: '',
  jual: '',
  stok: '',
  image: null,
});

useEffect(() => {
  if (product) {
    setForm({
      barcode: product.barcode || '',
      name: product.name || '',
      merk: product.merk || '',
      kategori_id: product.kategori_id || '',
      beli: product.beli || 0,
      jual: product.jual || 0,
      stok: product.stok || 0,
    });
  }
}, [product]);


  const MAX_IMAGE_SIZE = 1 * 1024 * 1024;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files[0]) {
      if (files[0].size > MAX_IMAGE_SIZE) {
  alert('Ukuran file tidak boleh lebih dari 1 MB.');
  return;
}
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.kategori_id) {
      alert('Kategori tidak boleh kosong!');
      return;
    }
    const formData = new FormData();
formData.append('name', form.name);
  formData.append('merk', form.merk);
  formData.append('kategori_id', form.kategori_id);
  formData.append('beli', form.beli);
  formData.append('jual', form.jual);
  formData.append('stok', form.stok);
  formData.append('barcode', form.barcode);
  if (form.image instanceof File) {
    formData.append('image', form.image);
  }
    console.log(form);
    console.log(formData);
   onSave(form);
    if (!product) {
  setForm({
    barcode: '',
    name: '',
    merk: '',
    kategori_id: '',
    beli: '',
    jual: '',
    stok: '',
    image: null,
  });
}
  };

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
      <Col>
            <Form.Group className="mb-3">
              <Form.Label>Barcode</Form.Label>
              <Form.Control
                type="text"
                name="barcode"
                value={form.barcode}
                onChange={handleChange}
                
              />
            </Form.Group>
          </Col>
          <Col>
          <Form.Group className="mb-3">
  <Form.Label>Gambar</Form.Label>
  <Form.Control
    type="file"
    name="image"
    accept="image/*"
    onChange={handleChange}
  />
  <Form.Text className="text-muted">
    Ukuran maksimal: 1 MB.
  </Form.Text>
</Form.Group>

{form.image && typeof form.image !== 'string' && (
  <img
    src={URL.createObjectURL(form.image)}
    alt="Preview"
    style={{ width: 100, height: 'auto', marginTop: 10 }}
  />
)}

</Col>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Merk</Form.Label>
              <Form.Control
                type="text"
                name="merk"
                value={form.merk}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Kategori</Form.Label>
              <Form.Select
                name="kategori_id"
                value={form.kategori_id}
                onChange={handleChange}
                required
              >
                <option value="">-</option>
                {kategoris.length > 0 ? (kategoris.map((kategori) => (
                  <option key={kategori.id} value={kategori.id}>
                    {kategori.name}
                  </option>
                ))):(
<option value="" disabled>Kategori Kosong</option>
                )}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Harga Beli</Form.Label>
              <Form.Control
                type="number"
                name="beli"
                value={form.beli}
                onChange={handleChange}
                required
  min="0"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Harga Jual</Form.Label>
              <Form.Control
                type="number"
                name="jual"
                value={form.jual}
                onChange={handleChange}
                required
  min="0"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Stok</Form.Label>
              <Form.Control
                type="number"
                name="stok"
                value={form.stok}
                onChange={handleChange}
                required
  min="0"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary" type="submit" className="me-2">
              Simpan
            </Button>
            <Button variant="secondary" onClick={onCancel}>
              Batal
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ProdukAdd;
