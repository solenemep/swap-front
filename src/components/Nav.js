import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { Box, Button, HStack, Text, useColorMode } from "@chakra-ui/react"
import { useWeb3 } from "web3-hooks"

const Nav = () => {
  const [web3State, login] = useWeb3()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <HStack p={4} justifyContent={"space-between"} alignItems={"center"}>
      <Box>LOGO</Box>
      <Box>NAV POOL STATS</Box>

      {web3State.isLogged ? (
        <HStack spacing={4}>
          {web3State.chainId === 4 ? (
            <Text>Rinkeby</Text>
          ) : (
            <Text>Please connect Rinkeby network</Text>
          )}
          <Text>{web3State.balance}</Text>
          <Text>{web3State.account}</Text>
          <Button aria-label="mode" onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </HStack>
      ) : (
        <HStack spacing={4}>
          <Button aria-label="login" onClick={login}>
            Connect to MetaMask
          </Button>
          <Button aria-label="mode" onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </HStack>
      )}
    </HStack>
  )
}
export default Nav
