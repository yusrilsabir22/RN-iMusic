import React, { useEffect } from 'react'
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaylist } from '../redux/action';
import { YoutubeReducerState } from '../redux/reducers';
import { SET_ACTIVE_PLAYLIST } from '../redux/types';
import { GlobalProps, ListPlaylist } from '../types'
import { colors } from '../utils/color';
import { SCREEN_HEIGHT, SCREEN_WIDTH, SPACING } from '../utils/screen';

const Playlist: React.FC<GlobalProps> = (props) => {
    const state  = useSelector((state: YoutubeReducerState) => state);
    const dispatch = useDispatch();
    // @ts-ignore
    const navParams: ListPlaylist = props.route.params.data;
    useEffect(() => {
        dispatch(fetchPlaylist(navParams?.playlistId));
    }, [''])
    return (
        <ImageBackground
            source={{
                uri: navParams?.thumbnail,
            }}
            resizeMode="stretch"
            style={styles.container}
        >
            <View style={[StyleSheet.absoluteFill, {backgroundColor: '#000', opacity: 0.7}]} />

            <View style={{ maxHeight: SCREEN_HEIGHT * 0.87}}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={{alignSelf: 'center'}} onPress={() => {props.navigation.goBack()}}>
                        <FontAwesome5Icon name="arrow-left" size={20} color={colors.BLUE.ICON} />
                    </TouchableOpacity>
                    <Text style={styles.headerTxt}>{navParams?.title}</Text>
                    <TouchableOpacity style={styles.button}>
                        <FontAwesome5Icon name="ellipsis-h" size={12} color={colors.BLUE.ICON} />
                    </TouchableOpacity>
                </View>
                {
                    state.loading ?
                    <View style={{flex: 1, marginTop: SCREEN_HEIGHT * 0.5 - 70,justifyContent: 'center', alignContent: 'center'}}>
                        <ActivityIndicator animating color={colors.BLUE.SOFT} size={"large"} />
                    </View>
                    :
                    <View style={styles.contentContainer}>
                        <FlatList
                            data={state.playlist}
                            keyExtractor={(v, i) => i.toString() }
                            style={{marginBottom: SCREEN_HEIGHT * 0.06}}
                            renderItem={({item}) => {
                                return (
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => {
                                            dispatch({type: SET_ACTIVE_PLAYLIST, payload: {data: item, title: navParams?.title}});
                                            props.navigation.navigate('MusicPlayer')
                                        }}>
                                    <View style={{marginTop: 0, padding: SPACING}}>
                                        <Text style={{color: colors.BLACK.FONT, marginLeft: SPACING, marginBottom: SPACING, fontSize: 12}}>{item.owner}</Text>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <View style={{backgroundColor: colors.WHITE.BG, padding: SPACING - 5, flexDirection: 'row', alignItems: 'center', borderRadius: 29, width: '90%'}}>
                                                <Image
                                                    source={{uri: item.thumbnail}}
                                                    style={{width: 36, height: 36, resizeMode: 'cover', borderRadius: 18, left: -14}}
                                                />
                                                <Text style={{color: 'white', fontSize: 12, maxWidth: 230}}>{item.title}</Text>
                                            </View>
                                            <Text style={{color: colors.BLACK.FONT, width: '10%', marginHorizontal: 10, fontSize: 12}}>{item.durationText}</Text>
                                        </View>
                                    </View>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>

                }
            </View>

            {/* <TouchableWithoutFeedback> */}
                <View style={[styles.musicPlayer, {position: 'absolute', bottom: 45, right: 0, left: 0}]}>
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
                    <TouchableOpacity onPress={() => {}}>
                        <FontAwesome5Icon name="pause" size={20} color={colors.WHITE.LIGHT} />
                    </TouchableOpacity>
                </View>
            {/* </TouchableWithoutFeedback> */}
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
    contentContainer: {
        marginTop: SPACING * 2,
        marginHorizontal: SPACING,
    },
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

export default Playlist;
