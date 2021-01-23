import React from 'react';
import { View, Text } from 'react-native';
import {GlobalProps} from '../types';

const Search: React.FC<GlobalProps> = (props) => {
    console.log(props);
    return (
        <View>
            <Text>Search</Text>
        </View>
    );
};

export default Search;
