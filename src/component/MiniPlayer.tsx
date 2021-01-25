import React, { useLayoutEffect, useRef } from 'react'
import { Animated, Image, StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import { YoutubeReducerState } from '../redux/reducers';
import { PlayerScreen } from '../types';
import { colors } from '../utils/color';
import { SCREEN_WIDTH, SPACING } from '../utils/screen';

type Props = {
    mode?: PlayerScreen
}

const MiniPlayer: React.FC<Props> = (props) => {
    const animatedValue = useRef(new Animated.Value(0)).current
    const mode = useSelector((state: YoutubeReducerState) => state.player)
    const active = useSelector((state: YoutubeReducerState) => state.active)
    const modeShow = () => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start()
    }

    const modeReset = () => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
        })
    }

    useLayoutEffect(() => {
        if(active) {
            modeShow()
        } else if(active == null) {
            modeReset()
        }
    }, [props])

    return (
        <Animated.View
            style={{
                position: 'absolute',
                width: SCREEN_WIDTH,
                height: 'auto',
                backgroundColor: colors.BLACK.PRIMARY,
                bottom: 0,
                transform: [
                    {
                        translateY: animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [300, 0]
                        })
                    }
                ]
            }}
        >
            <TouchableWithoutFeedback onPress={() => {}}>
                    <View style={styles.musicPlayer}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image
                                style={[styles.musicPlayerImg]}
                                source={{
                                    uri: 'https://i.ytimg.com/vi/WqbNilpQIY0/maxresdefault.jpg',
                                }}
                            />
                            <View style={{marginHorizontal: SPACING}}>
                                <Text
                                    style={{
                                        margin: 0,
                                        padding: 0,
                                        fontSize: 16,
                                        color: colors.WHITE.LIGHT,
                                    }}>Aaron Smith</Text>
                                <Text
                                    style={{
                                        margin: 0,
                                        padding: 0,
                                        fontSize: 10,
                                        color: colors.WHITE.LIGHT,
                                        opacity: 0.55,
                                    }}>Dancing</Text>
                            </View>
                        </View>
                        <TouchableHighlight onPress={() => {}}>
                            <FontAwesome5 name="pause" size={20} color={colors.WHITE.LIGHT} />
                        </TouchableHighlight>
                    </View>
                </TouchableWithoutFeedback>
            </Animated.View>
    )
}

export default MiniPlayer

const styles = StyleSheet.create({
    musicPlayer: {
        backgroundColor: colors.BLACK.PRIMARY,
        paddingHorizontal: SPACING * 2,
        paddingVertical: SPACING,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    musicPlayerImg: {
        resizeMode: 'cover',
        width: 35,
        height: 35,
        borderRadius: 17.5,
    },
})
