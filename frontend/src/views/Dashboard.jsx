import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Dropdown } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getProduk, getTransaksi } from "../service/Service"; // Pastikan API sudah sesuai
import logo from "../assets/logo-kasirqu-001.png";
import { FcKindle, FcPaid, FcSalesPerformance } from "react-icons/fc";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Dashboard = () => {
  const [produk, setProduk] = useState([]);
  const [transaksi, setTransaksi] = useState([]);
  const [tahunDipilih, setTahunDipilih] = useState(new Date().getFullYear());
  const [tahunTersedia, setTahunTersedia] = useState([]);
  const [penghasilanBulanan, setPenghasilanBulanan] = useState({});
  const [penghasilanTahunan, setPenghasilanTahunan] = useState(0);
  const [bulanDipilih, setBulanDipilih] = useState(new Date().getMonth());
  const bulanList = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];


useEffect(() => {
  const fetchData = async () => {
    try {
      const produkData = await getProduk();
      const transaksiData = await getTransaksi();

      if (Array.isArray(produkData.data)) setProduk(produkData.data);
      if (Array.isArray(transaksiData.data)) setTransaksi(transaksiData.data);

      const tahunList = [
        ...new Set(
          transaksiData.data.map((trx) =>
            new Date(trx.created_at).getFullYear()
          )
        ),
      ];
      setTahunTersedia(tahunList.sort());

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, []);

useEffect(() => {
  const penghasilanPerBulan = {};
  let penghasilanPerTahun = 0;

  transaksi
    .filter((trx) => new Date(trx.created_at).getFullYear() === tahunDipilih)
    .forEach((trx) => {
      const date = new Date(trx.created_at);
      const month = date.getMonth();
      const laba = (trx.jual - trx.beli) * trx.jumlah || 0;

      penghasilanPerTahun += laba;
      penghasilanPerBulan[month] = (penghasilanPerBulan[month] || 0) + laba;
    });

  setPenghasilanTahunan(penghasilanPerTahun);
  setPenghasilanBulanan(penghasilanPerBulan);
}, [transaksi, tahunDipilih]);

  const totalProduk = produk.length;
  const totalTransaksi = transaksi.length;
  const totalPenghasilan = transaksi.reduce(
    (acc, trx) => acc + ((trx.jual - trx.beli) * trx.jumlah || 0),
    0
  );

  const transaksiPerHari = transaksi
    .filter((trx) => new Date(trx.created_at).getFullYear() === tahunDipilih)
    .reduce((acc, trx) => {
      const date = new Date(trx.created_at);
      const tanggal = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

      acc[tanggal] = (acc[tanggal] || 0) + 1;
      return acc;
    }, {});

  const labels = Object.keys(transaksiPerHari).sort();

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: `Transaksi Harian (${tahunDipilih})`,
        data: labels.map((tanggal) => transaksiPerHari[tanggal] || 0),
        fill: false,
        borderColor: "#4caf50",
        tension: 0.1,
      },
    ],
  };

  return (
    <Container fluid>
      <Row className="mb-4 mt-3">
        <Col>
          <img
            alt=""
            src={logo}
            width="auto"
            height="80"
            className="d-inline-block align-top"
          />
        </Col>
      </Row>

      {/* Statistik */}
  <Row className="mb-2">
    <Col md={6} className="mb-4">
      <Row className="mb-4">
        <Col>
          <Card className="p-0 text-center">
              <Row>
                <Col
                  sm={4}
                  className="d-flex justify-content-center align-items-center"
                >
                  <FcKindle size={100} />
                </Col>
                <Col className="d-flex justify-content-center align-items-center">
                  <Card.Body className="p-0">
                    <Card.Title>Total Produk</Card.Title>
                    <h2 className="title-02">{totalProduk}</h2>
                  </Card.Body>
                </Col>
              </Row>
          </Card>
        </Col>
      </Row>
      <Row className="">
        <Col>
          <Card className="p-0 text-center">
            <Row>
              <Col
                  sm={4}
                  className="d-flex justify-content-center align-items-center"
                >
                  <FcPaid size={100} />
              </Col>
              <Col className="d-flex justify-content-center align-items-center">
                  <Card.Body className="p-0">
                    <Card.Title>Total Transaksi</Card.Title>
                    <h2 className="title-02">{totalTransaksi}</h2>
                  </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Col>
    <Col md={6} className="mb-4">
      <Card className="p-0 text-center">
          <h5 className="m-1">Stok Produk dibawah 10</h5>
        <div style={{ height: "195px", overflowY: "auto" }}>
          <Table hover>
            <thead>
            <tr>
              <th>Nama Produk</th>
              <th>Merk</th>
              <th>Stok</th>
            </tr>
            </thead>
            <tbody>
            {produk.filter((p) => p.stok <= 10).length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center text-gray-500">
                  Tidak ada produk dengan stok dibawah 10
                </td>
              </tr>
            ) : (
              produk
                .filter((p) => p.stok <= 10)
                .map((p, index) => (
                  <tr key={index}>
                    <td>{p.name}</td>
                    <td>{p.merk}</td>
                    <td>{p.stok}</td>
                  </tr>
                ))
            )}
            </tbody>
          </Table>
        </div>
      </Card>
    </Col>
  </Row>

  <Row className="mb-2">
    <Col md={6} className="mb-4">
      <Card className="p-0 text-center">
          <Row>
            <Col
              sm={4}
              className="d-flex justify-content-center align-items-center"
            >
              <FcSalesPerformance size={100} />
            </Col>
            <Col className="d-flex justify-content-center align-items-center">
              <Card.Body className="p-0">
                <Card.Title>Penghasilan Tahun</Card.Title>
<Dropdown onSelect={(e) => setTahunDipilih(Number(e))} className="mb-2">
  <Dropdown.Toggle variant="warning" size="sm">
    {tahunDipilih}
  </Dropdown.Toggle>
  <Dropdown.Menu>
    {tahunTersedia.map((tahun) => (
      <Dropdown.Item key={tahun} eventKey={tahun}>
        {tahun}
      </Dropdown.Item>
    ))}
  </Dropdown.Menu>
</Dropdown>
<h2 className="title-02">
  Rp {penghasilanTahunan.toLocaleString("id-ID")}
</h2>

              </Card.Body>
            </Col>
          </Row>
      </Card>
    </Col>
    <Col md={6} className="mb-4">
      <Card className="p-0 text-center">
          <Row>
            <Col
              sm={4}
              className="d-flex justify-content-center align-items-center"
            >
              <FcSalesPerformance size={100} />
            </Col>
            <Col className="d-flex justify-content-center align-items-center">
              <Card.Body className="p-0">
                <Card.Title>Penghasilan Bulan</Card.Title>
<Dropdown onSelect={(e) => setBulanDipilih(Number(e))} className="mb-2">
  <Dropdown.Toggle variant="warning" size="sm">
    {bulanList[bulanDipilih]}
  </Dropdown.Toggle>
  <Dropdown.Menu>
    {bulanList.map((bulan, index) => (
      <Dropdown.Item key={index} eventKey={index}>
        {bulan}
      </Dropdown.Item>
    ))}
  </Dropdown.Menu>
</Dropdown>
<h2 className="title-02">
  Rp {(penghasilanBulanan[bulanDipilih] || 0).toLocaleString("id-ID")}
</h2>

              </Card.Body>
            </Col>
          </Row>
      </Card>
    </Col>
  </Row>
<Row>
<Col>
      {/* Pilih Tahun */}
      <Row className="mb-3 d-flex justify-content-center">
        <Col md={4} className="text-center">
          <h5 className="text-warning">Pilih Tahun:</h5>
          <Dropdown onSelect={(e) => setTahunDipilih(Number(e))}>
            <Dropdown.Toggle variant="warning" id="dropdown-basic">
              {tahunDipilih}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {tahunTersedia.length > 0 ? (
                tahunTersedia.map((tahun) => (
                  <Dropdown.Item key={tahun} eventKey={tahun}>
                    {tahun}
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item disabled>Tidak ada tahun</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>


      {/* Grafik Statistik */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Title className="m-3">
              Statistik Transaksi ({tahunDipilih})
            </Card.Title>
            <Card.Body>
              <Line data={chartData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </Col>
</Row>

    </Container>
  );
};

export default Dashboard;
