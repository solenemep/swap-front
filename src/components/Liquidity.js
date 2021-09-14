import { Heading, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { PoolContextProvider } from "../contexts/PoolContext"
import { TokensContextProvider } from "../contexts/TokensContext"
import LiquidityBis from "./LiquidityBis"
import SelectPool from "./SelectPool"

const Liquidity = () => {
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
      <Heading>Add or Remove Liquidity</Heading>
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
            <LiquidityBis
              poolAddress={poolAddress}
              token1={token1}
              token2={token2}
            />
          </TokensContextProvider>
        </PoolContextProvider>
      )}
    </VStack>
  )
}
export default Liquidity
