import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
type Props = {content:string,
  handle:()=>void,
  otherStyle?:string,
  icon?:any
}

export default function ButtonCustom({content, handle,otherStyle,icon}: Props) {
  return (
    <TouchableOpacity className={`bg-blue_primary rounded-3xl ml-auto mr-auto w-[85%] p-[10px] ${otherStyle}  `} onPress={handle} >
      <View className={`items-center rounded-3xl flex-row justify-center`}>
        {icon}
        <Text className="text-[16px] text-white font-msemibold ">{content}</Text>
      </View>
    </TouchableOpacity>
    
  )
}