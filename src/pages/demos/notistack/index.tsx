import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";

export default function NotistackPage() {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Button
      onClick={() => {
        enqueueSnackbar("hi", { variant: "success" });
      }}
    >
      Open
    </Button>
  );
}
