import { useEffect, useState } from "react";
import axios from "axios";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowId,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import ResourceForm from "../components/ResourceForm";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { GoogleLogin } from "@react-oauth/google";
import MicrosoftLogin from "react-microsoft-login";
import jwtDecode from "jwt-decode";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { useCookies } from "react-cookie";

export interface Resource {
  id: number;
  title: string;
  description: string;
  year: number;
  dateRecorded: string;
  language: string;
  origins: string;
  targetAudience: string;
  keywords: string[];
  categories: string[];
  link: string;
  socialMedia: string;
}

const tableColumns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 200 },
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
  { field: "dateRecorded", headerName: "Date Recorded", width: 150 },
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
    field: "categories",
    headerName: "Categories",
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

type Column = {
  field: string;
  width: number;
};

interface Props {
  columns?: Column[];
}

export default function List({ columns }: Props) {
  const redirectUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5173"
      : "https://smidge.ardity.dev";
  const [resources, setResources] = useState<Resource[]>([]);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [filteredColumns, setFilteredColumns] = useState<GridColDef[]>([
    ...tableColumns,
  ]);

  //get auth token from cookies
  const [cookies, ,] = useCookies(["token"]);
  const showAdmin = !columns && cookies.token;

  useEffect(() => {
    if (!columns) return;
    const filteredColumns = tableColumns.filter((column) =>
      columns.find((col) => col.field === column.field)
    );

    filteredColumns.forEach((column) => {
      const width = columns.find((col) => col.field === column.field)?.width;
      if (width) column.width = width;
    });
    setFilteredColumns(filteredColumns);
  }, [columns]);

  const selectedResource = resources.find(
    (resource) => resource.id === selectedRows[0]
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = (await axios.get<Resource[]>("/api/resource")).data;
      const convertedDatesList: any = result.map((resource) => {
        return {
          ...resource,
          dateRecorded: resource.dateRecorded.split("T")[0],
        };
      });
      setResources(convertedDatesList);
    };
    fetchData();
  }, []);

  const handleGoogleLogin = (resp: any) => {
    const credential = resp.credential;
    // send token to backend in Authorization header
    console.log(credential);
    axios
      .get("/api/auth/login", {
        headers: { Authorization: `Bearer ${credential}` },
      })
      .then((resp) => {
        // store in cookies that the user is logged in
        const token = resp.data;
        const decoded: any = jwtDecode(token);
        document.cookie = `token=${token}; expires=${new Date(
          decoded.exp * 1000
        ).toUTCString()} path=/`;
        // alert('success');
        // navigate('/admin');
        window.location.reload();
      })
      .catch(() => {
        alert("You are not authorized to access this page");
        // navigate("/");
        // window.location.reload();
      });
  };

  const handleMicrosoftLogin = (err: any, resp: any) => {
    if (err) console.log(err);
    const credential = resp.idToken;
    // send token to backend in Authorization header
    axios
      .get("/api/auth/login", {
        headers: { Authorization: `Bearer ${credential}` },
      })
      .then((resp) => {
        // store in cookies that the user is logged in
        const token = resp.data;
        const decoded: any = jwtDecode(token);
        document.cookie = `token=${token}; expires=${new Date(
          decoded.exp * 1000
        ).toUTCString()} path=/`;
        window.location.reload();
      })
      .catch(() => {
        alert("You are not authorized to access this page");
      });
  };

  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleEditModalOpen = () => {
    setEditModalOpen(true);
  };

  const handleDelete = () => {
    axios
      .delete<Resource[]>(`/api/resource/deletemultiple`, {
        data: selectedRows,
      })
      .then(() => {
        setResources(
          resources.filter((resource) => !selectedRows.includes(resource.id))
        );
      })
      .catch((err) => {
        console.log(err);
        alert("Error deleting resources");
      });
    setSelectedRows([]);
    setDeleteModalOpen(false);
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
        backgroundColor: "#f5fafa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 20,
        margin: "auto",
        paddingBottom: 20,
      }}
    >
      {showAdmin && (
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
              setDeleteModalOpen(true);
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

          <Dialog
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
          >
            <DialogTitle>Deletion confirmation</DialogTitle>

            <DialogContent>
              Are you sure you want to delete the selected resource(s)? This
              action cannot be undone.
            </DialogContent>
            <DialogActions>
              <Button
                // variant="contained"
                onClick={() => setDeleteModalOpen(false)}
                style={{ marginLeft: 10 }}
              >
                Cancel
              </Button>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}

      <div
        style={{
          height: 600,
          // minWidth: 600,
          maxWidth: 1400,
          width: "100%",
        }}
      >
        <DataGrid
          // sx={{
          //   bgcolor: "white",
          //   boxShadow: 2,
          // }}
          key={window.location.pathname}
          className="rounded-component"
          rows={resources}
          columns={filteredColumns}
          autoPageSize
          checkboxSelection
          onRowSelectionModelChange={(e: GridRowId[]) => {
            const ids: number[] = e.map((id) => parseInt(id.toString()));
            setSelectedRows(ids);
          }}
          getRowHeight={() => "auto"}
        />
      </div>
      {!showAdmin && filteredColumns.length > 5 && (
        <div
          style={{
            width: "120px",
            marginTop: "15px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ paddingBottom: "10px" }}>
            <MicrosoftLogin
              clientId={"ea90c1ea-9587-4373-b1ba-cc7b1987e6c2"}
              authCallback={handleMicrosoftLogin}
              redirectUri={redirectUrl}
              children={undefined}
              buttonTheme="light_short"
            />
          </div>
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              alert("err");
            }}
          />
        </div>
      )}
    </div>
    // </ThemeProvider>
  );
}
