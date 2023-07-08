import React, { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import emailjs from "emailjs-com";

export default function ReportPage() {
  emailjs.init("8YIMmBe9XkVKdPJoP");
  const [URL, setURL] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let successTimeout: ReturnType<typeof setTimeout>;

    if (isSuccess) {
      successTimeout = setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }

    return () => clearTimeout(successTimeout);
  }, [isSuccess]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!URL || !description || !category) {
      setErrorMessage("Please fill in all the required fields.");
      return;
    }

    setIsSending(true);

    const templateParams = {
      url: URL,
      category: category,
      customCategory: category === "Other" ? customCategory : "",
      description: description,
    };

    emailjs
      .send("service_q3u50hqXX", "template_yqiuyql", templateParams)
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
        setIsSending(false);
        setIsSuccess(true);
        setURL("");
        setDescription("");
        setCategory("");
        setCustomCategory("");
        setErrorMessage("");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        setIsSending(false);
        setIsSuccess(false);
        setErrorMessage("There was an error while sending this email.");
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
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {isSuccess && (
          <p
            style={{
              color: "green",
              transition: "opacity 0.5s",
              opacity: isSuccess ? 1 : 0,
            }}
          >
            Email sent successfully!
          </p>
        )}
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
              setCategory(e.target.value as string);
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

        <Button
          type="submit"
          variant="contained"
          disabled={isSending}
          style={{ position: "relative", overflow: "hidden" }}
        >
          {isSending ? (
            <>
              Sending.. <CircularProgress size={24} />
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </div>
  );
}
