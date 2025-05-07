import { View, Text, Image } from "react-native";
import { images } from "@/constants/image";

export default function CommentQuestion() {
    return (
      <View className="mt-3 w-[85%] ml-[5%] bg-gray-100 rounded-lg p-2">
        <View className="flex-row items-center">
          <Image
            source={images.avatarDefault}
            className="w-6 h-6 rounded-full"
          />
          <Text className=" text-sm ml-2 font-medium">Ẩn danh 2</Text>
        </View>
        <Text className="text-[15px] ml-2 mt-1">Em vẫn chưa hiểu lắm khúc thấy nói về adapter ấy ạ Lorem ipsum dolor sit, amet consectetur adipisicing elit. A laborum, accusamus pariatur voluptate dolorem est nam odio corporis? Architecto officia modi omnis nulla nisi possimus, iure ut asperiores exercitationem. Expedita.</Text>
      </View>
    );
}
