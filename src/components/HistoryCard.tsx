import { HistoryDTO } from "@dtos/HistoryDTO";
import { Heading, HStack, Icon, Text, VStack } from "native-base";
import { Feather } from '@expo/vector-icons'

interface Props {
  history: HistoryDTO;
}

export function HistoryCard({ history }: Props ) {
  return (
    <HStack w="full" px={5} py={4} mb={3} bg="gray.600" rounded="md" alignItems="center">
      <Icon 
        name="check"
        color="green.600"
        as={Feather}
      />
      <VStack mr={5} flex={1} mx={4}>
        <Heading 
          fontFamily="heading" 
          color="white" 
          fontSize="md" 
          textTransform="capitalize"
          flex={1}
          numberOfLines={1}
        >
          {history.group}
        </Heading>
        <Text color="gray.100" fontSize="lg" numberOfLines={1}>
          {history.name}
        </Text>
      </VStack>
      <Text color="gray.300" fontSize="md">
        {history.hour}
      </Text>
    </HStack>
  )
}