import React, { SetStateAction, useEffect } from "react";
import { Chip, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";

type ChippedProps = {
  setArray: (value: any) => void;
  placeholder: string;
  label: string;
  initialArray?: string[];
};

export default function ChippedInput({
  setArray,
  placeholder,
  label,
  initialArray = [],
}: ChippedProps) {
  const [text, setText] = React.useState("");
  const [words, setWords] = React.useState<string[]>(initialArray);
  //   words = words.map((word) => word.trim());

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    let text: string = e.target.value;
    if (text === ",") text = "";
    setText(text);
  };

  const handleDelete = (word: string) => {
    setWords(words.filter((w) => w !== word));
  };

  useEffect(() => {
    const word_array: string[] = [...words];
    if (text !== "") word_array.push(text);
    setArray(word_array);
  }, [words, setArray, text]);
  return (
    <>
      {/* <div className="chipped-input"> */}
      <div
        className="flex-row"
        style={{ marginTop: "16px", marginBottom: "8px" }}
      >
        <TextField
          id="outlined-basic"
          style={{ marginRight: 10, minWidth: "50%" }}
          placeholder={placeholder}
          label={label}
          value={text}
          onChange={handleChangeText}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              setWords([...words, text]);
              setText("");
            }
          }}
        />
        <Stack
          direction={"row"}
          spacing={1}
          style={{
            width: "50%",
            alignContent: "center",
            alignItems: "center",
          }}
          flexWrap={"wrap"}
        >
          {words.map((word, index) => (
            <Chip
              key={index}
              label={word}
              onDelete={() => handleDelete(word)}
              className="chip"
            />
          ))}
        </Stack>
      </div>
    </>
  );
}
