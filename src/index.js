import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import params from './logic/params';
import Title from './components/Title';
import Grid from './components/Grid';

export default () => {
    return(
        <View style={styles.container}>
            <Title></Title>
            <Grid></Grid>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: params.colors.background
    }
})