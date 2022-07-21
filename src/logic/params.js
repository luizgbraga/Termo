// todos os parâmetros do jogo

import { Dimensions } from "react-native";

const totalWidth = Dimensions.get('window').width; // largura da tela (reponsividade!)

const params = {
    blockSize: 0.112 * totalWidth,
    blockRadius: 3.6,
    borderWidth: 3,
    selectedBorderWidth: 6,
    margin: 3,
    colors: {
        background: '#6e5c62',
        writable: '#6e5c62',
        disabled: '#615458',
        border: '#4c4347',
        green: '#3aa394',
        yellow: '#d3ad69',
        dark: '#312a2c',
    }
}

export default params;