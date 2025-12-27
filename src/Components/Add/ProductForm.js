import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { addProduct, updateProduct } from "../../Services/ServicesApi";

const initialFormState = {
  title: "",
  price: "",
  category: "",
  priceWarning: false
};

const ProductForm = ({ open, handleClose, setProducts, editingProduct }) => {
  const [formData, setFormData] = useState(initialFormState);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // Populate form on edit / clear on add
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        title: editingProduct.title,
        price: editingProduct.price,
        category: editingProduct.category,
        priceWarning: false
      });
    } else {
      setFormData(initialFormState);
    }
  }, [editingProduct, open]);

  const handleSubmit = async () => {
    try {
      if (editingProduct) {
        const res = await updateProduct(editingProduct.id, {
          title: formData.title,
          price: formData.price,
          category: formData.category
        });

        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? res.data : p))
        );

        setToast({
          open: true,
          message: "Product updated successfully",
          severity: "success"
        });
      } else {
        const res = await addProduct({
          title: formData.title,
          price: formData.price,
          category: formData.category
        });

        // Add new product at top
        setProducts((prev) => [res.data, ...prev]);

        setToast({
          open: true,
          message: "Product added successfully",
          severity: "success"
        });

        // Clear form after add
        setFormData(initialFormState);
      }

      handleClose();
    } catch (error) {
      setToast({
        open: true,
        message: "Something went wrong",
        severity: "error"
      });
    }
  };

  const handleDialogClose = () => {
    setFormData(initialFormState);
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {editingProduct ? "Edit Product" : "Add Product"}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Product Title"
              fullWidth
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <TextField
              label="Price"
              fullWidth
              value={formData.price === 0 ? "" : formData.price}
              error={formData.priceWarning}
              helperText={
                formData.priceWarning
                  ? "Price cannot exceed 7 digits"
                  : ""
              }
              onChange={(e) => {
                const value = e.target.value;
                const numberRegex = /^[0-9]*$/;

                if (numberRegex.test(value)) {
                  if (value.length > 7) {
                    setFormData((prev) => ({
                      ...prev,
                      priceWarning: true
                    }));

                    setTimeout(() => {
                      setFormData((prev) => ({
                        ...prev,
                        priceWarning: false
                      }));
                    }, 2000);
                  } else {
                    setFormData((prev) => ({
                      ...prev,
                      price: value === "" ? 0 : Number(value),
                      priceWarning: false
                    }));
                  }
                }
              }}
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                maxLength: 7
              }}
            />

            <TextField
              label="Category"
              fullWidth
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editingProduct ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={toast.severity}
          onClose={() => setToast({ ...toast, open: false })}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductForm;
