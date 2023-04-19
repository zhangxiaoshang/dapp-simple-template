import Link from "next/link";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

const pages = ["no-layout-page", "theme", "web3-modal", "notistack", "dapp"];

export default function Demos() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 10,
      }}
    >
      <Stack spacing={2} direction="column">
        {pages.map((page) => (
          <Link key={page} href={`/demos/${page}`}>
            {page}
          </Link>
        ))}
      </Stack>
    </Container>
  );
}
