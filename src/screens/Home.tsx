import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { FlatList, Heading, HStack, Text, VStack } from "native-base";
import { useState } from "react";

export function Home() {
  const navigate = useNavigation<AppNavigatorRoutesProps>()

  const [groups, setGroups] = useState(['Costas', 'Ombro', 'Peito', 'Biceps', 'Tríceps'])
  const [exercises, setExercises] = useState(['Supino', 'Remada Unilateral', 'Puxada Frontal', 'Leg-press'])
  const [groupSelected, setGroupSelected] = useState('Costas')

  function handleOpenExerciseDetails() {
    navigate.navigate('exercise')
  }

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

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading">
            Exercícios
          </Heading>
          <Text color="gray.200" fontSize="sm">
            4
          </Text>
        </HStack>

        <FlatList 
          data={exercises}
          keyExtractor={item => item}
          renderItem={item => (
            <ExerciseCard onPress={handleOpenExerciseDetails} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            pb: 20
          }}
        />

      </VStack>
    </VStack>
  )
}