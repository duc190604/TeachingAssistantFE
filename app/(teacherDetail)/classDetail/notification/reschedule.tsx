import { SafeAreaView, View, TouchableOpacity, Text, Modal,  } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

type Props = {};

export default function ReSchedule({}: Props) {
  const { code, subjectId } = useLocalSearchParams();
  const [openModal, setOpenModal] = React.useState(false);
  return (
    <SafeAreaView>
        <Modal
        animationType="fade"
        transparent={true}
        visible={openModal}
        onRequestClose={() => setOpenModal(false)}
        >
        <TouchableOpacity
            className="flex-1 justify-center items-center"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
            onPress={() => setOpenModal(false)}
        >
            <View className="items-center ">
                <Text className="text-center text-gray-600">Text</Text>
                <Text className="text-blue_primary underline"></Text>
            </View>
            <View className="flex-row items-center gap-3 mt-2">
                
            </View>
        </TouchableOpacity>
        </Modal>
        <View className=" shadow-md  pb-[1.5%] bg-blue_primary flex-row  pt-[12%] px-[4%] items-center ">
        <TouchableOpacity onPress={router.back}>
          <Ionicons name="chevron-back-sharp" size={24} color="white" />
        </TouchableOpacity>
        <View className="mx-auto items-center pr-6">
          <Text className="text-[18px] font-msemibold uppercase text-white">
            {code}
          </Text>
          <Text className="mt-[-3px] text-white font-mmedium">Thông báo học bù</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}