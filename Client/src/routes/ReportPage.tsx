import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useState } from "react";
import emailjs from "emailjs-com";

export default function ReportPage() {
 
  emailjs.init("8YIMmBe9XkVKdPJoP");
  const [URL, setURL] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [customCategory, setCustomCategory] = useState<string>("");
  //   const [socialMedia, setSocialMedia]


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const templateParams = {
      url: URL,
      category: category,
      customCategory: category === "Other" ? customCategory : "",
      description: description,
    };
  
    emailjs
      .send("service_q3u50hq", "template_yqiuyql", templateParams)
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        textAlign: "left",
        paddingBottom: "100px",
        paddingTop: "100px",
        background: "#f5fafa",
      }}
    >
      <form style={{ width: "50%" }} onSubmit={handleSubmit}>
        <h2>Report a video</h2>
        <p>
          If you feel that you have come across a video that spreads radicalism
          or misinformation, do not hesitate to report it using the below form.
          The link will be reviewed by our team members and will be added in due
          time.
        </p>
        <TextField
          label="Link to the video"
          fullWidth
          variant="outlined"
          value={URL}
          onChange={(e) => setURL(e.target.value)}
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
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            style={{
              width: category === "Other" ? "50%" : "100%",
            }}
          >
            <MenuItem value={"Far-Right"}>Far-Right</MenuItem>
            <MenuItem value={"Religious"}>Religious</MenuItem>
            <MenuItem value={"Conspiracy"}>Conspiracy</MenuItem>
            <MenuItem value={"Anti-Vax"}>Anti-Vax</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </Select>

          {category === "Other" && (
            <TextField
              style={{ width: "45%", marginLeft: "5%" }}
              label="Please specify category"
              value={customCategory}
              onChange={(e) => {
                setCustomCategory(e.target.value);
              }}
            />
          )}
        </FormControl>
        <TextField
          label="Explain why this video promotes radicalism"
          fullWidth
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
}
