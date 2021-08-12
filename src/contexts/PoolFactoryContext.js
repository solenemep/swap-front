import { createContext } from "react"
import { useContract } from "web3-hooks"
import { poolFactoryAddress, poolFactoryABI } from "../contracts/PoolFactory"

export const PoolFactoryContext = createContext()

export const PoolFactoryContextProvider = ({ children }) => {
  const poolFactory = useContract(poolFactoryAddress, poolFactoryABI)
  return (
    <PoolFactoryContext.Provider value={{ poolFactory }}>
      {children}
    </PoolFactoryContext.Provider>
  )
}
