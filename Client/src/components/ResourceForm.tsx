import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import ChippedInput from "./ChippedInput";
import { Resource } from "../routes/List";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";

const socialMediaTypes = [
  "Youtube",
  "Facebook",
  "Twitter",
  "TikTok",
  "Instagram",
];
const categories = [
  "Far-Right",
  "Religious",
  "Conspiracy",
  "Anti-Vax",
  "Other",
];
const languages = [
  "Albanian",
  "Bulgarian",
  "Croatian",
  "Czech",
  "Danish",
  "Dutch",
  "English",
  "Estonian",
  "Finnish",
  "French",
  "German",
  "Greek",
  "Hungarian",
  "Irish",
  "Italian",
  "Latvian",
  "Lithuanian",
  "Maltese",
  "Polish",
  "Portuguese",
  "Romanian",
  "Slovak",
  "Slovenian",
  "Spanish",
  "Swedish",
];

type Props = {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (data: Resource) => void;
  editElement?: Resource;
};

function ResourceForm({ open, handleClose, handleSubmit, ...props }: Props) {
  //set title to props.title if it exists, otherwise set it to ""

  const countryList = [
    "Albania",
    "Andorra",
    "Austria",
    "Belarus",
    "Belgium",
    "Bosnia and Herzegovina",
    "Bulgaria",
    "Croatia",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Georgia (country)",
    "Greece",
    "Hungary",
    "Iceland",
    "Republic of Ireland",
    "Italy",
    "Kosovo",
    "Latvia",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "Moldova",
    "Monaco",
    "Montenegro",
    "Netherlands",
    "Republic of Macedonia",
    "Norway",
    "Poland",
    "Portugal",
    "Romania",
    "Russia",
    "San Marino",
    "Serbia",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden",
    "Switzerland",
    "Turkey",
    "Ukraine",
    "United Kingdom",
    "Vatican City",
  ];

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [otherCategory, setOtherCategory] = useState(""); //only used if category is "Other"
  const [description, setDescription] = useState("");
  const [year, setYear] = useState(2023);
  const [dateRecorded, setDateRecorded] = useState("");
  const [language, setLanguage] = useState("");
  const [origins, setOrigins] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [link, setLink] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [socialMedia, setSocialMedia] = useState("");

  useEffect(() => {
    if (props.editElement) {
      setTitle(props.editElement.title);
      setCategory(props.editElement.category);
      setDescription(props.editElement.description);
      setYear(props.editElement.year);
      setDateRecorded(props.editElement.dateRecorded);
      setLanguage(props.editElement.language);
      setOrigins(props.editElement.origins);
      setTargetAudience(props.editElement.targetAudience);
      setLink(props.editElement.link);
      setKeywords(props.editElement.keywords);
      setSocialMedia(props.editElement.socialMedia);
    }
  }, [props.editElement]);

  const testPopulate = () => {
    const rand_int = Math.floor(Math.random() * 1000);
    setTitle("Title " + rand_int);
    setCategory("Religious");
    setDescription("Description " + rand_int);
    setYear(2020);
    setLanguage("Language " + rand_int);
    setOrigins("Origins " + rand_int);
    setTargetAudience("Target Audience " + rand_int);
    setLink("Link " + rand_int);
    setKeywords(["Keyword " + rand_int]);
    setSocialMedia("YouTube");
  };

  const handleSubmitCallback = () => {
    // Here, you can send the data to your backend or perform any necessary actions
    const data_object: Resource = {
      id: 0,
      title,
      category,
      description,
      year,
      dateRecorded,
      keywords,
      language,
      origins,
      targetAudience,
      link,
      socialMedia,
    };

    if (otherCategory !== "") {
      data_object.category = otherCategory;
    }

    handleSubmit(data_object);

    setTitle("");
    setCategory("");
    setDescription("");
    setYear(2023);
    setLanguage("");
    setOrigins("");
    setTargetAudience("");
    setLink("");
    setKeywords([]);
    setSocialMedia("");
    handleClose();
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const selectedCategory = event.target.value as string;
    if (selectedCategory === "Other") {
      setCategory(selectedCategory);
    } else {
      setCategory(selectedCategory);
      setOtherCategory(""); // Clear the otherCategory value if it was previously set
    }
  };

  const handleOtherCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOtherCategory(event.target.value);
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
      test
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
          <FormControl
            fullWidth
            sx={{ mt: 2, display: "flex", flexDirection: "row" }}
          >
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={category}
              label="Category"
              onChange={handleCategoryChange}
              style={{
                width: category === "Other" ? "50%" : "100%",
              }}
            >
              {categories.map((category) => (
                <MenuItem value={category}>{category}</MenuItem>
              ))}
            </Select>

            {category === "Other" && (
              <TextField
                style={{ width: "45%", marginLeft: "5%" }}
                label="Please specify category"
                value={otherCategory}
                onChange={handleOtherCategoryChange}
              />
            )}
          </FormControl>
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
          {props.editElement && (
            <TextField
              label="Date recorded"
              type="text"
              fullWidth
              margin="normal"
              variant="outlined"
              value={dateRecorded}
              disabled
            />
          )}
          <ChippedInput
            initialArray={keywords}
            setArray={setKeywords}
            placeholder={"Add key words"}
            label={"Key words"}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="language-label">Language</InputLabel>
            <Select
              labelId="language-label"
              id="language"
              value={language}
              label="language"
              onChange={(e) => setLanguage(e.target.value)}
            >
              {languages.map((language) => (
                <MenuItem value={language}>{language}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="country-label">Origins (geographic)</InputLabel>
            <Select
              labelId="country-label"
              id="country"
              value={origins}
              label="Origins (geographic)"
              onChange={(e) => setOrigins(e.target.value)}
            >
              {countryList.map((country) => (
                <MenuItem value={country}>{country}</MenuItem>
              ))}
            </Select>
          </FormControl>
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
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="social-media-type-label">
              Social Media Type
            </InputLabel>
            <Select
              labelId="social-media-type-label"
              id="social-media-type"
              value={socialMedia}
              label="Social Media Type"
              onChange={(e) => setSocialMedia(e.target.value)}
            >
              {socialMediaTypes.map((socialMedia) => (
                <MenuItem value={socialMedia}>{socialMedia}</MenuItem>
              ))}
            </Select>
          </FormControl>
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
