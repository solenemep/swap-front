import { createContext } from "react"
import { useContract } from "web3-hooks"
import { poolABI } from "../contracts/Pool"

export const PoolContext = createContext()

export const PoolContextProvider = ({ poolAddress, children }) => {
  const pool = useContract(poolAddress, poolABI)
  return (
    <PoolContext.Provider value={{ pool }}>{children}</PoolContext.Provider>
  )
}
