import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

export default function Footer() {
  return (
    <Box
      sx={{
        textAlign: "center",
        height: 68,
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        bgcolor: (theme) => theme.palette.grey[900],
      }}
    >
      <Link
        href="#"
        sx={{
          lineHeight: "68px",
        }}
      >
        github
      </Link>
    </Box>
  );
}
