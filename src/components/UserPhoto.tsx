import { useAuth } from "@hooks/useAuth";
import { Image, IImageProps } from "native-base";
import defaultUserImg from '@assets/userPhotoDefault.png'
import { api } from "@services/api";
import { useState } from "react";

interface Props extends IImageProps {
  size: number
}

export function UserPhoto({ size, ...rest }: Props) {
  const { user } = useAuth()

  return (
    <Image 
      source={ user.avatar ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` } : defaultUserImg }
      w={size}
      h={size}
      rounded="full"
      borderWidth={2}
      borderColor="gray.400"
      {...rest} 
    />
  )
}