import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import {
  Button,
  ButtonGroup,
  HStack,
  Tag,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import { useWeb3 } from "web3-hooks"

const Nav = ({ choice, setChoice }) => {
  const [web3State, login] = useWeb3()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <HStack
      p={4}
      justifyContent={"space-between"}
      alignItems={"center"}
      bg={useColorModeValue("pink.50", "gray.900")}
    >
      <ButtonGroup spacing={4}>
        <Button
          size={"sm"}
          aria-label="pool"
          value="pool"
          onClick={(e) => setChoice(e.target.value)}
          disabled={choice === "pool"}
        >
          Pool
        </Button>
        <Button
          size={"sm"}
          aria-label="stats"
          value="stats"
          onClick={(e) => setChoice(e.target.value)}
          disabled={choice === "stats"}
        >
          Stats
        </Button>
      </ButtonGroup>

      {web3State.isLogged ? (
        <HStack spacing={4}>
          {web3State.chainId === 4 ? (
            <Tag size={"lg"} colorScheme="yellow">
              Rinkeby
            </Tag>
          ) : (
            <Tag size={"lg"} colorScheme="red">
              Please connect Rinkeby network
            </Tag>
          )}
          <Tag size={"lg"}>{Math.round(web3State.balance * 100) / 100} ETH</Tag>
          <Tag size={"lg"}>
            {web3State.account.split("").slice(0, 6)}...
            {web3State.account.split("").slice(-4)}
          </Tag>
          <Button size={"sm"} aria-label="mode" onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </HStack>
      ) : (
        <HStack spacing={4}>
          <Button size={"sm"} aria-label="login" onClick={login}>
            Connect to MetaMask
          </Button>
          <Button size={"sm"} aria-label="mode" onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </HStack>
      )}
    </HStack>
  )
}
export default Nav
