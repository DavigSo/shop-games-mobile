import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  containerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '50%',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  divider: {
    width: 2,
    height: 50,
    backgroundColor: '#991F36',
    marginHorizontal: 10,
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  loginTitle: {
    fontSize: 24,
    color: '#DDE3F0',
  },
  input: {
    backgroundColor: 'rgba(221, 227, 240, 0.1)',
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#991F36', // Alterado para vermelho
    borderWidth: 2, // Alterado para espessura 2
  },
  button: {
    backgroundColor: '#991F36',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#DDE3F0',
    fontSize: 16,
  },
  registerButton: {
    color: '#DDE3F0',
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButtonText: {
    color: '#991F36',
    fontSize: 15,
  },
});
