import {
  Button,
  HStack,
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

const LiquidityBis = ({ poolAddress, token1, token2 }) => {
  const { poolContract } = usePoolContext()
  const { token1Contract, token2Contract } = useTokensContext()
  const [token, setToken] = useState()

  const [tokenSymbol, setTokenSymbol] = useState("")

  const [amountTKN, setAmountTKN] = useState(0)
  const [amountLP, setAmountLP] = useState(0)

  useEffect(() => {
    const getSymbol = async () => {
      try {
        let symbol = ""
        if (token === token1) {
          symbol = await token1Contract.symbol()
        } else if (token === token2) {
          symbol = await token2Contract.symbol()
        }
        setTokenSymbol(symbol)
      } catch (e) {
        console.log(e)
      }
    }
    getSymbol()
  }, [token, token1, token1Contract, token2, token2Contract])

  // APPROVE POOL ADDRESS
  const [isLoadingApprove, setIsLoadingApprove] = useState(false)
  const handleApprove = async () => {
    try {
      setIsLoadingApprove(true)
      const tx1 = await token1Contract.approve(
        poolAddress,
        ethers.BigNumber.from("100000000000000000000000000000")
      )
      const tx2 = await token2Contract.approve(
        poolAddress,
        ethers.BigNumber.from("100000000000000000000000000000")
      )
      await tx1.wait()
      await tx2.wait()
      console.log("TX MINED")
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoadingApprove(false)
    }
  }

  // ADD LIQUIDITY
  const [isLoadingAdd, setIsLoadingAdd] = useState(false)
  const handleAddLiquidity = async () => {
    try {
      setIsLoadingAdd(true)
      const amountTKNBN = ethers.utils.parseEther(amountTKN)
      let tx
      if (token === token1) {
        tx = await poolContract.depositLiquidity(0, amountTKNBN)
      } else if (token === token2) {
        tx = await poolContract.depositLiquidity(1, amountTKNBN)
      }
      await tx.wait()
      console.log("TX MINED")
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoadingAdd(false)
    }
  }

  // REMOVE LIQUIDITY
  const [isLoadingRemove, setIsLoadingRemove] = useState(false)
  const handleRemoveLiquidity = async () => {
    try {
      setIsLoadingRemove(true)
      const amountLPBN = ethers.utils.parseEther(amountLP)
      let tx
      if (token === token1) {
        tx = await poolContract.removeLiquidity(0, amountLPBN)
      } else if (token === token2) {
        tx = await poolContract.removeLiquidity(1, amountLPBN)
      }
      await tx.wait()
      console.log("TX MINED")
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoadingRemove(false)
    }
  }

  return (
    <Fragment>
      <Button isFullWidth onClick={handleApprove} isLoading={isLoadingApprove}>
        Approve pool address
      </Button>
      <Select
        placeholder="token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      >
        <option value={token1}>{token1}</option>
        <option value={token2}>{token2}</option>
      </Select>
      <HStack width={"100%"}>
        <InputGroup>
          <InputLeftAddon children="amount TKN" />
          <Input
            placeholder="amount TKN"
            value={amountTKN === 0 ? "" : amountTKN}
            onChange={(e) => setAmountTKN(e.target.value)}
          />
          <InputRightAddon children={tokenSymbol} />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="amount LP" />
          <Input
            placeholder="amount LP"
            value={amountLP === 0 ? "" : amountLP}
            onChange={(e) => setAmountLP(e.target.value)}
          />
          <InputRightAddon children="LP" />
        </InputGroup>
      </HStack>

      <HStack width={"100%"}>
        <Button
          width={"100%"}
          onClick={handleAddLiquidity}
          isLoading={isLoadingAdd}
        >
          Add Liquidity
        </Button>
        <Button
          width={"100%"}
          onClick={handleRemoveLiquidity}
          isLoading={isLoadingRemove}
        >
          Remove Liquidity
        </Button>
      </HStack>
    </Fragment>
  )
}
export default LiquidityBis
