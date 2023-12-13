// finalizarPedidoStyle.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black', // Cor de fundo preta
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#DDE3F0', // Cor do texto
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#DDE3F0', // Cor do texto
  },
  jogoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#DDE3F0', // Cor do texto
  },
  price: {
    fontSize: 16,
    color: 'green', // ou qualquer cor desejada
    marginBottom: 8,
  },
  quantity: {
    fontSize: 16,
    color: '#DDE3F0',
  },
  resumoContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    paddingTop: 16,
    borderColor: 'red', // Cor da linha de divisão
  },
  resumoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#DDE3F0', // Cor do texto
  },
  resumoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  resumoItemText: {
    fontSize: 16,
    color: '#DDE3F0', // Cor do texto
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#DDE3F0', // Cor do texto
  },
  discountButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  discountButton: {
    padding: 8,
    backgroundColor: '#991F36', // Cor do botão
    borderRadius: 8,
    flex: 0.48, // ajuste conforme necessário
  },
  discountButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  finalizarButton: {
    backgroundColor: '#991F36', // Cor do botão
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  finalizarButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
