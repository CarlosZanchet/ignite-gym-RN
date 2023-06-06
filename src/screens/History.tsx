import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { Box, Heading, SectionList, Text, VStack } from "native-base";
import { useState } from "react";

export function History() {

  const [exercises, setExercises] = useState([
    {
      title: '26.06.2023',
      data: ['Puxada Frontal1', 'Remada Unilateral2', 'Puxada Frontal3', 'Remada Unilateral4', 'Puxada Frontal5', 'Remada Unilateral6', 'Puxada Frontal7', 'Remada Unilateral8', 'Puxada Frontal9', 'Remada Unilateralsd', 'Puxada Frontal10', 'Remada Unilateraldsd']
    },
    {
      title: '27.06.2023',
      data: ['Puxada F9rontal', 'Co8stas', 'Puxad7a Frontal', 'Remada Unilateral', 'Puxad6a Frontal', 'Remada U5nilateral', 'Puxada 4Frontal', 'Remada 3Unilateral', 'Puxada 2Frontal', 'Remada Unila1teral', 'Puxaxzda Frontal', 'Remada Unilacbteral', 'Puxada Frobntal', 'Remada Unilateralsds']
    }
  ])

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />
      <SectionList
        sections={exercises}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <HistoryCard />
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
    </VStack>
  )
}