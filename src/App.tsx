import { Container } from "@chakra-ui/react";
import { Routers } from "./routes";
import { Header } from "./components/Header";
import { useEffect, useState } from "react";

function App() {
  const [bodyHeight, setBodyHeight] = useState("100vh");

  useEffect(() => {
    const handleHeight = () => {
      if (document.documentElement.scrollHeight > window.innerHeight) {
        setBodyHeight("100%");
      } else {
        setBodyHeight("100vh");
      }
    };

    handleHeight();
    window.addEventListener("resize", handleHeight);

    return () => {
      window.removeEventListener("resize", handleHeight);
    };
  }, []);
  return (
    <>
      <Container maxWidth={"8xl"} h={bodyHeight}>
        <Header />
      </Container>
      <Routers />
    </>
  );
}

export default App;
