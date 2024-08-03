import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Edit } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Product.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = Cookies.get("token");
        const role = Cookies.get("role"); // Get the role from cookies
        setUserRole(role);

        const response = await axios.get(
          "https://leveledgetask-backend.vercel.app/api/v1/products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data); // Log the entire response for debugging
        if (response.data.success && Array.isArray(response.data.product)) {
          setProducts(response.data.product);
        } else {
          throw new Error("Unexpected data format");
        }
      } catch (error) {
        toast.error("Failed to fetch products: " + error.message);
        if (error.response?.status === 401) {
          Cookies.remove("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);

  const handleEditClick = (id) => {
    // Navigate to edit page or show edit modal
    navigate(`/manager/product/${id}`);
  };

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "price", headerName: "Price", width: 130 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "stock", headerName: "Stock", width: 130 },
  ];

  if (userRole === "manager") {
    columns.push({
      field: "edit",
      headerName: "Edit",
      width: 150,
      renderCell: (params) => (
        <button onClick={() => handleEditClick(params.row.id)}>
          <Edit />
        </button>
      ),
    });
  }

  const rows = products.map((product) => ({
    id: product._id, // Data Grid requires an `id` field
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    stock: product.stock,
  }));

  return (
    <div className="product-page">
      <ToastContainer />
      <h1>Product List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="data-grid-container">
          <DataGrid rows={rows} columns={columns} pageSize={10} />
        </div>
      )}
    </div>
  );
};

export default Product;
