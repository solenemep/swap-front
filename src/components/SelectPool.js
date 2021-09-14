import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
} from "@chakra-ui/react"
import { Fragment, useState } from "react"
import { erc20List } from "../erc20"
import { usePoolFactoryContext } from "../hooks/usePoolFactory"

const SelectPool = ({
  poolAddress,
  setPoolAddress,
  token1,
  setToken1,
  token2,
  setToken2,
  fees,
  setFees,
}) => {
  const { poolFactoryContract } = usePoolFactoryContext()

  // SEARCH POOL
  const [isLoadingSearch, setIsLoadingSearch] = useState(false)
  const handleSearchPool = async () => {
    try {
      setIsLoadingSearch(true)
      const poolAddress = await poolFactoryContract.getPoolAddressByInfo(
        token1,
        token2,
        fees
      )
      setPoolAddress(poolAddress)
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoadingSearch(false)
    }
  }

  return (
    <Fragment>
      <Select placeholder="token 1" onChange={(e) => setToken1(e.target.value)}>
        {erc20List.map((token) => {
          return (
            <option key={token} value={token}>
              {token}
            </option>
          )
        })}
      </Select>
      <Select placeholder="token 2" onChange={(e) => setToken2(e.target.value)}>
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
        onClick={handleSearchPool}
        isLoading={isLoadingSearch}
      >
        Search Pool
      </Button>
      <InputGroup>
        <InputLeftAddon children="pool address" />
        <Input placeholder="pool address" value={poolAddress} disabled />
      </InputGroup>
    </Fragment>
  )
}
export default SelectPool
