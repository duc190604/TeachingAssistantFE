import { View, Text } from "react-native";

export default function Notification() {
  return (
    <View>
      <View className="bg-blue_primary pb-[3.5%]  border-b-[1px] border-gray-200 ">
        <Text className="mx-auto mt-[13%] text-[18px] font-msemibold text-white uppercase">
          Thông báo
        </Text>
      </View>
    </View>
  );
}

