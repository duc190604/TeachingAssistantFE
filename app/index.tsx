import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'
import  { useState, useEffect, useRef,useContext } from 'react';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native'
import { AuthContext } from '@/context/AuthContext';
type Props = {}
type AppMessage = {
    data: {
        type: string;
        subject?: string;
        room?: string;
        sender?: string;
    };
    notification: {
        title: string;
        body?: string;
    };
}
export default function index(){
    const authContext = useContext(AuthContext);
    if(!authContext)
        return;
    const {addFCMToken, user}= authContext;
    useEffect(() => {
        const handleNotification = async () => {
            messaging().getInitialNotification().then(async (remoteMessage) => {
                if (remoteMessage) {
                    console.log('From quit state');
                    remoteMessage.notification
                }
            });   
            messaging().onNotificationOpenedApp((remoteMessage)=>{
                console.log('Open from background state');
                remoteMessage.notification
            })
            messaging().setBackgroundMessageHandler(async (remoteMessage) => {
                console.log('Message handled in the background!', remoteMessage);
            });
            messaging().onMessage(async (remoteMessage) => {
                console.log('Message handled in the foreground!', remoteMessage);
                if(authContext?.user?.role=='student')
                    if(remoteMessage.data?.type=='attendance' && remoteMessage.data?.sender!=user?.id)
                    {
                        Alert.alert('Điểm danh ngay', `Môn học: ${remoteMessage.data?.subject}\nPhòng: ${remoteMessage.data?.room}`);
                        return;
                    }
                    else
                        if(remoteMessage.data?.type!='message' && remoteMessage.data?.sender!=user?.id)
                        {
                            Alert.alert(`${remoteMessage.notification?.title}`, remoteMessage.notification?.body);
                            return;
                        }
                    if(remoteMessage.data?.type=='cross-grading' && remoteMessage.data?.sender!=user?.id)
                    {
                        Alert.alert(`${remoteMessage.notification?.title}`, remoteMessage.notification?.body);
                        return;
                    }
                
            });
            
        };
        const requestUserPermission = async () => {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;
            if (enabled) {
                console.log('Authorization status:', authStatus);
                const token = await messaging().getToken();
               addFCMToken(token);
            }
        }
          requestUserPermission();
          handleNotification();
    }, [])
    return <Redirect href='/(auth)/sign-in'/>
}