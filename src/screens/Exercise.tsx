import { Box, Heading, HStack, Icon, Image, ScrollView, Text, useToast, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from "@react-navigation/native";
import BobySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { useEffect, useState } from "react";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";

interface RouteParamsProps {
  exerciseId: string;
}

export function Exercise() {
  const navigate = useNavigation<AppNavigatorRoutesProps>()
  const toast = useToast()
  const route = useRoute()
  const { exerciseId } = route.params as RouteParamsProps
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)
  const [isLoading, setIsLoading] = useState(true)
  const [sendingRegister, setSendingRegister] = useState(false)

  function handleGoBack() {
    navigate.goBack()
  }

  async function fetchExerciseDetails() {
    try {

      setIsLoading(true)
      const { data } = await api.get(`/exercises/${exerciseId}`)
      setExercise(data)

    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possivel carregar os detalhes do exercicio'

      toast.show({
        title,
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleExerciseHistoryRegister() {
    try {

      setSendingRegister(true)

      await api.post('/history', { exercise_id: exerciseId })
      
      toast.show({
        title: 'Parabéns, exercício registrado no seu historico',
        bgColor: 'green.700'
      })

      navigate.navigate('history')

    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possivel registrar o exercicio'

      toast.show({
        title,
        bgColor: 'red.500'
      })
    } finally {
      setSendingRegister(false)
    }
  }

  useEffect(() => {
    fetchExerciseDetails()
  }, [exerciseId])

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon
            as={Feather}
            name="arrow-left"
            color="green.500"
            size={6}
          />
        </TouchableOpacity>

        <HStack justifyContent="space-between" mt={4} mb={8} alignItems="center">
          <Heading color="gray.100" fontSize="lg" fontFamily="heading"  flexShrink={1}>
            {exercise.name}
          </Heading>

          <HStack alignItems="center">
            <BobySvg />
            <Text color="gray.200" ml={1} textTransform="capitalize">
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView>
        {isLoading ?
          <Loading />
          :
          <VStack p={8}>
            <Box mb={3} rounded="lg" overflow="hidden">
              <Image 
                w="full"
                h={80}
                source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}` }}
                alt="Exercicio"
                resizeMode="cover"
              />
            </Box>

            <Box rounded="md" bg="gray.600" pb={4} px={4}>
              <HStack alignItems="center" justifyContent="space-around" mb={6} mt={5}>
                <HStack>
                  <SeriesSvg />
                  <Text color="gray.200" ml={2}>
                    {exercise.series} séries
                  </Text>
                </HStack>
                <HStack>
                  <RepetitionsSvg />
                  <Text color="gray.200" ml={2}>
                    {exercise.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>

              <Button 
                title="Marcar como realizado" 
                isLoading={sendingRegister}
                onPress={handleExerciseHistoryRegister}
              />
            </Box>
          </VStack>  
        }
      </ScrollView>
    </VStack>
  )
}