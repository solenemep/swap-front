import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
} from "@chakra-ui/react"
import { Fragment, useEffect, useState } from "react"
import { useTokensContext } from "../hooks/useTokens"
import { usePoolContext } from "../hooks/usePool"
import { ethers } from "ethers"

const SwapBis = ({ token1, token2 }) => {
  const { poolContract } = usePoolContext()
  const { token1Contract, token2Contract } = useTokensContext()

  const [tokenIn, setTokenIn] = useState({})
  let tokenOut = tokenIn === token1 ? token2 : token1

  const [tokenInSymbol, setTokenInSymbol] = useState("")
  const [tokenOutSymbol, setTokenOutSymbol] = useState("")

  const [amountIn, setAmountIn] = useState(0)
  const [amountOut, setAmountOut] = useState(0)

  useEffect(() => {
    const getSymbols = async () => {
      try {
        let symbolIn = ""
        let symbolOut = ""
        if (tokenIn === token1) {
          symbolIn = await token1Contract.symbol()
          symbolOut = await token2Contract.symbol()
        } else if (tokenIn === token2) {
          symbolIn = await token2Contract.symbol()
          symbolOut = await token1Contract.symbol()
        }
        setTokenInSymbol(symbolIn)
        setTokenOutSymbol(symbolOut)
      } catch (e) {
        console.log(e)
      }
    }
    getSymbols()
  }, [tokenIn, tokenOut, token1, token1Contract, token2, token2Contract])

  useEffect(() => {
    const getAmountOut = async () => {
      try {
        let amountOut = 0
        if (tokenIn === token1) {
          amountOut = await poolContract.getAmountOut(
            token1Contract,
            token2Contract,
            amountIn
          )
        } else if (tokenIn === token2) {
          amountOut = await poolContract.getAmountOut(
            token2Contract,
            token1Contract,
            amountIn
          )
        }
        setAmountOut(amountOut.toString())
      } catch (e) {
        console.log(e)
      }
    }
    getAmountOut()
  }, [
    tokenIn,
    tokenOut,
    amountIn,
    poolContract,
    token1,
    token1Contract,
    token2,
    token2Contract,
  ])

  // SWAP
  const [isLoadingSwap, setIsLoadingSwap] = useState(false)
  const handleSwap = async () => {
    try {
      setIsLoadingSwap(true)
      const amountInBN = ethers.utils.parseEther(amountIn)
      const tx = await poolContract.swap(tokenIn, amountInBN)
      await tx.wait()
      console.log("TX MINED")
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoadingSwap(false)
    }
  }

  return (
    <Fragment>
      <Select
        placeholder="token in"
        value={tokenIn}
        onChange={(e) => setTokenIn(e.target.value)}
      >
        <option value={token1}>{token1}</option>
        <option value={token2}>{token2}</option>
      </Select>
      <InputGroup>
        <InputLeftAddon children="amount in" />
        <Input
          placeholder="amount in"
          value={amountIn === 0 ? "" : amountIn}
          onChange={(e) => setAmountIn(e.target.value)}
        />
        <InputRightAddon children={tokenInSymbol} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon children="token out" />
        <Input placeholder="token out" value={tokenOut} disabled />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon children="amount out" />
        <Input
          placeholder="amount out"
          value={amountOut === 0 ? "" : amountOut}
          disabled
        />
        <InputRightAddon children={tokenOutSymbol} />
      </InputGroup>
      <Button isFullWidth onClick={handleSwap} isLoading={isLoadingSwap}>
        Swap
      </Button>
    </Fragment>
  )
}
export default SwapBis