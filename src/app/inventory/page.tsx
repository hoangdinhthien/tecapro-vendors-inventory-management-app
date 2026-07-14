"use client";

import { useGetProductsQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppSelector } from "@/app/redux";

const columns: GridColDef[] = [
  { field: "productId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Product Name", width: 200 },
  {
    field: "price",
    headerName: "Price",
    width: 110,
    type: "number",
    valueGetter: (value, row) => `$${row.price}`,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 110,
    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    width: 150,
    type: "number",
  },
];

const Inventory = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) {
    return <div className='py-4'>Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className='text-center text-red-500 py-4'>
        Failed to fetch products
      </div>
    );
  }

  const bg = isDarkMode ? "#1f2937" : "#ffffff";
  const bgHeader = isDarkMode ? "#111827" : "#f3f4f6";
  const text = isDarkMode ? "#e5e7eb" : "#374151";
  const textStrong = isDarkMode ? "#f3f4f6" : "#111827";
  const border = isDarkMode ? "#374151" : "#e5e7eb";
  const rowHover = isDarkMode ? "#374151" : "#f9fafb";
  const iconColor = isDarkMode ? "#9ca3af" : "#6b7280";

  return (
    <div className='flex flex-col'>
      <Header name='Inventory' />
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row.productId}
        checkboxSelection
        sx={{
          maxHeight: "70vh",
          mt: 2.5,
          borderRadius: 2,
          boxShadow: 1,
          backgroundColor: bg,
          color: text,
          borderColor: border,
          "& .MuiDataGrid-columnHeader": { backgroundColor: bgHeader },
          "& .MuiDataGrid-columnHeaderTitle": { color: textStrong, fontWeight: 600 },
          "& .MuiDataGrid-columnSeparator": { color: border },
          "& .MuiDataGrid-scrollbarFiller, & .MuiDataGrid-scrollbarFiller--header, & .MuiDataGrid-filler": {
            backgroundColor: `${bgHeader} !important`,
          },
          "& .MuiDataGrid-row": {
            backgroundColor: bg,
            "&:hover": { backgroundColor: rowHover },
          },
          "& .MuiDataGrid-cell": { color: text, borderBottomColor: border },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: bgHeader,
            color: text,
            borderTopColor: border,
          },
          "& .MuiTablePagination-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
            { color: text },
          "& .MuiTablePagination-selectIcon, & .MuiIconButton-root": { color: iconColor },
          "& .MuiCheckbox-root": { color: iconColor },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: bg },
          "& .MuiDataGrid-row.Mui-selected": {
            backgroundColor: isDarkMode ? "#2d4a6b !important" : "#e8f0fe !important",
            "&:hover": {
              backgroundColor: isDarkMode ? "#3a5a80 !important" : "#d2e3fc !important",
            },
          },
        }}
      />
    </div>
  );
};

export default Inventory;
