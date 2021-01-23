/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player'
import PlayerService from './src/config/PlayerService'

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => PlayerService)