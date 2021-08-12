import { useContext } from "react"
import { PoolContext } from "../contexts/PoolContext"

export const usePoolContext = () => {
  const context = useContext(PoolContext)
  if (context === undefined) {
    throw new Error(
      `It seems that you are trying to use PoolContext outside of its provider`
    )
  }
  return context
}
