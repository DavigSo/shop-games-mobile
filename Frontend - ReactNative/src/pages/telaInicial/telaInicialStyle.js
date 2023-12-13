import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    position: 'relative', // Adiciona o posicionamento relativo
  },
  containerImage: {
    position: 'absolute', // Define o posicionamento absoluto
    top: 0,
    left: 0,
    width: '100%', // Cobrir toda a largura da tela
    height: '50%',
  },
  button: {
    backgroundColor: '#991F36',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    flexDirection: 'row',
  },
  buttonText: {
    color: '#DDE3F0',
    fontSize: 16,
    marginLeft: 8,
  },
  buttonImage: {
    width: 45,
    height: 45,
  },
  imageSpider: {
    width: '60%',
    height: '50%',
  },
  containerWords: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerFraseOne: {
    color: '#DDE3F0',
    fontSize: 45,
    marginBottom: 25,
    textAlign: 'center',
  },
  containerFraseTwo: {
    color: '#DDE3F0',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
  },
});
