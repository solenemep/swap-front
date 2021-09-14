import { Alert, AlertIcon, Heading, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { PoolContextProvider } from "../contexts/PoolContext"
import { TokensContextProvider } from "../contexts/TokensContext"
import SelectPool from "./SelectPool"
import SwapBis from "./SwapBis"

const Swap = () => {
  const [poolAddress, setPoolAddress] = useState("")

  const [token1, setToken1] = useState({})
  const [token2, setToken2] = useState({})
  const [fees, setFees] = useState(0)

  return (
    <VStack
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={8}
      py={24}
      px={32}
    >
      <Heading>Swap Tokens</Heading>
      <SelectPool
        poolAddress={poolAddress}
        setPoolAddress={setPoolAddress}
        token1={token1}
        setToken1={setToken1}
        token2={token2}
        setToken2={setToken2}
        fees={fees}
        setFees={setFees}
      />
      {poolAddress !== "" && (
        <PoolContextProvider poolAddress={poolAddress}>
          <TokensContextProvider token1Address={token1} token2Address={token2}>
            <SwapBis token1={token1} token2={token2} />
          </TokensContextProvider>
        </PoolContextProvider>
      )}
      {poolAddress === "0x00" && (
        <Alert status="warning">
          <AlertIcon />
          No existant pool with this parameters
        </Alert>
      )}
    </VStack>
  )
}
export default Swap
