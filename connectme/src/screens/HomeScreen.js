import { View, Text, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import HeaderLogoGeneral from '../components/HeaderLogoGeneral';
import ChatGroups from './ChatGroups';
// import {socket} from '../socket-service/socket';
const HomeScreen = (props) => {
    return (
        <View>
            <HeaderLogoGeneral />
            <Text
                style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: '1%', marginBottom: '1%'}}
            >Your Channels</Text>
            {/* 
                Connect Me! Groups
            */}
            <ChatGroups />
        </View>
    );
};

export default HomeScreen