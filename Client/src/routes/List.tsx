import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
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
  categories: string[];
  link: string;
}

const columns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 130 },
  { field: "description", headerName: "Description", width: 400 },
  { field: "year", headerName: "Year", width: 130 },
  { field: "language", headerName: "Language", width: 130 },
  { field: "origins", headerName: "Origins", width: 130 },
  { field: "targetAudience", headerName: "Target Audience", width: 130 },
  {
    field: "keywords",
    headerName: "Keywords",
    width: 400,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.keywords.join(", "),
  },
  {
    field: "categories",
    headerName: "Categories",
    width: 250,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.categories.join(", "),
  },
  //display link as a link
  {
    field: "link",
    headerName: "Link",
    width: 230,
    renderCell: (params: GridRenderCellParams) => (
      <a href={params.value as string} target="_blank">
        {params.value}
      </a>
    ),
  },
];

export default function List() {
  const [resources, setResources] = useState<Resource[]>([]);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const selectedResource = resources.find(
    (resource) => resource.id === selectedRows[0]
  );
  console.log(selectedResource);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get<Resource[]>("/api/resource");
      setResources(result.data);
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

  return (
    <div style={{ position: "relative", minHeight: "90vh" }}>
      <div style={{ textAlign: "left", marginBottom: 10 }}>
        <Button
          variant="contained"
          onClick={handleAddModalOpen}
          color="success"
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

      <div style={{ height: 400, width: 1200 }}>
        <DataGrid
          rows={resources}
          columns={columns}
          autoPageSize
          checkboxSelection
          onRowSelectionModelChange={(e: GridRowId[]) => {
            const ids: number[] = e.map((id) => parseInt(id.toString()));
            setSelectedRows(ids);
          }}
        />
      </div>
    </div>
  );
}
