import React, { useState } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import fiveLetters from '../logic/dictionary';
import Block from './Block';

export default () => {

    // molde de criação de um bloquinho
    class BlockModel {
        constructor(row, column, state, letter, id) {
            this.row = row;
            this.column = column;
            this.state = state;
            this.letter = letter;
            this.key = id;
        }
    }

    /*

    o Grid, na realidade, é uma matriz. é uma array de 6 linhas (rows) e cada array dessas tem
    5 bloquinhos. criamos essa array sendo os bloquinhos objetos instanciados a partir da classe 
    BlockModel, acima. depois, fazemos um .map nessa matriz (array) e mapeamos cada OBJETO bloquinho
    para um COMPONENTE <Block></Block>, passando seus props a partir das características desse objeto.

    a ideia é que, quando escrevermos algo, ou dermos submit, ou mudarmos o bloquinho selecionado, essa
    matriz seja mapeada para a outra matriz modificada com o que fizemos. e, em seguida, essa nova matriz 
    sofre o mesmo mapeamento para um componente Block. a ideia é modificar ESSA MATRIZ sempre, por isso 
    ela será criada com useState.

    */

    const blocks = [];
    const rows = [];

    const [selectedRow, setSelectedRow] = useState(0);
    const [selectedColumn, setSelectedColumn] = useState(0);

    // criação da matriz inicial padrão
    for(let i = 0; i < 6; i++) {
        rows.push({ row: i, key: i });
        blocks.push([]);
        for(let j = 0; j < 5; j++) {
            if(i === selectedRow) {
                if(j === selectedColumn) {
                    let newBlock = new BlockModel(i, j, 'sel', '', String(i) + String(j));
                    blocks[i].push(newBlock); 
                } else {
                    let newBlock = new BlockModel(i, j, 'wri', '', String(i) + String(j));
                    blocks[i].push(newBlock);
                }
            } else {
                let newBlock = new BlockModel(i, j, 'dis', '', String(i) + String(j));
                blocks[i].push(newBlock);
            }
        }
    }

    // matriz
    const [gridBlocks, setGridBlocks] = useState(blocks);
    
    // palavra aleatória
    const [randomWord, setRandomWord] = useState(fiveLetters[Math.floor(Math.random() * fiveLetters.length)]);

    // muda o bloquinho selecionado da linha atual (ao ser clicado)
    function changeSelectedBlock(column) {
        setSelectedColumn(column);
        let newGridBlocks = gridBlocks.map(function(val, index) {
            if(index === selectedRow) {
                for(let el of val) {
                    el.state === 'sel' ? el.state = 'wri' : 
                    el.column === column ? el.state = 'sel' : false
                }
                return val;
            } else return val;
        });

        setGridBlocks(newGridBlocks);
    }

    // muda a letra de um bloquinho da linha selecionada (deve ser o bloquinho selecionado também)
    function changeLetter(letter, column) {
        let newGridBlocks = gridBlocks.map(function(val, index) {
            if(index === selectedRow) {
                for(let el of val) {
                    el.column === column ? el.letter = letter : false
                }
                return val;
            } else return val;
        })

        setGridBlocks(newGridBlocks)
    }

    // forma a palavra da linha atual até o que foi preenchido
    function formWord() {
        let word = '';
        for(let el of gridBlocks[selectedRow]) {
            word = word + el.letter;
        }
        return word;
    }

    // função que é chamada quando tentamos dar um OK no teclado
    // só submita de verdade se todos os bloquinhos foram preenchidos com alguma letra
    function submit() {
        let word = formWord();
        if(word.length === 5 && fiveLetters.includes(word)) {
            let newGridBlocks = gridBlocks.map(function(val, index) {
                if(index === selectedRow) {
                    for(let el of val) {
                        randomWord.includes(el.letter) ? randomWord[el.column] === el.letter ? 
                        el.state = 'gre' : el.state = 'yel' : el.state = 'dar'
                    }
                    return val;
                } else if(index === selectedRow + 1 && word !== randomWord) {
                    for(let el of val) {
                        el.state = 'wri'
                    }
                    return val;
                } else return val;
            })

            word === randomWord ? console.warn('Parabéns!') : false;
            
            setGridBlocks(newGridBlocks);
            setSelectedRow(selectedRow + 1);

            selectedRow === 5 ? console.warn(`A palavra era ${randomWord}`) : false
        }
    }

    return(
        <View>
            {
                rows.map(function(val) {
                    return(
                        <View style={styles.row} key={val.key}>
                            {
                                gridBlocks[val.row].map(function(item) {
                                    return(
                                        <Block
                                            key={item.key}
                                            style={item.state} 
                                            row={item.row} 
                                            column={item.column}
                                            changeSelectedBlock={changeSelectedBlock}
                                            changeLetter={changeLetter}
                                            submit={submit}></Block>
                                    )
                                })
                            }
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({ 
    row: {
        display: 'flex',
        flexDirection: 'row'
    }
})