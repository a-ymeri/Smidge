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
  OutlinedInput,
  Checkbox,
  ListItemText,
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
  "Other",
];
const categories = [
  "Far-Right",
  "Religious",
  "Conspiracy",
  "Anti-Vax",
  "Other",
];
const languages = [
  "Abkhaz",
  "Afar",
  "Afrikaans",
  "Akan",
  "Albanian",
  "Amharic",
  "Arabic",
  "Aragonese",
  "Armenian",
  "Assamese",
  "Avaric",
  "Avestan",
  "Aymara",
  "Azerbaijani",
  "Bambara",
  "Bashkir",
  "Basque",
  "Belarusian",
  "Bengali",
  "Bihari",
  "Bislama",
  "Bosnian",
  "Breton",
  "Bulgarian",
  "Burmese",
  "Catalan; Valencian",
  "Chamorro",
  "Chechen",
  "Chichewa; Chewa; Nyanja",
  "Chinese",
  "Chuvash",
  "Cornish",
  "Corsican",
  "Cree",
  "Croatian",
  "Czech",
  "Danish",
  "Divehi; Dhivehi; Maldivian;",
  "Dutch",
  "English",
  "Esperanto",
  "Estonian",
  "Ewe",
  "Faroese",
  "Fijian",
  "Finnish",
  "French",
  "Fula; Fulah; Pulaar; Pular",
  "Galician",
  "Georgian",
  "German",
  "Greek, Modern",
  "Guaraní",
  "Gujarati",
  "Haitian; Haitian Creole",
  "Hausa",
  "Hebrew (modern)",
  "Herero",
  "Hindi",
  "Hiri Motu",
  "Hungarian",
  "Interlingua",
  "Indonesian",
  "Interlingue",
  "Irish",
  "Igbo",
  "Inupiaq",
  "Ido",
  "Icelandic",
  "Italian",
  "Inuktitut",
  "Japanese",
  "Javanese",
  "Kalaallisut, Greenlandic",
  "Kannada",
  "Kanuri",
  "Kashmiri",
  "Kazakh",
  "Khmer",
  "Kikuyu, Gikuyu",
  "Kinyarwanda",
  "Kirghiz, Kyrgyz",
  "Komi",
  "Kongo",
  "Korean",
  "Kurdish",
  "Kwanyama, Kuanyama",
  "Latin",
  "Luxembourgish, Letzeburgesch",
  "Luganda",
  "Limburgish, Limburgan, Limburger",
  "Lingala",
  "Lao",
  "Lithuanian",
  "Luba-Katanga",
  "Latvian",
  "Manx",
  "Macedonian",
  "Malagasy",
  "Malay",
  "Malayalam",
  "Maltese",
  "Māori",
  "Marathi (Marāṭhī)",
  "Marshallese",
  "Mongolian",
  "Nauru",
  "Navajo, Navaho",
  "Norwegian Bokmål",
  "North Ndebele",
  "Nepali",
  "Ndonga",
  "Norwegian Nynorsk",
  "Norwegian",
  "Nuosu",
  "South Ndebele",
  "Occitan",
  "Ojibwe, Ojibwa",
  "Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic",
  "Oromo",
  "Oriya",
  "Ossetian, Ossetic",
  "Panjabi, Punjabi",
  "Pāli",
  "Persian",
  "Polish",
  "Pashto, Pushto",
  "Portuguese",
  "Quechua",
  "Romansh",
  "Kirundi",
  "Romanian, Moldavian, Moldovan",
  "Russian",
  "Sanskrit (Saṁskṛta)",
  "Sardinian",
  "Sindhi",
  "Northern Sami",
  "Samoan",
  "Sango",
  "Serbian",
  "Scottish Gaelic; Gaelic",
  "Shona",
  "Sinhala, Sinhalese",
  "Slovak",
  "Slovene",
  "Somali",
  "Southern Sotho",
  "Spanish; Castilian",
  "Sundanese",
  "Swahili",
  "Swati",
  "Swedish",
  "Tamil",
  "Telugu",
  "Tajik",
  "Thai",
  "Tigrinya",
  "Tibetan Standard, Tibetan, Central",
  "Turkmen",
  "Tagalog",
  "Tswana",
  "Tonga (Tonga Islands)",
  "Turkish",
  "Tsonga",
  "Tatar",
  "Twi",
  "Tahitian",
  "Uighur, Uyghur",
  "Ukrainian",
  "Urdu",
  "Uzbek",
  "Venda",
  "Vietnamese",
  "Volapük",
  "Walloon",
  "Welsh",
  "Wolof",
  "Western Frisian",
  "Xhosa",
  "Yiddish",
  "Yoruba",
  "Zhuang, Chuang",
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
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "The Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo, Democratic Republic of the",
    "Congo, Republic of the",
    "Costa Rica",
    "Côte d’Ivoire",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor (Timor-Leste)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "The Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, North",
    "Korea, South",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia, Federated States of",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Sudan, South",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  const [title, setTitle] = useState("");
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
      setDescription(props.editElement.description);
      setYear(props.editElement.year);
      setDateRecorded(props.editElement.dateRecorded);
      setLanguage(props.editElement.language);
      setOrigins(props.editElement.origins);
      setTargetAudience(props.editElement.targetAudience);
      setLink(props.editElement.link);
      setKeywords(props.editElement.keywords);
      setSocialMedia(props.editElement.socialMedia);

      let containsOther = false;
      props.editElement.categories.forEach((category) => {
        if (!categories.includes(category)) {
          containsOther = true;
        }
      });

      if (containsOther || props.editElement.categories.includes("Other")) {
        const newCategories = props.editElement.categories.filter(
          (el) => categories.includes(el) // Only keep the categories that are in the categories array
        );
        const otherCategory = props.editElement.categories.filter(
          (el) => !categories.includes(el) // Only keep the categories that are not in the categories array
        )[0];
        newCategories.push("Other");
        setSelectedCategories(newCategories);
        setOtherCategory(otherCategory);
      } else {
        setSelectedCategories(props.editElement.categories);
      }
    }
  }, [props.editElement]);

  // const testPopulate = () => {
  //   const rand_int = Math.floor(Math.random() * 1000);
  //   setTitle("Title " + rand_int);
  //   setCategory("Religious");
  //   setDescription("Description " + rand_int);
  //   setYear(2020);
  //   setLanguage("Language " + rand_int);
  //   setOrigins("Origins " + rand_int);
  //   setTargetAudience("Target Audience " + rand_int);
  //   setLink("Link " + rand_int);
  //   setKeywords(["Keyword " + rand_int]);
  //   setSocialMedia("YouTube");
  // };

  const handleSubmitCallback = () => {
    // Here, you can send the data to your backend or perform any necessary actions
    const data_object: Resource = {
      id: 0,
      title,
      categories: selectedCategories,
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

    if (selectedCategories.includes("Other")) {
      const newCategories = selectedCategories.filter((el) => el !== "Other");
      newCategories.push(otherCategory);
    }

    handleSubmit(data_object);

    setTitle("");
    setSelectedCategories([]);
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

  // const handleCategoryChange = (event: SelectChangeEvent<string>) => {
  //   const selectedCategory = event.target.value as string;
  //   if (selectedCategory === "Other") {
  //     setCategory(selectedCategory);
  //   } else {
  //     setCategory(selectedCategory);
  //     setOtherCategory(""); // Clear the otherCategory value if it was previously set
  //   }
  // };

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange2 = (
    event: SelectChangeEvent<typeof selectedCategories>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(value as string[]);
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
      {/* <Button onClick={testPopulate}>Populate</Button> */}
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
              multiple
              value={selectedCategories}
              style={{
                width: selectedCategories.includes("Other") ? "50%" : "100%",
              }}
              onChange={handleCategoryChange2}
              input={<OutlinedInput label="Categories" />}
              renderValue={(selected) => (selected as string[]).join(", ")} // explicitly cast to string[]
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  <Checkbox
                    checked={selectedCategories.indexOf(category) > -1}
                  />
                  <ListItemText primary={category} />
                </MenuItem>
              ))}
            </Select>

            {selectedCategories.includes("Other") && (
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
