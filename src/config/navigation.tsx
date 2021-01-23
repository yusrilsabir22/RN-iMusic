import React from 'react';

import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import Home from '../screen/Home';
import MusicPlayer from '../screen/MusicPlayer';
import Search from '../screen/Search';
import Playlist from '../screen/Playlist';
import { RouteProp } from '@react-navigation/native';
import { View } from 'react-native';
import MiniPlayer from '../component/MiniPlayer';

type MainStackNavigation = {
    Home: undefined,
    Search: undefined,
    MusicPlayer: undefined,
    Playlist: undefined,
    Modal: undefined
}

type RootStackNavigation = {
    Main: MainStackNavigation,
    Modal: undefined
}

export type MainScreenNavigationProp = StackNavigationProp<MainStackNavigation, 'Home'>;
export type MainScreenRouteProps = RouteProp<MainStackNavigation, 'Home'>
const Stack = createStackNavigator<MainStackNavigation>();
const RootStack = createStackNavigator<RootStackNavigation>()

// @ts-ignore
export const StackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            headerMode="none"
            mode="modal"
            screenOptions={{animationEnabled: false}}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="MusicPlayer" component={MusicPlayer} />
            <Stack.Screen name="Playlist" component={Playlist} />
            <Stack.Screen name="Modal" component={MusicPlayer} options={{animationEnabled: true}}/>
        </Stack.Navigator>
    );
};

export const RootStackNavigator = () => {
    return(
        <RootStack.Navigator mode="modal">
            <RootStack.Screen name="Main" component={StackNavigator} />
            <RootStack.Screen name="Modal" component={MusicPlayer}/>
        </RootStack.Navigator>
    )
}