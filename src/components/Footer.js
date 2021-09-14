import {
  Button,
  HStack,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { ethers } from "ethers"
import { useState } from "react"
import { useWeb3 } from "web3-hooks"

const Footer = () => {
  const [web3State] = useWeb3()
  const [value, setValue] = useState(0)

  const handleClickDonate = async () => {
    const amount = ethers.utils.parseEther(value)
    try {
      const tx = await web3State.signer.sendTransaction({
        to: "0x1016b9010cA7b7DD875a7A5031355Ab79FB248cf",
        value: amount,
      })
      await tx.wait()
      console.log("TX MINED")
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <HStack
      height={16}
      p={4}
      justifyContent={"space-between"}
      alignItems={"center"}
      bg={useColorModeValue("pink.50", "gray.900")}
    >
      <Text>by Solène</Text>
      <HStack spacing={4}>
        <Input
          value={value === 0 ? "" : value}
          size={"sm"}
          width={24}
          id="value"
          placeholder="amount"
          bg={useColorModeValue("white", "gray.800")}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button size={"sm"} onClick={handleClickDonate}>
          Donate
        </Button>
      </HStack>
    </HStack>
  )
}
export default Footer
