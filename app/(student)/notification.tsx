import { getAPI } from "@/utils/api";
import { View, Text, ScrollView, Alert } from "react-native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { localHost } from "@/utils/localhost";
import get from "@/utils/get";
export type Notification={
    id:string,
    title:string,
    content:string,
    createdAt:string,
    type:string,
}
export default function Notification() {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        Alert.alert('Thông báo', 'Đã xảy ra lỗi');
        return;
    }
    const { user, accessToken } = authContext
    const [notification,setNotification]= useState<Notification[]>([])
    const getNotification= async()=>{
        const response = await get({
          url: `${localHost}/api/v1/notification/get`,
          token: accessToken,
        });
        if(response){
            if(response.status==200){
                const data= response.data.notifications
                setNotification(data)
            }
        }
    }
    useEffect(()=>{
        getNotification()
    },[])
  return (
    <View>
      <View className="bg-blue_primary pb-[3.5%]  border-b-[1px] border-gray-200 ">
        <Text className="mx-auto mt-[13%] text-[18px] font-msemibold text-white uppercase">
          Thông báo
        </Text>
      </View>
      <ScrollView>
        {notification.length > 0 ? (
          notification.map((item) => (
            <View className="bg-white px-5 py-3 mt-3">
              <Text className="text-base font-msemibold">{item.title}</Text>
            <Text
              className={`text-base   ${
                item.type == "absent_warning" ? "text-red-500" : "text-gray-600"
              }`}
            >
              {item.content}
            </Text>
            <Text className="text-[12px] text-gray-400 font-light">
              {item.createdAt}
            </Text>
          </View>
        ))
        ) : (
          <View className="flex justify-center items-center mt-4">
            <Text className="text-gray-400">Không có thông báo</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

