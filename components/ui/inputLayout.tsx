import React from 'react'
import {View, Text,TextInput} from 'react-native'

type Props = {title?:string,
    placeHorder?:string,
    style?:string,
    value:string,
    handle:(text: string) => void
}

function InputLayout({title, placeHorder,style,value,handle}: Props) {
  return (
   <View className={`${style} ml-auto mr-auto`}>
    <Text className="text-[16px] font-msemibold text-gray_primary mb-2 ">{title}</Text>
    <View className="border-[1px] rounded-2xl border-gray-300 px-2 py-[6px] bg-white  ">
    <TextInput className="text-[14px] font-mmedium text-gray-800" 
    placeholder={placeHorder}
    value={value}
    onChangeText={handle}
    autoCorrect={false}
    keyboardType='email-address'
    placeholderTextColor="rgba(0, 0, 0, 0.15)"
    secureTextEntry={true} />
    </View>
    
   </View>
  )
}

export default InputLayout