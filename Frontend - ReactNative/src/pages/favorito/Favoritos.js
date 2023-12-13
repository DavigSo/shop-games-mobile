import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './favoritosStyle';
import api from '../../services/api.js';
import axios from 'axios';

const getUserIdFromAsyncStorage = async () => {
	try {
		const userId = await AsyncStorage.getItem('userId');
		console.log(userId)
	  return userId;
	} catch (error) {
	  console.error(
		'Erro ao obter o ID do usuário do armazenamento local:',
		error,
	  );
	  return null;
	}
  };

export const SeusJogosFavoritos = () => {
  const [jogosFavoritos, setJogosFavoritos] = useState([]);
  const [userId, setUserId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  // Função para buscar os jogos favoritos do back-end
  const fetchJogosFavoritos = async () => {
    try {
       const id = await getUserIdFromAsyncStorage();
	   setUserId(id);

	   const response = await axios.get(`http://10.5.0.166:8000/api/list/${id}`);
	console.log('response', response.data)
      setJogosFavoritos(response.data.games);
    } catch (error) {
      console.log('Erro ao buscar os jogos favoritos:', error);
    }
  };

  useEffect(() => {
    // Carregar os jogos favoritos ao montar o componente
    fetchJogosFavoritos();
  }, []);

  const removerJogoFavorito = async (jogoId) => {
	try {
	  const userId = await getUserIdFromAsyncStorage();
	  const response = await axios.post('http://10.5.0.166:8000/api/favorite/remove', {
		userId: userId, 
		gameId: jogoId,
	  });
  
	  if (response.data.message === 'Game removed from favorites') {

		// Atualiza a lista de jogos favoritos após remover um jogo
		fetchJogosFavoritos();
		setPopupMessage('Jogo removido dos favoritos.');
        setShowPopup(true);
		setTimeout(() => {
			setShowPopup(false);
		  }, 1500);
	  } else {
		throw new Error('Não foi possível remover o jogo dos favoritos.');
	  }
	} catch (error) {
	  console.error('Erro ao remover jogo dos favoritos:', error.message);
	}
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seus Jogos Favoritos</Text>
      
      <FlatList
        data={jogosFavoritos}
        keyExtractor={item => item._id} 
        renderItem={({ item }) => (
          <View style={styles.jogoItem}>
            <Image source={{ uri: item.urlImg }} style={styles.image} />
            
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.item}</Text>
            </View>

            {/* Botão de remover jogo favorito */}
            <TouchableOpacity onPress={() => removerJogoFavorito(item._id)}>
              <Icon name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
		{/* Popup Modal */}
		{showPopup && (
        <Modal transparent={true} visible={showPopup} animationType="slide">
          <TouchableWithoutFeedback onPress={() => setShowPopup(false)}>
            <View style={styles.popupContainer}>
              <View style={styles.popupContent}>
                <Text style={styles.popupText}>{popupMessage}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
	</View>
  );
};


export default SeusJogosFavoritos;