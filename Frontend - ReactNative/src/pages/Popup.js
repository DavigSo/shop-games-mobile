import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserIdFromAsyncStorage = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    return userId;
  } catch (error) {
    console.error(
      'Erro ao obter o ID do usuário do armazenamento local:',
      error,
    );
    return null;
  }
};

const Pagamento = ({ route, navigation }) => {
  const [codigoPix, setCodigoPix] = useState('');
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await getUserIdFromAsyncStorage();
        setUserId(id);
      } catch (error) {
        console.error('Erro ao obter o ID do usuário:', error);
      }
    };

    fetchUserId();
  }, []);

  const handlePagarViaPix = async () => {
    try {
      setError(null);
      setSuccess(false);

      const codigoPixGerado =
        '00020126330014BR.GOV.BCB.PIX0111+55124354465204000053039865802BR590412356004125462070503***6304FC8F';
      setCodigoPix(codigoPixGerado);

      if (!userId) {
        console.error('ID do usuário não definido.');
        return;
      }

      console.log('Fazendo solicitação finalizar o pedido:', {
        userId,
      });

      const requestData = {
        userId,
      };
      console.log(requestData);

      const response = await axios.post(
        'http://10.5.0.166:8000/api/order/finalizeCurrentOrder/',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200) {
        console.log('Pedido finalizado com sucesso.');
        setSuccess(true);
        // Exibir o pop-up de sucesso
        Alert.alert('Sucesso', 'Pagamento finalizado com sucesso!');
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      setError('Erro de conexão. Verifique sua conexão com a internet.');
      console.error('Erro ao finalizar o pedido:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVoltarParaHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finalizar Compra</Text>

      <TouchableOpacity
        style={styles.finalizarButton}
        onPress={handlePagarViaPix}
        disabled={loading}
      >
        <Text style={styles.finalizarButtonText}>Pagar Via Pix</Text>
      </TouchableOpacity>

      {loading && (
        <Text style={styles.loadingText}>Finalizando o pedido...</Text>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {success && (
        <Text style={styles.successText}>Pedido finalizado com sucesso!</Text>
      )}

      <Text style={styles.codigoPix}>{codigoPix}</Text>

      <TouchableOpacity
        style={styles.voltarButton}
        onPress={handleVoltarParaHome}
      >
        <Text style={styles.voltarButtonText}>Voltar à Home</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos do componente
const styles = StyleSheet.create({
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  popupContent: {
    backgroundColor: '#bdc3c7',
    padding: 20,
    borderRadius: 10,
    borderColor: '#c0392b',
    borderWidth: 2,
    alignItems: 'center',
    elevation: 5,
  },
  popupText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#34495e',
  },
  buttonContainer: {
    marginTop: 15, // Adicionando um espaçamento entre o texto e o botão
  },
  closeButton: {
    backgroundColor: '#c0392b',
    padding: 10,
    borderRadius: 5,
  },
  redButton: {
    backgroundColor: '#c0392b',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Popup;
