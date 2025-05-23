import {useState} from 'react'
import {Text, View, SafeAreaView,TouchableOpacity,ScrollView,Image, Alert} from 'react-native'
import InputLayout from '@/components/ui/inputLayout'
import ButtonCustom from '@/components/ui/ButtonCustom'
import { Link, useGlobalSearchParams } from 'expo-router'
import { Picker } from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker';
import { images } from '@/constants/image'
import { useRouter } from 'expo-router'
import { localHost } from '@/utils/localhost'
import postNoAuth from '@/utils/postNoAuth'
import Loading from '@/components/ui/Loading'

type Props = {
    email:string,
    pass:string
}

export default function RegisInfo({}: Props) {
    const {  } =useGlobalSearchParams();
    const [loading, setLoading] = useState(false)
    // const [pass, setPass] = useState('')
    const [visible, setVisible] = useState(true)
    const [image, setImage] = useState<string | null>(null);
    const router = useRouter();
    const [info,setInfo]=useState({
      name:"",
      userCode:"",
      school:"",
      avatar:"",
      role:"student",
      email:""
  })
    
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setInfo({...info,avatar:result.assets[0].uri})
    }
  };
  
    const signUp = async () => {
      if(info.name=='' || info.school=='' || info.userCode=='' || info.email=='')
      {
        Alert.alert('Thông báo','Vui lòng nhập đủ thông tin để tiếp tục')
      }
      else
      {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(info.email)) {
          Alert.alert("Thông báo", "Email không hợp lệ");
          return;
        }
        setLoading(true);
        const url = `${localHost}/api/v1/service/verifyEmail`;
        const res = await postNoAuth({
          url: url,
          data: { email: info.email }
        });
        if (res && res.status === 200) {
          const jsonInfo= JSON.stringify(info)
          router.push({
            pathname: '/(auth)/sign-up/verify', 
            params: {
                jsonInfo,
                email: info.email 
            }
          });
        }
        else
        {
          Alert.alert("Thông báo",res?.data.message || "Đã xảy ra lỗi, vui lòng thử lại sau");
        }
        setLoading(false);
      }
      
    }
    const loginGoogle=()=>{

    }
    
  return (
    <SafeAreaView className='bg-white flex-1'>
      <Loading loading={loading} />
        <ScrollView className="relative">
            <View>
                <Text className="text-blue_primary text-[28px] font-msemibold mt-[15%] ml-[7.5%]">Đăng kí thông tin</Text>
                <TouchableOpacity onPress={pickImage}>
                    <View className="mx-auto rounded-full  border-gray-400 border-[1px] self-start mt-[10%]">
                    <Image className="overflow-hidden w-20 h-20 rounded-full"  resizeMode="cover"  source={image ? { uri: image } : images.avatarDefault}></Image>
                </View>
                </TouchableOpacity>
                <InputLayout
                  style='w-[85%] mt-[3%]'
                  title='Email'
                  placeHorder='example@gmail.com'
                  value={info.email}
                  handle={e => {
                    setInfo({...info,email:e});
                  }}/>
                <InputLayout style='w-[85%] mt-[5%]'
                    title='Họ và tên'
                    placeHorder='Nguyễn Văn A'
                    value={info.name}
                    handle={(e) => setInfo({...info,name:e})} />
                <View className={` ml-auto mr-auto w-[85%] mt-4 pb-1`}>
                  <Text className="text-[16px] font-msemibold text-gray_primary mb-2 ml-0">Vai trò</Text>
                  <View className="border-[1.2px] rounded-2xl border-gray-400 justify-center  ">
                    <Picker style={{ height: 43,color:'#1F2937'}}
                    className="text-xs"
                    selectedValue={info.role}
                    onValueChange={(a)=>setInfo({...info,role:a})} >
                      <Picker.Item label="Sinh viên" value="student" />
                      <Picker.Item label="Giảng viên" value="teacher" />
                    </Picker>
                  </View>
                </View>
                <InputLayout style='w-[85%] mt-[3%]'
                  title={info.role=="student" ? "Mã số sinh viên":"Mã số giảng viên"}
                  placeHorder='22520266'
                  value={info.userCode}
                  handle={(e) => setInfo({...info,userCode:e})} />
                <InputLayout style='w-[85%] mt-[3%]'
                  title='Tên trường'
                  placeHorder='Đại học Công nghệ thông tin'
                  value={info.school}
                  handle={(e) => setInfo({...info,school:e})} />
                
                <ButtonCustom content="Tiếp tục" handle={signUp} otherStyle="w-[85%] mt-[5%]"/>
            </View>
            
            <View className="flex-row mx-auto mt-[6%]">
                <Text>Đã có tài khoản ?</Text>
                <Link href="/sign-in">
                    <Text className="ml-3 text-sm font-mbold first-letter"> Đăng nhập</Text>
                </Link>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}