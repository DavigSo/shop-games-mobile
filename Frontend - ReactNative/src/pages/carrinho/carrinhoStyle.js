import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');
const baseWidth = 360;
const baseHeight = 740;

const scale = (size) => (width / baseWidth) * size;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center', // Centraliza os elementos no eixo horizontal
    padding: 10,
  },
  carrinhoContainer: {
    position: 'absolute', // Torna a imagem do carrinho absoluta
    top: '50%', // Centraliza verticalmente
    left: '50%', // Centraliza horizontalmente
    transform: [{ translateX: -100 }, { translateY: -100 }], // Ajusta a posição
  },
  carrinhoImage: {
    width: 200, // Largura desejada
    height: 200, // Altura desejada
  },
  jogoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'rgba(221, 227, 240, 0.1)',
    borderRadius: 5,
    borderBottomWidth: 1,
    borderColor: '#991F36',
    borderWidth: 1,
    width: '88%', // Ocupa a largura total da tela
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#DDE3F0', // Texto branco
  },
  price: {
    fontSize: 16,
    color: '#DDE3F0', // Texto branco
    marginTop: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#DDE3F0', // Texto branco
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  finalizarButton: {
    backgroundColor: '#991F36',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  finalizarButtonText: {
    color: '#DDE3F0',
    fontWeight: 'bold',
  },
  continuarComprandoButton: {
    backgroundColor: '#991F36',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    flex: 1,
  },
  continuarComprandoButtonText: {
    color: '#DDE3F0',
    fontWeight: 'bold',
  },
  resumoContainer: {
    backgroundColor: '#991F36',
    borderRadius: 8,
    padding: 10,
    margin: 20,
  },

  resumoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#DDE3F0',
  },

  resumoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  resumoItemText: {
    color: '#DDE3F0',
  },

  totalPrice: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  quantity: {
    color: '#DDE3F0',
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContent: {
    backgroundColor: 'rgba(221, 227, 240, 0.1)',
    padding: scale(20),
    borderRadius: scale(10),
    borderWidth: scale(1),
    borderColor: '#991F36',
  },
  popupText: {
    color: '#fff',
    fontSize: scale(16),
  },
});
