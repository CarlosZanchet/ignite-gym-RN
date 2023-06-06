import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import * as ImagePicker from 'expo-image-picker'
import { Center, Heading, KeyboardAvoidingView, ScrollView, Skeleton, Text, useToast, VStack } from "native-base";
import { useState } from "react";
import { Alert, Platform, TouchableOpacity } from "react-native";
import * as FileSystem from 'expo-file-system' 

const PHOTO_SIZE = 33;

export function Profile() {
  const toast = useToast()

  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/carloszanchet.png')

  async function handleUserPhotoSelect() {
    try {
      setPhotoIsLoading(true)
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })
  
      if(photoSelected.canceled) {
        return 
      }

      const uri = photoSelected.assets[0].uri

      if(uri) {
        const photoInfo = await FileSystem.getInfoAsync(uri)

        if(photoInfo.exists && (photoInfo.size / 1024 / 1024 ) > 1) {
          return toast.show({
            title: 'Essa imagem é muito grande, escolha uma de até 5MB',
            bgColor: 'red.500'
          })
        }

        setUserPhoto(uri)
      }
  
      
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
            <Center mt={6} px={10}>
              {photoIsLoading ?
                <Skeleton 
                  w={PHOTO_SIZE}
                  h={PHOTO_SIZE} 
                  rounded="full"
                  startColor="gray.500"
                  endColor="gray.600"
                />
              :
                <UserPhoto 
                  alt="Foto do usuario"
                  size={PHOTO_SIZE}
                />
              }
              <TouchableOpacity onPress={handleUserPhotoSelect}>
                <Text color="green.500" fontFamily="heading" fontSize="md" mt={3} mb={8}>
                  Alterar Foto
                </Text>
              </TouchableOpacity>


              <Input 
                placeholder="Nome"
                bg="gray.600"
              />
              
              <Input 
                placeholder="E-mail"
                isDisabled
                bg="gray.600"
              />
            </Center>
            
            <VStack px={10} mt={12} mb={9}>
              <Heading fontFamily="heading" color="gray.200" fontSize="md" mb={2}>
                Alterar Senha
              </Heading>

              <Input 
                bg="gray.600"
                secureTextEntry
                placeholder="Senha antiga"
              />
              <Input 
                bg="gray.600"
                secureTextEntry
                placeholder="Nova senha"
              />
              <Input 
                bg="gray.600"
                secureTextEntry
                placeholder="Confirme a nova senha"
              />
              <Button
                title="Atualizar"
              />
            </VStack>
          </ScrollView>
        </KeyboardAvoidingView>
    </VStack>
  )
}