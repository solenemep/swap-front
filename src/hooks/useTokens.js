import { useContext } from "react"
import { TokensContext } from "../contexts/TokensContext"

export const useTokensContext = () => {
  const context = useContext(TokensContext)
  if (context === undefined) {
    throw new Error(
      `It seems that you are trying to use TokensContext outside of its provider`
    )
  }
  return context
}
