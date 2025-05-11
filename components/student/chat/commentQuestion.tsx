import { View, Text, Image, Alert, Modal, TouchableOpacity } from "react-native";
import { images } from "@/constants/image";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";
import { Pressable } from "react-native";
import deleteApi from "@/utils/delete";
import { localHost } from "@/utils/localhost";
import Feather from "@expo/vector-icons/Feather";
import SocketContext from "@/context/SocketContext";
import { formatDate } from "@/utils/formatDate";

type Props = {
  id: string;
  content: string;
  createdAt: string;
  nameAnonymous: string;
  creator: {
    name: string;
    userCode: string;
    role: string;
    avatar: string;
    id: string;
  };
  cAttendId: string;
  handleDeletePost: (Id: string) => void;
};
export default function CommentQuestion({id, content, createdAt, nameAnonymous, creator, cAttendId, handleDeletePost}: Props) {
  const authContext = useContext(AuthContext);
  const socketContext = useContext(SocketContext);
  if (!authContext) {
    return;
  } 
  const {user,accessToken} = authContext;
  const [reactionModalVisible, setReactionModalVisible] = useState(false);
  const deletePost = async () => {
    if (user?.id == creator.id) {
      const res = await deleteApi({
        url: `${localHost}/api/v1/discussion/delete/${id}`,
        token: accessToken,
      });
      if (res) {
        if (res.status == 200) {
          setReactionModalVisible(false);
          Alert.alert("Thành công", "Đã xóa bình luận");
          handleDeletePost(id);
          if (socketContext) {
            const { socket } = socketContext;
            socket.emit("sendDeleteMessage", {
              subjectID: cAttendId,
              messageID: id,
            });
          }
        }
      } else {
        Alert.alert("Thất bại", "Không thể xóa bình luận");
      }
    }
  };
    return (
      <>
        <Pressable
          onLongPress={() => {
            if (user?.id == creator.id) setReactionModalVisible(true);
          }}
          className="mt-3 w-[90%] ml-[5%] bg-gray-100 rounded-lg p-2"
        >
          <View className="flex-row items-center">
            <Image
              source={images.avatarDefault}
              className="w-6 h-6 rounded-full"
            />
            <Text className=" text-sm ml-2 font-medium">{nameAnonymous}</Text>
            <Text className=" text-[12px] ml-2 font-regular text-gray_primary">
              {createdAt}
            </Text>
          </View>
          <Text className="text-[15px] ml-2 mt-1">{content}</Text>
        </Pressable>
        <Modal
          animationType="fade"
          transparent={true}
          visible={reactionModalVisible}
          onRequestClose={() => setReactionModalVisible(false)}
        >
          <TouchableOpacity
            className="flex-1 justify-center items-center"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
            onPress={() => setReactionModalVisible(false)}
          >
            {user?.id == creator.id && (
              <View className="mt-2 bg-white  items-center p-2 rounded-xl">
                <TouchableOpacity onPress={deletePost} className="items-center">
                  <Feather name="trash" size={25} color="red" />
                  <Text className="text-[16px] mt-1">Xóa bình luận</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        </Modal>
      </>
    );
}
