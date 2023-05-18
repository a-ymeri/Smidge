import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import ChippedInput from "./ChippedInput";
import { Resource } from "../routes/List";

type Props = {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (data: Resource) => void;
  editElement?: Resource;
};

function ResourceForm({ open, handleClose, handleSubmit, ...props }: Props) {
  //set title to props.title if it exists, otherwise set it to ""
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [year, setYear] = useState(2023);
  const [language, setLanguage] = useState("");
  const [origins, setOrigins] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [link, setLink] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);

  useEffect(() => {
    if (props.editElement) {
      setTitle(props.editElement.title);
      setCategories(props.editElement.categories);
      setDescription(props.editElement.description);
      setYear(props.editElement.year);
      setLanguage(props.editElement.language);
      setOrigins(props.editElement.origins);
      setTargetAudience(props.editElement.targetAudience);
      setLink(props.editElement.link);
      setKeywords(props.editElement.keywords);
    }
  }, [props.editElement]);

  const testPopulate = () => {
    const rand_int = Math.floor(Math.random() * 1000);
    setTitle("Title " + rand_int);
    setCategories(["Category " + rand_int]);
    setDescription("Description " + rand_int);
    setYear(2020);
    setLanguage("Language " + rand_int);
    setOrigins("Origins " + rand_int);
    setTargetAudience("Target Audience " + rand_int);
    setLink("Link " + rand_int);
    setKeywords(["Keyword " + rand_int]);
  };

  const handleSubmitCallback = () => {
    // Here, you can send the data to your backend or perform any necessary actions
    const data_object: Resource = {
      id: 0,
      title,
      categories,
      description,
      year,
      keywords,
      language,
      origins,
      targetAudience,
      link,
    };

    handleSubmit(data_object);

    setTitle("");
    setCategories([]);
    setDescription("");
    setYear(2023);
    setLanguage("");
    setOrigins("");
    setTargetAudience("");
    setLink("");
    setKeywords([]);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {props.editElement ? "Edit resource" : "Add a new resource"}
      </DialogTitle>
      <Button onClick={testPopulate}>Populate</Button>
      <DialogContent>
        <form>
          <TextField
            label="Title of the video"
            fullWidth
            margin="normal"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <ChippedInput
            initialArray={categories}
            setArray={setCategories}
            placeholder={"Add a new category"}
            label={"Category"}
          />
          <TextField
            label="Description of the video"
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Year of the video"
            type="number"
            fullWidth
            margin="normal"
            variant="outlined"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
          />
          <ChippedInput
            initialArray={keywords}
            setArray={setKeywords}
            placeholder={"Add key words"}
            label={"Key words"}
          />
          <TextField
            label="Language"
            fullWidth
            margin="normal"
            variant="outlined"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
          <TextField
            label="Origins (geographic)"
            fullWidth
            margin="normal"
            variant="outlined"
            value={origins}
            onChange={(e) => setOrigins(e.target.value)}
          />
          <TextField
            label="Target audience"
            fullWidth
            margin="normal"
            variant="outlined"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
          />
          <TextField
            label="Link"
            fullWidth
            margin="normal"
            variant="outlined"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </form>
      </DialogContent>
      <DialogActions
        style={{
          padding: "20px 24px",
        }}
      >
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmitCallback} variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ResourceForm;
