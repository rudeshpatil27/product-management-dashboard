import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import ProductTable from "./ProductTable";
import SearchBar from "./Searchbar";
import { getProducts } from "../Services/ServicesApi";
import ProductForm from "./Add/ProductForm";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditingProduct(null);
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f6f8", py: 4 }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "center" }}
          spacing={2}
          mb={3}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign={{ xs: "center", sm: "left" }}
          >
            Product Dashboard
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            fullWidth={true}
            sx={{ maxWidth: { sm: "200px" }, alignSelf: "center" }}
            onClick={() => setOpenForm(true)}
          >
            Add Product
          </Button>
        </Stack>

        <Card>
          <CardContent>
            <SearchBar search={search} setSearch={setSearch} />
            <ProductTable
              products={products}
              setProducts={setProducts}
              search={search}
              onEdit={handleEdit}
            />
          </CardContent>
        </Card>
        <ProductForm
          open={openForm}
          handleClose={handleCloseForm}
          setProducts={setProducts}
          editingProduct={editingProduct}
        />
      </Container>
    </Box>
  );
};

export default Dashboard;
