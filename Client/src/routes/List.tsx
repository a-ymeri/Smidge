import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowHeightParams,
  GridRowId,
  GridTreeNodeWithRender,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import ResourceForm from "../components/ResourceForm";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

export interface Resource {
  id: number;
  title: string;
  description: string;
  year: number;
  language: string;
  origins: string;
  targetAudience: string;
  keywords: string[];
  category: string;
  link: string;
  socialMedia: string;
}

let columns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 130 },
  {
    field: "description",
    headerName: "Description",
    width: 350,
    renderCell: (params: GridRenderCellParams) => (
      //multiline cell
      <div style={{ whiteSpace: "pre-wrap", padding: 5 }}>{params.value}</div>
    ),
  },
  { field: "year", headerName: "Year", width: 130 },
  { field: "language", headerName: "Language", width: 130 },
  { field: "origins", headerName: "Origins", width: 130 },
  {
    field: "targetAudience",
    headerName: "Target Audience",
    width: 200,
    //multiline text
  },
  {
    field: "keywords",
    headerName: "Keywords",
    width: 250,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.keywords.join(", "),
  },
  {
    field: "category",
    headerName: "Category",
    width: 250,
  },
  {
    field: "link",
    headerName: "Link",
    width: 200,
    renderCell: (params: GridRenderCellParams) => (
      <a href={params.value as string} target="_blank">
        {params.value}
      </a>
    ),
  },
  { field: "socialMedia", headerName: "Social Media Type", width: 200 },
];

interface Props {
  columns?: string[];
}

export default function List(props: Props) {
  const [resources, setResources] = useState<Resource[]>([]);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [widths, setWidths] = useState<number[]>([]);

  if (props.columns) {
    columns = columns.filter((column) => props.columns?.includes(column.field));
  }

  const selectedResource = resources.find(
    (resource) => resource.id === selectedRows[0]
  );
  console.log(selectedResource);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get<Resource[]>("/api/resource");
      setResources(result.data);
      //get text size of each column, set width to max
      const widths = result.data.map((resource) => {
        const values = Object.values(resource);
        const lengths = values.map((value) => value.toString().length);
        const maxLength = Math.max(...lengths);
        return maxLength * 10;
      });
      setWidths(widths);
    };
    fetchData();
  }, []);

  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleEditModalOpen = () => {
    setEditModalOpen(true);
  };

  const editResource = async (data: Resource) => {
    const result = await axios.put<Resource>(
      `/api/resource/${selectedRows[0]}`,
      data
    );
    setResources(
      resources.map((resource) =>
        resource.id === selectedRows[0] ? result.data : resource
      )
    );
  };

  const handleClose = () => {
    setAddModalOpen(false);
    setEditModalOpen(false);
  };

  const addResource = async (data: Resource) => {
    const result = await axios.post<Resource>("/api/resource", data);
    setResources([...resources, result.data]);
  };

  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       main: "#8bc34a",
  //       //custom light green

  //     },
  //   },
  // });

  return (
    // <ThemeProvider theme={theme}>
    <div
      style={{
        position: "relative",
        minHeight: "90vh",
        backgroundColor: "#f5fafa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 20,
      }}
    >
      <div style={{ textAlign: "left", marginBottom: 10 }}>
        <Button
          variant="contained"
          onClick={handleAddModalOpen}
          //color light green
          style={{
            backgroundColor: "#8bc34a",
          }}
          startIcon={<AddIcon />}
        >
          Add new
        </Button>

        {/* {selectedRows.length > 0 && ( */}
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          style={{
            marginLeft: 10,
          }}
          color="error"
          onClick={() => {
            axios
              .delete<Resource[]>(`/api/resource/deletemultiple`, {
                data: selectedRows,
              })
              .then(() => {
                setResources(
                  resources.filter(
                    (resource) => !selectedRows.includes(resource.id)
                  )
                );
              })
              .catch((err) => {
                console.log(err);
                alert("Error deleting resources");
              });
          }}
          disabled={selectedRows.length == 0}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          style={{
            marginLeft: 10,
          }}
          onClick={() => {
            handleEditModalOpen();
          }}
          disabled={selectedRows.length !== 1}
        >
          Edit
        </Button>

        <ResourceForm
          open={addModalOpen}
          handleClose={handleClose}
          handleSubmit={addResource}
        />

        <ResourceForm
          open={editModalOpen}
          handleClose={handleClose}
          handleSubmit={editResource}
          editElement={selectedResource}
        />
      </div>

      <div style={{ height: 600, width: 1200 }}>
        <DataGrid
          sx={{
            bgcolor: "white",
            boxShadow: 2,
          }}
          rows={resources}
          columns={columns}
          autoPageSize
          checkboxSelection
          onRowSelectionModelChange={(e: GridRowId[]) => {
            const ids: number[] = e.map((id) => parseInt(id.toString()));
            setSelectedRows(ids);
          }}
          getRowHeight={() => "auto"}
        />
      </div>
    </div>
    // </ThemeProvider>
  );
}
