import React, { useState } from 'react'
import { View, Text, Animated,  } from 'react-native'
import { useSpring, animated } from 'react-spring/native'
import { SCREEN_WIDTH, SPACING } from '../utils/screen';

type Props = {
    text: String;
    delay: number;
    duration: number; // default 6000 (6s)
}
const TextScroller:React.FC<Props> = (props) => {
    const AnimatedView = animated(View);
    // First Time Component get mounted
    const [mounted, setMounted] = useState(false)
    const [key, setKey] = useState(1);
    // const scrolling = useSpring({
    //     config: {
    //         duration: !mounted ? (props.duration * 0.5) : props.duration * 0.8,
    //     },
    //     from: {
    //         translateX: !mounted ? (SPACING * 2  - 25): SCREEN_WIDTH
    //     },
    //     to: {
    //        translateX: !mounted ? -props.text.length - 100 : -SCREEN_WIDTH
    //     },
    //     reset: true,
    //     onRest: (ds) => {
    //         setKey(key+1)
    //         // This is the not mounted anymore
    //         setMounted(true)
    //     },
    // });


    return (
        <View key={key} style={{width: SCREEN_WIDTH * 2}}>
            <Text
                    style={{color: '#FFF'}}
                ></Text>
            {/* @ts-ignore */}
            {/* <AnimatedView
                style={{
                    ...scrolling,
                    width: SCREEN_WIDTH * 2
                }}
            >
                <Text
                    style={{color: '#FFF'}}
                >
                    {props.text}
                </Text>
            </AnimatedView> */}
        </View>
    )
}

export default TextScroller