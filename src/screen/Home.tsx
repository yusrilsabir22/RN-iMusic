/* eslint-disable react-native/no-inline-styles */
import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image, FlatList, ScrollView,TouchableWithoutFeedback } from 'react-native';
import { GlobalProps } from '../types';
import {colors} from '../utils/color';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { SCREEN_WIDTH, SPACING } from '../utils/screen';
import {useSelector, useDispatch} from 'react-redux'
import { fetchYoutube } from '../redux/action';
import { SET_LOADING } from '../redux/types';

const Home: React.FC<GlobalProps> = (props) => {
    const state: any = useSelector(state => state);
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        dispatch(fetchYoutube());
        // return () => {
        //     []
        // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, ['']);

    return (
        <View style={[styles.container]}>
            <View style={styles.headerContainer}>
                <TouchableHighlight
                    onPress={() => {}}
                    style={{padding: SPACING}}>
                    <FontAwesome5 solid name="bars" color={colors.BLUE.DARK} size={SPACING + 5} />
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => {}}
                    style={styles.imgContainer}>
                    <Image
                        source={{
                            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSWliyP7gW39cCy0bxxFQQLf2l6ANn8kSBeUA&usqp=CAU',
                        }}
                        style={styles.imgHeader}
                    />
                </TouchableHighlight>
            </View>
            <ScrollView>

            <View style={styles.contentContainer}>
                <TouchableHighlight
                    onPress={() => {}}>
                    <View style={styles.searchBarContainer}>
                        <FontAwesome5 name="search" color={colors.WHITE.SOFT} size={19} />
                        <Text style={styles.searchBarText}>Search</Text>
                    </View>
                </TouchableHighlight>
                <FlatList
                    style={{marginVertical: SPACING * 2}}
                    data={state.data}
                    keyExtractor={(v, i) => i.toString()}
                    renderItem={({item}) => {
                        return (
                            <View
                                style={{
                                    marginTop: SPACING * 2,
                                }}>
                                <Text
                                    style={styles.albumTxt}>{item.cardTitle}</Text>
                                <FlatList
                                    horizontal={true}
                                    contentContainerStyle={{paddingHorizontal: SPACING}}
                                    data={item.items}
                                    keyExtractor={(v, i) => i + ''}
                                    renderItem={({item: value}) => {
                                        return (
                                            <TouchableHighlight
                                                onPress={() => {
                                                    dispatch({type: SET_LOADING});
                                                    // @ts-ignore
                                                    props.navigation.navigate('Playlist', {data: value});
                                                }}
                                                >
                                                <View style={styles.albumContainer}>
                                                    <Image
                                                        style={styles.albumImg}
                                                        source={{
                                                            uri: value.thumbnail,
                                                        }}
                                                        />
                                                    {
                                                        value.owner ?
                                                        <>
                                                            <Text style={styles.albumOwner}>{value.owner}</Text>
                                                            <Text style={styles.albumTitle}>{value.title}</Text>
                                                        </> :
                                                        <Text style={styles.albumOwner}>{value.title}</Text>
                                                    }
                                                </View>
                                            </TouchableHighlight>
                                        );
                                    }}
                                />
                            </View>
                        );
                    }}
                />
            </View>
            </ScrollView>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BLUE.PRIMARY,
        color: 'white',
        width: SCREEN_WIDTH,
    },
    contentContainer: {
        width: SCREEN_WIDTH,
        paddingTop: SPACING * 3,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        padding: SPACING,
        alignItems: 'center',
    },
    imgHeader: {
        resizeMode: 'cover',
        width: 30,
        height: 30,
        borderRadius: 15,
        // marginTop: SPACING,
    },
    imgContainer: {
        margin: SPACING,
    },
    searchBarContainer: {
        padding: SPACING,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.WHITE.PRIMARY,
        borderRadius: 20,
        height: 36,
        paddingHorizontal: SPACING * 2,
        marginHorizontal: SPACING,
    },
    searchBarIcon: {
        paddingHorizontal: SPACING,
    },
    searchBarText: {
        color: colors.WHITE.SOFT,
        paddingHorizontal: SPACING,
        fontSize: 15,
    },
    albumContainer: {},
    albumTxt: {
        color: colors.WHITE.LIGHT,
        fontSize: 24,
        fontWeight: 'bold',
        padding: SPACING,
    },
    albumImg: {
        width: 160,
        height: 167,
        resizeMode: 'cover',
        borderRadius: 20,
        marginRight: 20,
    },
    albumOwner: {
        color: colors.WHITE.LIGHT,
        fontSize: 16,
        marginTop: 13,
    },
    albumTitle: {
        color: colors.WHITE.LIGHT,
        opacity: 0.55,
        fontSize: 10,
        marginTop: 4,
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
});

export default Home;
