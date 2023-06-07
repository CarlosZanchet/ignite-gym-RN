import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { Loading } from "@components/Loading";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { FlatList, Heading, HStack, Text, useToast, VStack } from "native-base";
import { useCallback, useEffect, useState } from "react";

export function Home() {
  const navigate = useNavigation<AppNavigatorRoutesProps>()
  const toast = useToast()

  const [groups, setGroups] = useState<string[]>([])
  const [exercises, setExercises] = useState<ExerciseDTO[]>([])
  const [groupSelected, setGroupSelected] = useState('antebraço')
  const [isLoading, setIsLoading] = useState(true)

  function handleOpenExerciseDetails(exerciseId: string) {
    navigate.navigate('exercise', { exerciseId })
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/exercises/bygroup/${groupSelected}`)
      setExercises(data)

    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possivel carregar os exercicios'

      toast.show({
        title,
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchGroups() {
    try {
      
      const { data } = await api.get('/groups')
      setGroups(data)

    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possivel carregar os grupos musculares'

      toast.show({
        title,
        bgColor: 'red.500'
      })
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  useFocusEffect(useCallback(() => {
    fetchExercisesByGroup()
  }, [groupSelected]))

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8}}
        my={8}
        maxH={10}
        minH={10}

        renderItem={({ item }) => (
          <Group 
            name={item}
            isActive={groupSelected.toUpperCase() === item.toUpperCase()} 
            onPress={() => setGroupSelected(item)}
          />
        )}
      />

      {isLoading ?
        <Loading />
      :
        <VStack flex={1} px={8}>
          <HStack justifyContent="space-between" mb={5}>
            <Heading color="gray.200" fontSize="md" fontFamily="heading">
              Exercícios
            </Heading>
            <Text color="gray.200" fontSize="sm">
              {exercises.length}
            </Text>
          </HStack>

          <FlatList 
            data={exercises}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ExerciseCard 
                onPress={() => handleOpenExerciseDetails(item.id)}
                exercise={item}
              />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{
              pb: 20
            }}
          />

        </VStack>
      }
    </VStack>
  )
}