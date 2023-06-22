import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import ExploreIcon from "@mui/icons-material/Explore";
import { blue } from "@mui/material/colors";

const StyledButton = styled(Button)(({ theme }) => ({
  "& .icon": {
    marginRight: theme.spacing(1),
    marginLeft: "-10px",
    transition: "transform 0.3s ease",
  },
  "&:hover .icon": {
    transform: "rotate(360deg)",
  },
}));

const DetailedDataButton = () => {
  const handleClick = () => {
    //redirect to List.tsx
  };

  return (
    <StyledButton
      variant="contained"
      size="large"
      onClick={handleClick}
      sx={{
        background: `linear-gradient(45deg, ${blue[500]} 30%, ${blue[700]} 90%)`,
        boxShadow: "0 3px 5px 2px rgba(1, 1, 1, .1)",
        borderRadius: "20px",
        padding: "10px 20px",
      }}
    >
      <ExploreIcon className="icon" />
      <Typography variant="button" className="button-text">
        Explore the Full Data Set
      </Typography>
    </StyledButton>
  );
};

export default DetailedDataButton;
