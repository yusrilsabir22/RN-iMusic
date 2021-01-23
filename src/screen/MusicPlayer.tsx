import Slider from '@react-native-community/slider';
import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Animated
} from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import TextScroller from '../component/TextScroller';
import { YoutubeReducerState } from '../redux/reducers';
import { GlobalProps } from '../types';
import { colors } from '../utils/color';
import { SCREEN_WIDTH, SCREEN_HEIGHT, SPACING } from '../utils/screen';
import { dateSecToString, stringToNumber } from '../utils/time';
import TrackPlayer from 'react-native-track-player'
import {useTrackPlayerProgress} from 'react-native-track-player/lib/hooks'

const MusicPlayer: React.FC<GlobalProps> = (props) => {
    const active = useSelector((state: YoutubeReducerState) => state.active);

    const [duration, setDuration] = useState(dateSecToString(0))
    const [currPosition, setCurrPosition] = useState(0)
    const playlistTitle = useSelector((state: YoutubeReducerState) => state.playlistTitle)
    let translate1 = useRef(new Animated.Value(0)).current;
    let translate2 = useRef(new Animated.Value(0)).current;
    const animating = () => {
        Animated.parallel([
            Animated.timing(translate1, {
                toValue: 1,
                duration: active.title.length * 100 + 12000,
                useNativeDriver: true,
            }),
            Animated.timing(translate2, {
                toValue: 1,
                delay: active.title.length * 100 + 3000,
                duration: active.title.length * 100 + 12000,
                useNativeDriver: true
            })
        ]).start((data) => {
            translate1.setValue(0);
            translate2.setValue(0);
            animating()
        })
    }

    const onSlidingComplete = (value: number) => {
        const time = dateSecToString(value)
        setDuration(time)
    }

    const {position, bufferedPosition} = useTrackPlayerProgress()

    const setupPlayer = async () => {
        await TrackPlayer.setupPlayer({})
    }

    const play = async () => {
        await TrackPlayer.add({
            id: active.videoId,
            url: 'http://10.0.2.2:3002/youtube/play?uc='+active.videoId,
            title: active.title,
            artist: active.owner
        });

        await TrackPlayer.play()
    }

    useEffect(() => {
        animating()
        setupPlayer()
        let timeout = setTimeout(() => {
            play()
        }, 500);

        return () => {
            clearTimeout(timeout)
        }
    }, [''])

    return (
        <ImageBackground
            source={{
                uri: active.thumbnail || '',
            }}
            resizeMode="stretch"
            style={styles.container}
        >
            <View style={[StyleSheet.absoluteFill, {backgroundColor: '#000', opacity: 0.7}]} />
            <View style={styles.headerContainer}>
                <TouchableOpacity style={{alignSelf: 'center'}} onPress={() => {props.navigation.goBack()}}>
                    <FontAwesome5Icon name="arrow-left" size={20} color={colors.BLUE.ICON} />
                </TouchableOpacity>
                <Text style={styles.headerTxt}>{playlistTitle}</Text>
                <TouchableOpacity style={styles.button}>
                    <FontAwesome5Icon name="ellipsis-h" size={12} color={colors.BLUE.ICON} />
                </TouchableOpacity>
            </View>
            <View style={{height: SCREEN_HEIGHT * 0.7, padding: SPACING * 2}}>
                <View style={{height: '100%', padding: SPACING}}>
                    <ScrollView style={{height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 24}}>
                        <Text style={{fontSize: 17, color: 'white', alignSelf: 'center', marginTop: SPACING, marginBottom: SPACING * 2}}>Lyrics</Text>
                        <Text style={{padding: 5, color: 'white'}}>Ada Apa denganmu</Text>
                        <Text style={{padding: 5, color: 'white'}}>Kutanya malam, dapatkah kau lihat perbedaan...</Text>
                        <Text style={{padding: 5, color: colors.BLUE.SOFT}}>yang tak terlupakan, tapi mengapa</Text>
                        <Text style={{padding: 5, color: 'white'}}>kau tak berubah</Text>
                        <Text style={{padding: 5, color: 'white'}}>Ada apa denganmu...</Text>
                        <Text style={{padding: 5, color: 'white'}}>Tanya Malam, dapatkah kau lihat perbedaan</Text>
                        <Text style={{padding: 5, color: 'white'}}>kau tak berubah</Text>
                        <Text style={{padding: 5, color: 'white'}}>Ada apa denganmu...</Text>
                        <Text style={{padding: 5, color: 'white'}}>Tanya Malam, dapatkah kau lihat perbedaan</Text>
                        <Text style={{padding: 5, color: 'white'}}>kau tak berubah</Text>
                        <Text style={{padding: 5, color: 'white'}}>Ada apa denganmu...</Text>
                        <Text style={{padding: 5, color: 'white'}}>Tanya Malam, dapatkah kau lihat perbedaan</Text>
                        <Text style={{padding: 5, color: 'white'}}>kau tak berubah</Text>
                        <Text style={{padding: 5, color: 'white'}}>Ada apa denganmu...</Text>
                        <Text style={{padding: 5, color: 'white'}}>Tanya Malam, dapatkah kau lihat perbedaan</Text>
                    </ScrollView>
                    <View style={{marginTop: SPACING * 2}}>
                        <Text style={{fontSize: 20, letterSpacing: 1, color: 'white', fontWeight: 'bold'}}>{active.owner}</Text>
                        <TextScroller text={active.title} delay={0} duration={(active.title.length % 52) * 1000} />
                    </View>
                </View>
            </View>
            <View
                style={styles.seekBarContainer}
            >
                <Text style={{color: '#FFF'}}>{dateSecToString(position)}</Text>
                <Slider
                    maximumValue={stringToNumber(active.durationText)}
                    minimumValue={0}
                    thumbTintColor={colors.WHITE.LIGHT}
                    minimumTrackTintColor={colors.BLUE.SOFT}
                    maximumTrackTintColor={colors.BLUE.SOFT}
                    style={styles.seekBar}
                    value={position}
                    onSlidingComplete={onSlidingComplete}
                />
                <Text style={{color: '#FFF'}}>{dateSecToString(stringToNumber(active.durationText))}</Text>
            </View>
            <View
                style={styles.controlContainer}
            >
                <TouchableWithoutFeedback>
                    <FontAwesome5Icon name="backward" color={colors.WHITE.LIGHT} size={32} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <FontAwesome5Icon name="play" color={colors.WHITE.LIGHT} size={38} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <FontAwesome5Icon name="forward" color={colors.WHITE.LIGHT} size={32} />
                </TouchableWithoutFeedback>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        resizeMode: 'contain',
        // padding: SPACING,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SPACING + 20,
        marginHorizontal: SPACING * 2,
    },
    headerTxt: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white',
        maxWidth: 270,
        textAlign: 'center'
    },
    button: {
        borderColor: colors.BLUE.ICON,
        borderWidth: 1,
        borderRadius: 140,
        alignSelf: 'center',
        padding: 5,
    },
    controlContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: SPACING * 2,
        marginVertical: SPACING * 2,
        paddingHorizontal: SPACING * 2
    },
    seekBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: SPACING * 2,
        paddingHorizontal: SPACING * 2
    },
    seekBar: {
        width: '78%',
    }
})

export default MusicPlayer;
