import React from "react";
import TextField from "@mui/material/TextField";

const SearchBar = ({ search, setSearch }) => {
    return (
        <TextField
            label="Search product by title"
            variant="outlined"
            fullWidth
            sx={{ mb: 3 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    );
};

export default SearchBar;
