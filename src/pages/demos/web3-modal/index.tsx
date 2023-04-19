import Box from "@mui/material/Box";
import { Web3Button } from "@web3modal/react";

export default function Web3ModalPage() {
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Web3Button icon="show" balance="show" />
    </Box>
  );
}
