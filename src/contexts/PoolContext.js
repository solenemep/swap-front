import { createContext } from "react"
import { useContract } from "web3-hooks"
import { poolABI } from "../contracts/Pool"

export const PoolContext = createContext()

export const PoolContextProvider = ({ poolAddress, children }) => {
  const poolContract = useContract(poolAddress, poolABI)
  return (
    <PoolContext.Provider value={{ poolContract }}>{children}</PoolContext.Provider>
  )
}
