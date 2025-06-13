import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Row, Col, Card } from 'react-bootstrap';
import { getTransaksi, verifyPassword, deleteTransaksi, updateTransaksi  } from '../service/Service';
import ExcelJS from 'exceljs';


const Transaksi = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTransaksi, setCurrentTransaksi] = useState(null);
  const [filteredTransaksi, setFilteredTransaksi] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchTransaksi();
    handleSearch(searchTerm); // Update daftar hasil pencarian setiap kali `searchTerm` berubah
    handleDateFilter();
  }, [searchTerm, startDate, endDate, transaksi]);

  const fetchTransaksi = async () => {
    try {
      const transaksi = await getTransaksi();
      setTransaksi(transaksi.data);
      setFilteredTransaksi(transaksi.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      alert('Gagal memuat data transaksi.');
    }
  };

  const handleSearch = (term) => {
    const lowerCaseTerm = term.toLowerCase();
    const filtered = transaksi.filter((transaksi) =>
      transaksi.produk.name.toLowerCase().includes(lowerCaseTerm)
    );
    setFilteredTransaksi(filtered);
  };

  const handleDateFilter = () => {
    const filtered = transaksi.filter((transaksi) => {
      const transaksiDate = new Date(transaksi.created_at);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      return (
        (!start || transaksiDate >= start) && (!end || transaksiDate <= end)
      );
    });
    setFilteredTransaksi(filtered);
  };

  const handleEdit = (id) => {
    const transaksiToEdit = transaksi.find((t) => t.id === id);
    setCurrentTransaksi(transaksiToEdit);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        await deleteTransaksi(id);
  
        const updated = transaksi.filter((t) => t.id !== id);
        setTransaksi(updated);
        setFilteredTransaksi(updated);
      } catch (error) {
        console.error("Gagal hapus transaksi:", error);
        alert("Gagal menghapus transaksi.");
      }
    }
  };
  

  const handleSave = async () => {
    try {
      if (currentTransaksi) {
        const { id, tanggal, jumlah } = currentTransaksi;
  
        await updateTransaksi(id, { tanggal, jumlah });
  
        // Perbarui data lokal
        const updated = transaksi.map((t) =>
          t.id === id ? { ...t, created_at: tanggal, jumlah } : t
        );
        setTransaksi(updated);
        setFilteredTransaksi(updated);
      }
      setShowModal(false);
    } catch (error) {
      console.error("Gagal update transaksi:", error);
      alert("Gagal menyimpan perubahan transaksi.");
    }
  };

  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Laporan Transaksi');

    // Add header rows
    worksheet.mergeCells('A1:E1');
    worksheet.getCell('A1').value = 'Laporan Transaksi';
    worksheet.getCell('A1').font = { bold: true, size: 16 };
    worksheet.getCell('A1').alignment = { horizontal: 'center' };

    worksheet.mergeCells('A2:E2');
    worksheet.getCell('A2').value =
      startDate && endDate
        ? `${startDate} - ${endDate}`
        : 'Seluruh Transaksi';
    worksheet.getCell('A2').font = { bold: true, size: 12 };
    worksheet.getCell('A2').alignment = { horizontal: 'center' };

    // Add table headers
    const headers = ['No', 'Tanggal', 'Nama Produk', 'Jumlah', 'Keuntungan'];
    worksheet.addRow(headers);
    headers.forEach((header, index) => {
      const cell = worksheet.getCell(3, index + 1);
      cell.font = { bold: true };
    });

    // Add transaction data
    let totalLaba = 0;
    filteredTransaksi.forEach((t, index) => {
      const laba = (t.jual - t.beli) * t.jumlah;
      totalLaba += laba;
      worksheet.addRow([
        index + 1,
        t.created_at,
        t.produk?.name || '-',
        t.jumlah,
        laba,
      ]);
    });

    // Add total row
    const totalRow = worksheet.addRow(['Total', '', '', '', totalLaba]);
    totalRow.eachCell((cell) => {
      cell.font = { bold: true };
    });

    worksheet.columns = [
      { width: 5 },
      { width: 20 },
      { width: 20 },
      { width: 15 },
      { width: 15 },
    ];

    // Apply border to all data cells
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 2) {
        row.eachCell((cell) => {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
        });
      }
    });

    // Save the file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Laporan_Transaksi_${new Date().toLocaleDateString()}.xlsx`;
    link.click();
  };

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

const handleVerifyPassword = async () => {
  try {
    if(password== ""){
      alert('Masukkan Password');
    }else {
    const response = await verifyPassword({password}); // Panggil API
    if (response.status === 200) {
      setIsVerified(true);
    } else {
      alert('Password salah.');
    }
  }
  } catch (error) {
    console.error('Verifikasi gagal:', error);
    alert('Password salah atau terjadi kesalahan.');
  }
};

if (!isVerified) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center mt-5">
      <h3 className='title-01 mt-3'>Masukkan Password</h3>
      <p className='title-01'>untuk melihat Data Transaksi</p>
<Form.Control
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Password"
  style={{ width: '300px', marginBottom: '10px' }}
  required
  className="mt-3"
/>
      <Button onClick={handleVerifyPassword} className="is-warning mt-3">Verifikasi</Button>
    </div>
  );
}


  return (
    <div>
      <h1 className='title-01 mt-3'>Data Transaksi</h1>
      <div className="mb-3">
        <Row>
          <Col>
            <Form.Group>
              <Form.Label className='title-02'>Cari Nama Produk</Form.Label>
              <Form.Control
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Masukkan nama produk"
              />
            </Form.Group>
          </Col>
          <Col>

            <Form.Group>
              <Form.Label className='title-02' >Filter Tanggal</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="me-2"
                />
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </Form.Group>
          </Col>
          <Col xs={2}>
            <Button variant="warning" className="mt-4" size="sm" onClick={handleExport}>
              Export ke Excel
            </Button>
          </Col>
        </Row>
      </div>

      <Card className="p-0">
        <Table striped size="sm" hover className='mt-3'>
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal</th>
              <th>Nama Barang</th>
              <th>Jumlah Barang</th>
              <th>Harga Beli</th>
              <th>Harga Jual</th>
              <th>Total Laba</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransaksi.map((t, i) => {
              return (
                <tr key={t.id}>
                  <td>{i+1}</td>
                  <td>{formatTanggal(t.created_at)}</td>
                  <td>{t.produk?.name || '-'}</td>
                  <td>{t.jumlah}</td>
                  <td>{t.beli}</td>
                  <td>{t.jual}</td>
                  <td>{(t.jual - t.beli) * t.jumlah}</td>
                  <td>
                    <Button variant="warning" size="sm" onClick={() => handleEdit(t.id)}>
                      Edit
                    </Button>{' '}
                    <Button variant="danger" size="sm" onClick={() => handleDelete(t.id)}>
                      Hapus
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>


      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Transaksi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tanggal</Form.Label>
              <Form.Control
  type="date"
  value={currentTransaksi?.created_at?.split('T')[0] || ''}
  onChange={(e) =>
    setCurrentTransaksi({ ...currentTransaksi, created_at: e.target.value })
  }
/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Jumlah</Form.Label>
              <Form.Control
                type="number"
                value={currentTransaksi?.jumlah || ''}
                onChange={(e) =>
                  setCurrentTransaksi({ ...currentTransaksi, jumlah: parseInt(e.target.value) })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Transaksi;
