import { Heading, HStack, Icon, Text, VStack } from "native-base";
import { UserPhoto } from "./UserPhoto";
import { MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity } from "react-native";
import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function HomeHeader() {
  const { logout, user } = useAuth()
  const navigate = useNavigation<AppNavigatorRoutesProps>()

  function handleGoToProfile() {
    navigate.navigate('profile')
  }

  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center"> 
      <TouchableOpacity onPress={handleGoToProfile}>
        <UserPhoto 
          size={14} 
          alt="Imagem do usuário"
          mr={4}
        />
      </TouchableOpacity>
      <VStack flex={1}>
        <Text color="gray.100" fontSize="sm">
          Olá,
        </Text>
        <Heading color="gray.100" fontFamily="heading"  fontSize="lg">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={logout}>
        <Icon  
          as={MaterialIcons}
          name="logout"
          color="gray.200"
          size={7}
        />
      </TouchableOpacity>
    </HStack>
  )
}