import { useContext } from "react"
import { PoolFactoryContext } from "../contexts/PoolFactoryContext"

export const usePoolFactoryContext = () => {
  const context = useContext(PoolFactoryContext)
  if (context === undefined) {
    throw new Error(
      `It seems that you are trying to use PoolFactoryContext outside of its provider`
    )
  }
  return context
}
