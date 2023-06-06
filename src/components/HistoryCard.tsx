import { Heading, HStack, Text, VStack } from "native-base";

export function HistoryCard() {
  return (
    <HStack justifyContent="space-between" w="full" px={5} py={4} mb={3} bg="gray.600" rounded="md" alignItems="center">
      <VStack mr={5}>
        <Heading 
          fontFamily="heading" 
          color="white" 
          fontSize="md" 
          textTransform="capitalize"
          flex={1}
          numberOfLines={1}
        >
          Costas
        </Heading>
        <Text color="gray.100" fontSize="lg" numberOfLines={1}>
          Puxada Frontal
        </Text>
      </VStack>
      <Text color="gray.300" fontSize="md">
        08:00
      </Text>
    </HStack>
  )
}