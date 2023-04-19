import Box from "@mui/material/Box";
import Header from "./header";
import Footer from "./footer";

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Header></Header>
      <Box sx={{ minHeight: "calc(100vh - 68.5px - 68px)" }}>{children}</Box>
      <Footer></Footer>
    </>
  );
}
