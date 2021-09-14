import { createContext } from "react"
import { useContract } from "web3-hooks"
import { tokensABI } from "../contracts/Tokens"

export const TokensContext = createContext()

export const TokensContextProvider = ({
  token1Address,
  token2Address,
  children,
}) => {
  const token1Contract = useContract(token1Address, tokensABI)
  const token2Contract = useContract(token2Address, tokensABI)
  return (
    <TokensContext.Provider value={{ token1Contract, token2Contract }}>
      {children}
    </TokensContext.Provider>
  )
}
