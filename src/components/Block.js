// aqui é o código de UM bloquinho

import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

import params from '../logic/params';

export default (props) => {

    const row = props.row;
    const column = props.column;

    // useState da letra que está no bloquinho
    const [letter, setLetter] = useState('');

    // função que decide qual estilo aplicar com base no props de state passado
    function decideStyle(state) {
        if(state === 'wri') {
            return styles.writable;
        } else if(state === 'dis') {
            return styles.disabled;
        } else if(state === 'gre') {
            return styles.green;
        } else if(state === 'yel') {
            return styles.yellow;
        } else if(state === 'dar') {
            return styles.dark;
        } else if(state === 'sel') {
            return styles.selected;
        }
    }

    // função chamada quando escrevemos no bloquinho
    function handleInput(txt) {
        setLetter(txt.toUpperCase()); // transforma a letra em maiúscula
        txt !== '' ? props.changeSelectedBlock(column + 1) : false; // se o ato não for deletar algo que estava escrito, passa automaticamente pro bloquinho seguinte
        props.changeLetter(txt, column); // muda a letra do bloquinho na array controladora do Grid
    }

    // bloco selecionado
    if(props.style === 'sel') {
        return(
            <TouchableOpacity>
                <View style={decideStyle(props.style)}>
                    <TextInput style={styles.input} maxLength={1} textAlign='center' autoFocus={true}
                        onChangeText={(txt) => handleInput(txt)} onSubmitEditing={() => props.submit()}>
                        <Text style={styles.text}>{letter}</Text>
                    </TextInput>
                </View>
            </TouchableOpacity>
        )

    // bloco da linha atual mas não selecionado
    } else if(props.style === 'wri') {
        return(
            <TouchableOpacity onPress={() => props.changeSelectedBlock(column)}>
                <View style={decideStyle(props.style)}>
                    <Text style={styles.text}>{letter}</Text>
                </View>
            </TouchableOpacity>
        )

    // bloco de linhas que não a atual
    } else {
        return(
            <View style={decideStyle(props.style)}>
                <Text style={styles.text}>{letter}</Text>
            </View>
        )
    }
}

// características compartilhadas por todos os estilos de bloquinho
const regularBlock = {
    width: params.blockSize,
    height: params.blockSize,
    borderRadius: params.blockRadius,
    marginRight: params.margin,
    marginBottom: params.margin,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const styles = StyleSheet.create({
    writable: {
        ...regularBlock,
        borderWidth: params.borderWidth,
        borderColor: params.colors.border,
        backgroundColor: params.colors.writable,

    },

    disabled: {
        ...regularBlock,
        backgroundColor: params.colors.disabled
    },

    green: {
        ...regularBlock,
        backgroundColor: params.colors.green
    },

    yellow: {
        ...regularBlock,
        backgroundColor: params.colors.yellow
    },

    dark: {
        ...regularBlock,
        backgroundColor: params.colors.dark
    },

    selected: {
        ...regularBlock,
        borderWidth: params.borderWidth,
        borderBottomWidth: params.selectedBorderWidth,
        borderColor: params.colors.border,
        backgroundColor: params.colors.writable,
    },

    input: {
        ...regularBlock,
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 24,
    },

    text: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold'
    }
})