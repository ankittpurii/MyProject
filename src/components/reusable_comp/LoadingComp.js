import React from 'react'
import {
    View,
    ActivityIndicator
} from 'react-native'
import config from '../../Utils/Config'

export default LoadingComp = () => {
    return (
        <View style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
        }}>
            <View style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                backgroundColor: 'black',
                opacity: 0.3
            }} />
            <ActivityIndicator color={config.colors.THEME_COLOR} size="large" />
        </View>
    )
}