import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { Small, Original } from './style';

const OriginalAnimated = Animated.createAnimatedComponent(Original);

export default LazyImage = ({
    shouldLoad, 
    smallSource, 
    source
}) => {

    const opacity = new Animated.Value(0);
    const [loaded, setLoaded] = useState(false);
    
    const handleAnimate = () => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    useEffect(()=>{
        if(shouldLoad){
            setLoaded(true);
        }
    }, [shouldLoad]);

    return (
        <Small 
            source={smallSource} 
            blurRadius={2}
        >
            { loaded && <OriginalAnimated 
                source={source} 
                onLoadEnd={handleAnimate}
            /> }
        </Small>
    );
}