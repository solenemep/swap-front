import {
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  VStack,
} from "@chakra-ui/react"
import { ethers } from "ethers"
import { useState } from "react"
import { erc20List } from "../erc20"
import { usePoolFactoryContext } from "../hooks/usePoolFactory"

const Pool = () => {
  const { poolFactoryContract } = usePoolFactoryContext()

  // CREATE POOL
  const [token1, setToken1] = useState("")
  const [token2, setToken2] = useState("")
  const [fees, setFees] = useState(0)
  const [isLoadingCreate, setIsLoadingCreate] = useState(false)
  const handleCreatePool = async () => {
    try {
      setIsLoadingCreate(true)
      const feesBN = ethers.BigNumber.from(fees.toString())
      const tx = await poolFactoryContract.create(token1, token2, feesBN)
      await tx.wait()
      console.log("TX MINED")
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoadingCreate(false)
    }
  }
  return (
    <VStack
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={8}
      py={24}
      px={32}
    >
      <Heading>Create Pool</Heading>
      <Select
        placeholder="token 1"
        onChange={(e) => {
          setToken1(e.target.value)
        }}
      >
        {erc20List.map((token) => {
          return (
            <option key={token} value={token}>
              {token}
            </option>
          )
        })}
      </Select>
      <Select
        placeholder="token 2"
        onChange={(e) => {
          setToken2(e.target.value)
        }}
      >
        {erc20List.map((token) => {
          return (
            <option key={token} value={token}>
              {token}
            </option>
          )
        })}
      </Select>
      <InputGroup>
        <InputLeftAddon children="fees" />
        <Input
          placeholder="fees"
          value={fees === 0 ? "" : fees}
          onChange={(e) => {
            setFees(e.target.value)
          }}
        />
        <InputRightAddon children="%" />
      </InputGroup>
      <Button
        isFullWidth
        onClick={handleCreatePool}
        isLoading={isLoadingCreate}
      >
        Create Pool
      </Button>
    </VStack>
  )
}
export default Pool
