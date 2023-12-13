import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    color: '#DDE3F0',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  purchaseItem: {
    marginRight: 16,
  },
  purchaseCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    borderColor: '#991F36', // Adicionando cor da borda
    borderWidth: 2, // Adicionando largura da borda
  },
  card: {
    flexDirection: 'row',
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  cardDetails: {
    flex: 1,
    padding: 10,
  },
  cardName: {
    fontSize: 18,
    color: '#DDE3F0',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  cardPrice: {
    fontSize: 16,
    color: '#DDE3F0',
  },
  purchaseDetails: {
    padding: 10,
  },
  quantity: {
    fontSize: 14,
    color: '#DDE3F0',
  },
  deliveryDate: {
    fontSize: 14,
    color: '#DDE3F0',
    marginBottom: 4,
  },
  deliveryStatus: {
    fontSize: 14,
    color: '#DDE3F0',
  },
  backButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#991F36',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#DDE3F0',
    fontWeight: 'bold',
  },
});
