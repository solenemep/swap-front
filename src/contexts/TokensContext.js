import { createContext } from "react"
import { useContract } from "web3-hooks"
import { tokensABI } from "../contracts/Tokens"

export const TokensContext = createContext()

export const TokensContextProvider = ({
  token1Address,
  token2Address,
  children,
}) => {
  const token1 = useContract(token1Address, tokensABI)
  const token2 = useContract(token2Address, tokensABI)
  return (
    <TokensContext.Provider value={{ token1, token2 }}>
      {children}
    </TokensContext.Provider>
  )
}
