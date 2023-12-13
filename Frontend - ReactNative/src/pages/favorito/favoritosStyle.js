import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');
const baseWidth = 360;
const baseHeight = 740;

const scale = (size) => (width / baseWidth) * size;


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  jogoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#474747', // Fundo cinza claro
    borderRadius: 8,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#FFFFFF', // Texto preto
  },
  price: {
    fontSize: 16,
    color: '#666666', // Texto cinza escuro
    marginTop: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF', 
    textAlign: 'center',
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
