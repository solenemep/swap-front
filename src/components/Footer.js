import { HStack, Text, useColorModeValue } from "@chakra-ui/react"

const Footer = () => {
  return (
    <HStack
      p={4}
      justifyContent={"center"}
      alignItems={"center"}
      bg={useColorModeValue("pink.50", "gray.900")}
    >
      <Text>by Solène</Text>
    </HStack>
  )
}
export default Footer
