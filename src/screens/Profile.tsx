import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import * as ImagePicker from 'expo-image-picker'
import { Center, Heading, KeyboardAvoidingView, ScrollView, Skeleton, Text, useToast, VStack } from "native-base";
import { useState } from "react";
import { Platform, TouchableOpacity } from "react-native";
import * as FileSystem from 'expo-file-system' 
import { Controller, useForm } from 'react-hook-form'
import { useAuth } from "@hooks/useAuth";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

const PHOTO_SIZE = 33;

interface FormDataProps {
  name: string;
  email: string;
  password: string;
  old_password: string;
  confirm_password: string;
}

const profileSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres.').nullable().transform((value) => !!value  ? value : null),
  confirm_password: yup
                    .string()
                    .nullable()
                    .transform((value) => !!value  ? value : null)
                    .oneOf([yup.ref('password')], 'A confirmação de senha não confere')
                    .when('password', {
                      is: (Field: any) => Field,
                      then: (schema) => schema.nullable().required('Informe a confirmação da senha.').transform((value) => !!value  ? value : null),
                    })
})

export function Profile() {
  const { user, updateUserProfile } = useAuth()
  const toast = useToast()

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email
    },
    resolver: yupResolver(profileSchema)
  })

  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/carloszanchet.png')
  const [isUpdating, setIsUpdating] = useState(false)

  async function handleProfileUpdate(data: FormDataProps) {
   try {

    setIsUpdating(true)

    const userUpdated = user
    userUpdated.name = data.name

    await api.put('/users', data)

    await updateUserProfile(userUpdated)

    toast.show({
      title: 'Perfil atualizado com sucesso',
      bg: 'green.500'
    })

   } catch (error) {
    const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possivel atualizar o perfil, tente novamente mais tarde'

      toast.show({
        title,
        bgColor: 'red.500'
      })
   } finally {
    setIsUpdating(false)
   }
  } 

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

      const photo = photoSelected.assets[0]

      if(photo.uri) {
        const photoInfo = await FileSystem.getInfoAsync(photo.uri)

        if(photoInfo.exists && (photoInfo.size / 1024 / 1024 ) > 4) {
          return toast.show({
            title: 'Essa imagem é muito grande, escolha uma de até 5MB',
            bgColor: 'red.500'
          })
        }

        const fileExtension = photo.uri.split('.').pop()
        const photoFile = {
          name: `${user.name}.${fileExtension}`.toLowerCase(),
          uri: photo.uri,
          type: `${photo.type}/${fileExtension}`
        } as any

        const userPhotoUploadForm = new FormData()
        userPhotoUploadForm.append('avatar', photoFile)

        const avatarUpdatedResponse = await api.patch('/users/avatar', userPhotoUploadForm, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })


        const userUpdated = user;
        userUpdated.avatar = avatarUpdatedResponse.data.avatar
        updateUserProfile(userUpdated)

        toast.show({
          title: 'Foto atualizada com sucesso',
          bgColor: 'green.500'
        })
      }
  
      
    } catch (error) {
      console.log("error upload foto => ", error)
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

              <Controller 
                control={control}
                name="name"
                render={({ field: { value, onChange} }) => (
                  <Input 
                    placeholder="Nome"
                    bg="gray.600"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.name?.message}
                  />
                )}
              />

              <Controller 
                control={control}
                name="email"
                render={({ field: { value } }) => (
                  <Input 
                    placeholder="E-mail"
                    bg="gray.600"
                    isDisabled
                    value={value}
                  />
                )}
              />

            </Center>
            
            <VStack px={10} mt={12} mb={9}>
              <Heading fontFamily="heading" color="gray.200" fontSize="md" mb={2}>
                Alterar Senha
              </Heading>

              <Controller 
                control={control}
                name="old_password"
                render={({ field: { onChange } }) => (
                  <Input 
                    bg="gray.600"
                    onChangeText={onChange}
                    secureTextEntry
                    placeholder="Senha antiga"
                  />
                )}
              />

              <Controller 
                control={control}
                name="password"
                render={({ field: { onChange } }) => (
                  <Input 
                    bg="gray.600"
                    onChangeText={onChange}
                    secureTextEntry
                    placeholder="Nova senha"
                    errorMessage={errors.password?.message}
                  />
                )}
              />

              <Controller 
                control={control}
                name="confirm_password"
                render={({ field: { onChange } }) => (
                  <Input 
                    bg="gray.600"
                    onChangeText={onChange}
                    secureTextEntry
                    placeholder="Confirme a nova senha"
                    errorMessage={errors.confirm_password?.message}
                  />
                )}
              />

              <Button
                title="Atualizar"
                onPress={handleSubmit(handleProfileUpdate)}
                isLoading={isUpdating}
              />
            </VStack>
          </ScrollView>
        </KeyboardAvoidingView>
    </VStack>
  )
}