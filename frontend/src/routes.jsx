import Login from "./auth/Login";
import Dashboard from "./views/dashboard";
import Kasir from "./views/Kasir";
import Kategori from "./views/Kategori";
import Produk from "./views/Produk";
import Suplay from "./views/Suplay";
import Toko from "./views/Toko";
import Transaksi from "./views/Transaksi";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: <Dashboard />,
    layout: "kasir",
  },
  {
    path: "/kasir",
    name: "Kasir",
    component: <Kasir />,
    layout: "kasir",
  }, 
  {
    path: "/kategori",
    name: "Kategori",
    component: <Kategori />,
    layout: "kasir",
  },
  {
    path: "/produk",
    name: "Produk",
    component: <Produk />,
    layout: "kasir",
  },
  {
    path: "/suplay",
    name: "Suplay",
    component: <Suplay />,
    layout: "kasir",
  },
  {
    path: "/transaksi",
    name: "Transaksi",
    component: <Transaksi />,
    layout: "kasir",
  },
  {
    path: "/toko",
    name: "Profil Toko",
    component: <Toko />,
    layout: "kasir",
  },
  {
    path: "/login",
    name: "Login",
    component: <Login />,
    layout: "/auth",
  },
];
export default routes;
