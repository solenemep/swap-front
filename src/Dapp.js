import { Box } from "@chakra-ui/react"
import { useState } from "react"
import Footer from "./components/Footer"
import Nav from "./components/Nav"
import Pool from "./components/Pool"
import Swap from "./components/Swap"
import Liquidity from "./components/Liquidity"
import { Fragment } from "react"

const Dapp = () => {
  const [choice, setChoice] = useState("pool")
  return (
    <Fragment>
      <Nav choice={choice} setChoice={setChoice} />
      <Box minH={"100vh"}>
        {choice === "pool" && <Pool />}
        {choice === "liquidity" && <Liquidity />}
        {choice === "swap" && <Swap />}
      </Box>
      <Footer />
    </Fragment>
  )
}
export default Dapp
