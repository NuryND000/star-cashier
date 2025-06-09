import React, { useState, useEffect } from "react";
import { Table, Button, Form, Row, Col, Card, ListGroup } from "react-bootstrap";
import { getProduk, simpanTransaksi, getUser } from "../service/Service";

const Kasir = () => {
  const [produk, setProduks] = useState([]);
  const [keranjang, setKeranjang] = useState([]);
  const [barcode, setBarcode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [jumlahBayar, setJumlahBayar] = useState("");
  const [user, setUser] = useState(null);
  const [kembalian, setKembalian] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      fetchUser(parsedUser.id);
      fetchProduk();
    }
  }, []);

  const fetchProduk = async () => {
    try {
      const response = await getProduk();
      setProduks(response.data);
    } catch (error) {
      console.error("Error fetching produk:", error);
      alert("Gagal memuat data produk.");
    }
  };

  const fetchUser = async (id) => {
    try {
      const toko = await getUser(id);
      setUser(toko);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Gagal memuat data toko.");
    }
  };

  const handleBarcodeChange = (e) => {
    const inputBarcode = e.target.value;
    setBarcode(inputBarcode);

    const foundProduk = produk.find((p) => p.barcode === inputBarcode);
    if (foundProduk) {
      tambahKeKeranjang(foundProduk);
      setBarcode("");
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const filteredProduk = produk.filter(
        (p) =>
          (p.barcode && p.barcode.toLowerCase().includes(query.toLowerCase())) ||
          (p.name && p.name.toLowerCase().includes(query.toLowerCase()))
      );

      if (filteredProduk.length === 1 && filteredProduk[0].barcode === query) {
        tambahKeKeranjang(filteredProduk[0]);
        setSearchQuery("");
        setSuggestions([]);
      } else {
        setSuggestions(filteredProduk.slice(0, 5));
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectProduk = (produkTerpilih) => {
    tambahKeKeranjang(produkTerpilih);
    setSearchQuery("");
    setSuggestions([]);
  };

  const tambahKeKeranjang = (produkTerpilih) => {
    const existingItem = keranjang.find((item) => item.id === produkTerpilih.id);

    if (produkTerpilih.stok > 0) {
      if (existingItem) {
        setKeranjang(
          keranjang.map((item) =>
            item.id === produkTerpilih.id
              ? { ...item, jumlah: item.jumlah + 1 }
              : item
          )
        );
      } else {
        setKeranjang([
          ...keranjang,
          {
            id: produkTerpilih.id,
            name: produkTerpilih.name,
            harga: produkTerpilih.jual,
            jumlah: 1,
          },
        ]);
      }
    } else {
      alert("Stok tidak mencukupi!");
    }
  };

  const handleJumlahChange = (id, newJumlah) => {
    if (newJumlah < 1) return;
    const produkTerpilih = produk.find((p) => p.id === id);
    if (newJumlah <= produkTerpilih.stok) {
      setKeranjang(
        keranjang.map((item) =>
          item.id === id ? { ...item, jumlah: newJumlah } : item
        )
      );
    } else {
      alert("Jumlah melebihi stok yang tersedia!");
    }
  };

  const handleHapusItem = (id) => {
    setKeranjang(keranjang.filter((item) => item.id !== id));
  };

  const handleBayarChange = (e) => {
    const bayar = Number(e.target.value);
    setJumlahBayar(bayar);
    const totalHarga = keranjang.reduce(
      (total, item) => total + item.harga * item.jumlah,
      0
    );
    setKembalian(bayar >= totalHarga ? bayar - totalHarga : 0);
  };

  const handleSelesaikanTransaksi = async () => {
    const totalHarga = keranjang.reduce(
      (total, item) => total + item.harga * item.jumlah,
      0
    );

    if (jumlahBayar >= totalHarga) {
      const dataTransaksi = keranjang.map((item) => ({
        produk_id: item.id,
        jumlah: item.jumlah,
        beli: produk.find((p) => p.id === item.id).beli,
        jual: item.harga,
        tanggal: new Date().toISOString(),
      }));

      const produkUpdate = keranjang.map((item) => ({
        produk_id: item.id,
        jumlah: produk.find((p) => p.id === item.id).stok - item.jumlah,
      }));

      try {
        await simpanTransaksi(dataTransaksi, produkUpdate);
        handleCetakStruk();
        setKeranjang([]);
        setJumlahBayar("");
        setKembalian(0);
        fetchProduk();
      } catch (error) {
        alert("Gagal menyimpan transaksi.");
      }
    } else {
      alert("Jumlah bayar tidak mencukupi!");
    }
  };

  const totalHarga = keranjang.reduce(
    (total, item) => total + item.harga * item.jumlah,
    0
  );

  const handleCetakStruk = () => {
    const waktuTransaksi = new Date().toLocaleString();
    const struk =
      `===== STRUK PEMBELIAN =====
Toko:  ${user?.nama_toko}
Alamat: ${user?.alamat}
Waktu: ${waktuTransaksi}
No Telp: ${user?.no_telp}
---------------------------
Barang:
${keranjang.map((item) =>`  ${item.name} x${item.jumlah} - Rp ${(item.harga * item.jumlah).toLocaleString()}`).join("\n")}
---------------------------
Total Harga: Rp ${totalHarga.toLocaleString()}
Bayar: Rp ${jumlahBayar.toLocaleString()}
Kembalian: Rp ${kembalian.toLocaleString()}
===========================
Terima Kasih!`;

    const newWindow = window.open("", "_blank");
    newWindow.document.write(
      `<html>
        <head>
          <title>Struk Pembelian</title>
          <style>
            @media print {
              @page {
                size: 80mm auto;
                margin: 10mm;
              }
              body {
                font-family: monospace;
                font-size: 12px;
                line-height: 1.5;
                text-align: left;
              }
              pre {
                margin: 0;
              }
            }
          </style>
        </head>
        <body>
          <pre>${struk}</pre>
        </body>
      </html>`
    );
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
  };

  return (
    <div className="container mt-4">
      <Row>
        <Col md={6}>
          <Card className="mb-4 p-0">
            <Card.Header as="h5">Pencarian Barang</Card.Header>
            <Card.Body>
              <Form.Group>
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Masukkan nama atau barcode produk"
                      autoFocus
                    />
                    {suggestions.length > 0 && (
                      <ListGroup>
                        {suggestions.map((item) => (
                          <ListGroup.Item
                            key={item.id}
                            action
                            onClick={() => handleSelectProduk(item)}
                          >
                            <Row>
                              <Col>
                                <img
                                  src={`http://localhost:8000/storage/${item.image}`}
                                  alt={item.name}
                                  style={{
                                    width: '50px',
                                    height: '50px',
                                    objectFit: 'cover',
                                  }}
                                />
                              </Col>
                              <Col>
                                {item.barcode} - {item.name} (Stok: {item.stok})
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                  </Col>
                </Row>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4 p-0">
            <Card.Header as="h5">Total Belanja</Card.Header>
            <Card.Body className="text-start">
              <h4>Total: Rp {totalHarga.toLocaleString()}</h4>
              <Form.Group>
                <Form.Label>Jumlah Bayar</Form.Label>
                <Form.Control
                  type="number"
                  value={jumlahBayar}
                  onChange={handleBayarChange}
                  placeholder="Masukkan jumlah bayar"
                />
              </Form.Group>
              <h4>Kembalian: Rp {kembalian.toLocaleString()}</h4>
              <Button variant="warning" onClick={handleSelesaikanTransaksi}>
                Selesaikan Transaksi
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Card className="p-0">
        <Card.Header as="h5" className="text-start">
          Keranjang
        </Card.Header>
        <Card.Body>
          <Table striped size="sm" hover>
            <thead>
              <tr>
                <th>Nama Produk</th>
                <th>Harga</th>
                <th>Jumlah</th>
                <th>Total Harga</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {keranjang.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>Rp {item.harga.toLocaleString()}</td>
                  <td>
                    <Form.Control
                      type="number"
                      value={item.jumlah}
                      onChange={(e) =>
                        handleJumlahChange(item.id, parseInt(e.target.value))
                      }
                      min="1"
                    />
                  </td>
                  <td>Rp {(item.harga * item.jumlah).toLocaleString()}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleHapusItem(item.id)}
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Kasir;
