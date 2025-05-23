import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native'
import { colors } from '@/constants/colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { icons } from '@/constants/icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TeacherLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
       
        headerShown: false,
        tabBarStyle: { height: 55 },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="timetable"
        options={{
          title: 'TKB',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <>
              <View >
                <FontAwesome name="calendar" size={24} color={focused ? colors.blue_primary: colors.gray_primary} style={{marginLeft:'auto'}}/>
                <Text className="text-gray_primary ml-auto mr-auto text-xs" style={{color: focused ? colors.blue_primary : colors.gray_primary,}}>TKB</Text>
              </View>
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="teach"
        options={{
          title: 'Giảng dạy',
          tabBarIcon: ({ color, focused }) => (
            <>
              <View >
              <MaterialIcons name="class" size={24} color={focused ? colors.blue_primary: colors.gray_primary} style={{marginRight:'auto', marginLeft:'auto'}} />
              <Text className="text-gray_primary ml-auto mr-auto text-xs" style={{color: focused ? colors.blue_primary : colors.gray_primary,}}>Lớp học</Text>
              </View>
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Thông báo",
          tabBarIcon: ({ color, focused }) => (
            <>
              <View>
                <Ionicons
                  name="notifications-sharp"
                  size={24}
                  color={focused ? colors.blue_primary : colors.gray_primary}
                  style={{ marginRight: "auto", marginLeft: "auto" }}
                />
                <Text
                  className="text-gray_primary ml-auto mr-auto text-xs"
                  style={{
                    color: focused ? colors.blue_primary : colors.gray_primary,
                  }}
                >
                  Thông báo
                </Text>
              </View>
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Cá nhân',
          tabBarIcon: ({ color, focused }) => (
            <>
              <View >
              <Ionicons name="person-circle-outline" size={30} color={focused ? colors.blue_primary: colors.gray_primary} style={{marginRight:'auto', marginLeft:'auto'}} />
              <Text className="text-gray_primary ml-auto mr-auto text-xs mt-[-1]" style={{color: focused ? colors.blue_primary : colors.gray_primary,}}>Cá nhân</Text>
              </View>
            </>
          ),
        }}
      />
      
    </Tabs>
  );
}
