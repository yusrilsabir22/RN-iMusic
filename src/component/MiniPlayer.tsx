import React from 'react'
import { Image, StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../utils/color';
import { SPACING } from '../utils/screen';

const MiniPlayer = (props: any) => {
    return (
        <TouchableWithoutFeedback onPress={() => {props.navigation.navigate('MusicPlayer')}}>
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
