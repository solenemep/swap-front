import { Box } from "@chakra-ui/react"
import { Fragment, useState } from "react"
import Donate from "./components/Donate"
import Footer from "./components/Footer"
import Nav from "./components/Nav"
import Pool from "./components/Pool"
import Stats from "./components/Stats"

const Dapp = () => {
  const [choice, setChoice] = useState("pool")
  return (
    <Fragment>
      <Nav choice={choice} setChoice={setChoice} />
      <Box minH={"100vh"}>
        {choice === "pool" && <Pool />}
        {choice === "stats" && <Stats />}
      </Box>
      <Donate />
      <Footer />
    </Fragment>
  )
}
export default Dapp
