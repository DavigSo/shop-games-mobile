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
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);


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
        setShowSuccessPopup(true);
  
        // Redirect to Home after successful payment
        navigation.navigate('Home');
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
	{/* {showSuccessPopup && (
		<Modal
		transparent={true}
		visible={showSuccessPopup}
		animationType="slide"
		onRequestClose={() => setShowSuccessPopup(false)}
		>
		  <View style={styles.popupContainer}>
			<View style={styles.popupContent}>
			  <Text style={styles.popupText}>O pagamento foi bem sucedido</Text>
			  <TouchableOpacity onPress={() => setShowSuccessPopup(false)}>
				<Text style={styles.closePopup}>Fechar</Text>
			  </TouchableOpacity>
			</View>
		  </View>
		</Modal>
	  	)} */}
		</View>
	);

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#DDE3F0',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#DDE3F0',
  },
  finalizarButton: {
    backgroundColor: '#991F36',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  finalizarButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  codigoPix: {
    fontSize: 16,
    marginBottom: 10,
    color: '#DDE3F0',
  },
  voltarButton: {
    backgroundColor: '#355A9D',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  voltarButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Pagamento;
