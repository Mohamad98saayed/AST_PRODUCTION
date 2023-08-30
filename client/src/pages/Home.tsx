import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";
import { getAllCarsAsync } from "../state/features/car/carSlice";
import { useNavigate } from "react-router-dom";

import Metadata from "../components/Metadata";

import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const Home = () => {
  // hooks
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { cars } = useAppSelector((state) => state.cars);

  useEffect(() => {
    dispatch(getAllCarsAsync());
  }, [dispatch]);

  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "ID",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleCellClick(params)}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "manufacturer",
      headerName: "Manufacturer",
      width: 150,
      editable: true,
    },
    {
      field: "model",
      headerName: "Model",
      width: 150,
      editable: true,
    },
    {
      field: "year",
      headerName: "Year",
      type: "number",
      width: 150,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 150,
    },
    {
      field: "color",
      headerName: "Color",
      width: 150,
    },
    {
      field: "fuelType",
      headerName: "Fuel Type",
      width: 150,
    },
    {
      field: "transmition",
      headerName: "Transmition",
      width: 150,
    },
    {
      field: "user",
      headerName: "User Name",
      flex: 1,
      width: 150,
      valueGetter: (params) => params.row.user.name,
    },
  ];

  function handleCellClick(params: GridRenderCellParams) {
    navigate(`/cars/${params.id}`);
  }

  return (
    <section id="home">
      <Metadata title="home page" />
      {cars ? (
        <Box
          sx={{
            height: 400,
            width: "90%",
          }}
        >
          <DataGrid
            rows={cars.cars}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 4,
                },
              },
            }}
            getRowId={(row) => row._id}
            pageSizeOptions={[4]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      ) : (
        <h1>Loading</h1>
      )}
    </section>
  );
};

export default Home;
