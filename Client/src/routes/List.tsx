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
import jwtDecode from "jwt-decode";

import { useCookies } from "react-cookie";

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

type Column = {
  field: string;
  width: number;
};

interface Props {
  columns?: Column[];
}

export default function List({ columns }: Props) {
  const [resources, setResources] = useState<Resource[]>([]);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

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
      const result = await axios.get<Resource[]>("/api/resource");
      setResources(result.data);
    };
    fetchData();
  }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     // const dummyResources = [
  //     //   {
  //     //     id: 1,
  //     //     title: "Religious Misinformation Video",
  //     //     description: "This video spreads religious misinformation.",
  //     //     year: 2022,
  //     //     language: "English",
  //     //     origins: "Albania",
  //     //     targetAudience: "Middle aged adults",
  //     //     keywords: ["religious", "misinformation", "video"],
  //     //     category: "Religious",
  //     //     link: "https://example.com/video1",
  //     //     socialMedia: "TikTok",
  //     //   },
  //     //   {
  //     //     id: 2,
  //     //     title: "Far-Right Misinformation Video",
  //     //     description: "This video spreads far-right misinformation.",
  //     //     year: 2021,
  //     //     language: "English",
  //     //     origins: "Italy",
  //     //     targetAudience: "Middle aged adults",
  //     //     keywords: ["far-right", "misinformation", "video"],
  //     //     category: "Far-Right",
  //     //     link: "https://example.com/video2",
  //     //     socialMedia: "TikTok",
  //     //   },
  //     //   {
  //     //     id: 3,
  //     //     title: "Conspiracy Misinformation Video",
  //     //     description: "This video spreads conspiracy misinformation.",
  //     //     year: 2020,
  //     //     language: "English",
  //     //     origins: "Germany",
  //     //     targetAudience: "Middle aged adults",
  //     //     keywords: ["conspiracy", "misinformation", "video"],
  //     //     category: "Conspiracy",
  //     //     link: "https://example.com/video3",
  //     //     socialMedia: "Youtube",
  //     //   },
  //     //   {
  //     //     id: 4,
  //     //     title: "Anti-Vax Misinformation Video",
  //     //     description: "This video spreads anti-vaccine misinformation.",
  //     //     year: 2019,
  //     //     language: "English",
  //     //     origins: "France",
  //     //     targetAudience: "Middle aged adults",
  //     //     keywords: ["anti-vax", "misinformation", "video"],
  //     //     category: "Anti-Vax",
  //     //     link: "https://example.com/video4",
  //     //     socialMedia: "Facebook",
  //     //   },
  //     //   {
  //     //     id: 5,
  //     //     title: "Misinformation Video",
  //     //     description: "This video contains general misinformation.",
  //     //     year: 2018,
  //     //     language: "English",
  //     //     origins: "Greece",
  //     //     targetAudience: "Middle aged adults",
  //     //     keywords: ["misinformation", "video"],
  //     //     category: "General",
  //     //     link: "https://example.com/video5",
  //     //     socialMedia: "Instagram",
  //     //   },
  //     // ];

  //     setResources(dummyResources);
  //   };

  //   fetchData();
  // }, []);

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
        <div style={{ width: "120px", marginTop: "15px" }}>
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
