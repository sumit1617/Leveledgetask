import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditProduct.css";
import { BACKEND_URL } from "../../config/config";

const EditProduct = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(`${BACKEND_URL}/product/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setProductData(response.data.product);
      } catch (error) {
        if (error.response?.status === 404) {
          toast.error("Product not found");
          navigate("/product");
        } else {
          toast.error("Failed to fetch product details: " + error.message);
          if (error.response?.status === 401) {
            Cookies.remove("token");
            navigate("/login");
          }
        }
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      console.log("Token sent for update:", token); // Add logging for debugging

      // Make the API request to update the product
      const response = await axios.put(
        `${BACKEND_URL}/manager/product/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // Ensure cookies are sent
        }
      );

      console.log("API response:", response.data); // Log the API response

      // Call toast.success if the request was successful
      if (response.data.success) {
        toast.success("Product updated successfully!"); // Success toast
        setTimeout(() => {
          navigate("/product");
        }, 2000); // Delay the navigation by 2 seconds (2000 milliseconds)
      } else {
        console.error("Unexpected API response:", response.data);
        toast.error("Failed to update product: Unexpected response");
      }
    } catch (error) {
      console.error("API error:", error); // Log any errors
      toast.error("Failed to update product: " + error.message);
    }
  };

  return (
    <div className="edit-product-page">
      <ToastContainer />
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
          />
        </label>
        <label>
          Stock:
          <input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
