import { Heading, HStack, Image, Text, VStack, Icon } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from '@expo/vector-icons'
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { api } from "@services/api";

interface Props extends TouchableOpacityProps {
  exercise: ExerciseDTO
}

export function ExerciseCard({ exercise, ...rest }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.7} {...rest}>
      <HStack bg="gray.500" alignItems="center" p={2} pr={4} rounded="md" mb={3}>
        <Image
          source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${exercise.thumb}` }}
          alt="Imagem treino"
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="cover"
        />
        <VStack flex={1}>
          <Heading fontFamily="heading" color="white" fontSize="lg">
            {exercise?.name}
          </Heading>
          <Text color="gray.200" fontSize="sm" mt={1} numberOfLines={2}>
            {`${exercise.series} séries x ${exercise.repetitions} repetições`}
          </Text>
        </VStack>
        <Icon
          as={Entypo}
          name="chevron-thin-right"
          color="gray.300"
        />
      </HStack>
    </TouchableOpacity>
  )
}