import { HistoryCard } from "@components/HistoryCard";
import { Loading } from "@components/Loading";
import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { Box, Heading, SectionList, Text, useToast, VStack } from "native-base";
import { useCallback, useState } from "react";

export function History() {
  const toast = useToast()

  const [isLoading, setIsLoading] = useState(true)
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([])

  async function fetchHistory() {
    try {

      setIsLoading(true)

      const { data } = await api.get('/history')
      setExercises(data)
      
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possivel carregar o historico'

      toast.show({
        title,
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchHistory()
  }, []))

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />
      {isLoading ?
        <Loading />
        :
        <SectionList
          sections={exercises}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <HistoryCard history={item} />
          )}
          renderSectionHeader={({ section }) => (
            <Box flex="1" bgColor="gray.700">
              <Heading fontFamily="heading" color="gray.200" fontSize="md" mt={10} mb={3}>
                {section.title}
              </Heading>
            </Box>
          )}
          px={8}
          contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: 'center'}}
          ListEmptyComponent={() => (
            <Text color="gray.100" textAlign="center">
              Não há exercícios registrados ainda. {'\n'}
              Vamos fazer exercícios hoje?
            </Text>
          )}
        />
      }
    </VStack>
  )
}