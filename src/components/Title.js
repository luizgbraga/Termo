import React from "react";
import {
    Text,
    StyleSheet
} from 'react-native';

export default () => {
    return(
        <Text style={styles.title}>TERMO</Text>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFFFFF',
        letterSpacing: 6,
        marginBottom: 40
    }
})