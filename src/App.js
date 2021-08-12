import React from "react"
import { Web3Provider } from "web3-hooks"
import { ChakraProvider } from "@chakra-ui/react"
import { PoolFactoryContextProvider } from "./contexts/PoolFactoryContext"
import Dapp from "./Dapp"

const App = () => {
  return (
    <Web3Provider>
      <ChakraProvider>
        <PoolFactoryContextProvider>
          <Dapp />
        </PoolFactoryContextProvider>
      </ChakraProvider>
    </Web3Provider>
  )
}

export default App
