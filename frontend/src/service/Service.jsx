import api from "./Api";

// Authentication
export const login = async (credentials) => {
  try {
    const response = await api.post("/login", credentials);
    const { token, user } = response.data;

    if (token) {
      // Simpan token dan name ke localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", response.data.user.role);

      // Atur default Authorization header
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return response.data;
  } catch (error) {
    console.error("Login failed:", {
      message: error.response?.data?.message || error.message,
      details: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post("/logout");

    // Hapus token dan name dari localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Hapus Authorization header
    delete api.defaults.headers.common["Authorization"];
  } catch (error) {
    console.error("Logout failed:", {
      message: error.response?.data?.message || error.message,
      details: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

export const verifyPassword = async (credentials) => {
  try {
    const response = await api.post("/verify-password", credentials);
    return response;
  } catch (error) {
    console.error("Password verification failed:", {
      message: error.response?.data?.message || error.message,
      details: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

// Categories
export const getKategori = async () => {
  try {
    const response = await api.get("/kategori");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories:", {
      message: error.response?.data?.message || error.message,
      details: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

export const createKategori = async (data) => {
  try {
    const response = await api.post("/kategori", data);
    return response.data;
  } catch (error) {
    console.error("Failed to create category:", {
      message: error.response?.data?.message || error.message,
      details: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

export const updateKategori = async (id, data) => {
  try {
    const response = await api.put(`/kategori/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to update category:", {
      message: error.response?.data?.message || error.message,
      details: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

export const deleteKategori = async (id) => {
  try {
    const response = await api.delete(`/kategori/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete category:", {
      message: error.response?.data?.message || error.message,
      details: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

// Products
export const getProduk = async () => {
  try {
    const response = await api.get("/produk");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", {
      message: error.response?.data?.message || error.message,
      details: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

export const createProduk = async (data) => {
  try {
    const response = await api.post("/produk", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create product:", {
      message: error.response?.data?.message || error.message,
      details: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

export const updateProduk = async (id, data) => {
  try {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    formData.append("_method", "PUT");
    const response = await api.post(`/produk/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update product:", {
      message: error.response?.data?.message || error.message,
      details: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

export const deleteProduk = async (id) => {
  try {
    const response = await api.delete(`/produk/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete product:", {
      message: error.response?.data?.message || error.message,
      details: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

export const getSuplay = async () => {
  try {
    const response = await api.get("/suplay");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch suplies:", {
      message: error.response?.data?.message || error.message,
      details: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

export const createSuplay = async (data) => {
  try {
    const response = await api.post("/suplay", data);
    return response.data;
  } catch (error) {
    console.error("Failed to create suplies:", {
      message: error.response?.data?.message || error.message,
      details: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

export const updateSuplay = async (id, data) => {
  try {
    const response = await api.put(`/suplay/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to update suplies:", {
      message: error.response?.data?.message || error.message,
      details: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

export const deleteSuplay = async (id) => {
  try {
    const response = await api.delete(`/suplay/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete suplies:", {
      message: error.response?.data?.message || error.message,
      details: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

export const simpanTransaksi = async (dataTransaksi, produkUpdate) => {
  try {
    const response = await api.post(`/transaksi`, {
      dataTransaksi,
      produkUpdate,
    });
    return response.data;
  } catch (error) {
    console.error("Error menyimpan transaksi:", error);
    throw error;
  }
};

export const deleteTransaksi = async (id) => {
  try {
    const response = await api.delete(`/transaksi/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete product:", {
      message: error.response?.data?.message || error.message,
      details: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

export const updateTransaksi = async (id, data) => {
  try {
    const response = await api.put(`/transaksi/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to update product:", {
      message: error.response?.data?.message || error.message,
      details: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

export const getTransaksi = async () => {
  try {
    const response = await api.get("/transaksi");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch suplies:", {
      message: error.response?.data?.message || error.message,
      details: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

export const getUser = async (id) => {
  try {
    const response = await api.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get user:", {
      message: error.response?.data?.message || error.message,
      details: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};
export const getUsers = async () => {
  try {
    const response = await api.get(`/user`);
    return response.data;
  } catch (error) {
    console.error("Failed to get user:", {
      message: error.response?.data?.message || error.message,
      details: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

export const updateUser = async (id, data) => {
  try {
    const response = await api.put(`/user/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to update suplies:", {
      message: error.response?.data?.message || error.message,
      details: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

// CREATE user
export const createUser = async (data) => {
  try {
    const response = await api.post(`/user`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to create user:", {
      message: error.response?.data?.message || error.message,
      details: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

// DELETE user
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete user:", {
      message: error.response?.data?.message || error.message,
      details: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

//Get Toko
export const getToko = async () => {
  try {
    const response = await api.get(`/toko`);
    return response.data;
  } catch (error) {
    console.error("Failed to get toko:", {
      message: error.response?.data?.message || error.message,
      details: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

//UpdateToko
export const updateToko = async (id, data) => {
  try {
    const response = await api.put(`/toko/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to update toko:", {
      message: error.response?.data?.message || error.message,
      details: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

//Change Password
export const changePassword = async (data) => {
  try {
    const response = await api.post("/changepassword", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to changepassword:", {
      message: error.response?.data?.message || error.message,
      details: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};
