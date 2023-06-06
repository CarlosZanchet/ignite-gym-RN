import { Heading, HStack, Icon, Text, VStack } from "native-base";
import { UserPhoto } from "./UserPhoto";
import { MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity } from "react-native";
import { useAuth } from "@hooks/useAuth";
import defaultUserImg from '@assets/userPhotoDefault.png'

export function HomeHeader() {
  const { logout, user } = useAuth()

  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center"> 
      <UserPhoto 
        size={16} 
        alt="Imamgem do usuário"
        mr={4}
      />
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