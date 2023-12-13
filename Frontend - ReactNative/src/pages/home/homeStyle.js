import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const baseWidth = 360;
const baseHeight = 740;

const scale = (size) => (width / baseWidth) * size;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  userImage: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    borderColor: '#991F36',
    borderWidth: scale(3),
    backgroundColor: '#000',
  },
  userInfo: {
    marginLeft: scale(20),
  },
  userName: {
    fontSize: scale(20),
    fontWeight: 'bold',
    color: '#DDE3F0',
  },
  userQuote: {
    fontSize: scale(16),
    marginTop: scale(10),
    color: '#DDE3F0',
  },
  sectionTitle: {
    fontSize: scale(20),
    fontWeight: 'bold',
    margin: scale(20),
    color: '#DDE3F0',
    backgroundColor: '#000',
  },
  gameItem: {
    flexDirection: 'row',
    backgroundColor: '#000',
    borderRadius: scale(5),
    margin: scale(10),
    padding: scale(10),
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    borderBottomWidth: scale(2),
    borderBottomColor: 'rgba(198, 13, 13, 1)',
  },
  gameImage: {
    width: scale(100),
    height: scale(100),
    resizeMode: 'cover',
    borderRadius: scale(5),
    backgroundColor: '#000',
  },
  gameDetails: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  gameInfo: {
    flex: 1,
    marginLeft: scale(10),
  },
  gameName: {
    fontSize: scale(15),
    fontWeight: 'bold',
    color: '#DDE3F0',
  },
  gamePrice: {
    fontSize: scale(16),
    color: '#DDE3F0',
  },
  addToFavoriteButton: {
	backgroundColor: '#991F36',
    borderRadius: scale(5),
    padding: scale(5),
    position: 'relative',
    top: scale(30),
  },
  addToCartButton: {
    backgroundColor: '#991F36',
    borderRadius: scale(5),
    padding: scale(5),
    position: 'relative',
    top: scale(30),
  },
  addToCartButtonText: {
    color: '#DDE3F0',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: scale(10),
    margin: scale(10),
  },
  button: {
    backgroundColor: '#991F36',
    padding: scale(10), // Ajuste o tamanho do padding para melhorar a proporção
    borderRadius: scale(10),
    alignItems: 'center',
    borderColor: '#DDE3F0',
    borderWidth: scale(1),
    marginTop: scale(10), // Adicione um marginTop para melhor espaçamento
  },
  buttonText: {
    color: '#DDE3F0',
    alignItems: 'center',
    fontSize: scale(10),
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
  chatButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'blue', 
    padding: 10,
    borderRadius: 5,
  },
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 30,
  },
  addToFavoriteButton: {
    backgroundColor: '#991F36',
      borderRadius: scale(5),
      padding: scale(5),
      position: 'relative',
      top: scale(30),
    },
});
