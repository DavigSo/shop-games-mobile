// Adicione essas importações no seu componente React Native
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { styles } from './carrinhoStyle';
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

const Carrinho = () => {
  const [jogosLocaisSelecionados, setJogosLocaisSelecionados] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [cartDetails, setCartDetails] = useState(null);
  const [gameDetails, setGameDetails] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const navigation = useNavigation();

  const fetchCartDetails = async () => {
    try {
      if (!userId) {
        return;
      }

      // Obter o ID do carrinho do usuário
      const responseUser = await axios.get(
        `http://10.5.0.166:8000/api/users/${userId}`,
      );

      if (responseUser.status !== 200) {
        throw new Error('Erro ao obter detalhes do usuário');
      }

      const userData = responseUser.data;

      if (userData.cart) {
        setCartId(userData.cart);

        // Obter detalhes do carrinho
        const responseCart = await axios.get(
          `http://10.5.0.166:8000/api/cart/getCartDetails/${userData.cart}`,
        );

        if (responseCart.status !== 200) {
          throw new Error('Erro ao obter detalhes do carrinho');
        }

        const cartDetailsData = responseCart.data;

        setCartDetails(cartDetailsData);

        // Obter detalhes dos jogos no carrinho
        const gamesWithDetails = await Promise.all(
          cartDetailsData.games.map(async (game) => {
            const responseGame = await axios.get(
              `http://10.5.0.166:8000/api/games/${game.gameId}`,
            );
            const gameDetail = responseGame.data;
            return { ...game, ...gameDetail };
          }),
        );

        setGameDetails(gamesWithDetails);
      } else {
        throw new Error('Usuário não possui carrinho associado.');
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes do carrinho:', error);
    }
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await getUserIdFromAsyncStorage();
        setUserId(id);
        console.log('o id do usuario e:', id);
      } catch (error) {
        console.error('Erro ao obter o ID do usuário:', error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    fetchCartDetails();
  }, [userId, cartId]);

  const showAndHidePopup = (message) => {
    setPopupMessage(message); // Definir a mensagem do pop-up
    setShowPopup(true); // Exibir o pop-up

    // Fechar o pop-up automaticamente após 1.5 segundos
    setTimeout(() => {
      setShowPopup(false);
    }, 1500);
  };

  // Função para remover um item do carrinho
  const handleExcluirJogo = async (gameId) => {
    try {
      if (!cartId || !gameId) {
        throw new Error('ID do carrinho ou do jogo inválido');
      }
      const response = await axios.delete(
        `http://10.5.0.166:8000/api/cart/removeCartItem/${cartId}/${gameId}`,
      );
      console.log('Resposta do servidor:', response.data);
      if (response.status !== 200) {
        throw new Error('Erro ao remover item do carrinho');
      }

      // Atualizar os detalhes do carrinho após a remoção
      await fetchCartDetails();
	  showAndHidePopup('Jogo removido do carrinho com sucesso.');
    } catch (error) {
      console.error('Erro ao excluir jogo do carrinho:', error);
    }
  };

  useEffect(() => {
    fetchCartDetails();
  }, [userId, cartId]);
  return (
    <View style={styles.container}>
      {/* Título do carrinho de compras */}
      <Text style={styles.title}>Carrinho de Compras</Text>

      {/* Container do carrinho de compras com imagem */}
      <View style={styles.carrinhoContainer}>
        <Image
          source={require('../../../assets/carrinhoIMG.png')}
          style={styles.carrinhoImage}
        />
      </View>

      {/* Lista de jogos no carrinho */}
      <FlatList
        data={gameDetails}
        keyExtractor={(item) => item.cod.toString()}
        renderItem={({ item: jogo }) => (
          <View style={styles.jogoItem}>
            {/* Imagem do jogo */}
            <Image source={{ uri: jogo.urlImg }} style={styles.image} />

            {/* Informações do jogo */}
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{jogo.item}</Text>
              <Text style={styles.price}>{jogo.value}</Text>

              {/* Exibir a quantidade do jogo */}
              <Text style={styles.quantity}>Quantidade: {jogo.quantity}</Text>
            </View>

            <TouchableOpacity onPress={() => handleExcluirJogo(jogo.gameId)}>
              <Icon name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Área acima dos botões para mostrar nome dos jogos e valor total */}
      <View style={styles.resumoContainer}>
        <Text style={styles.resumoTitle}>Resumo da Compra</Text>
        {gameDetails.map((jogo) => (
          <View key={jogo.cod} style={styles.resumoItem}>
            <Text style={styles.resumoItemText}>{jogo.item}</Text>
            <Text style={styles.resumoItemText}>
              {jogo.quantity} x {jogo.value}
            </Text>
          </View>
        ))}
        <Text style={styles.totalPrice}>
          Total: R${' '}
          {gameDetails
            .reduce((total, jogo) => {
              return total + jogo.quantity * parseFloat(jogo.value);
            }, 0)
            .toFixed(2)}
        </Text>
      </View>

      {/* Botões no final da tela */}
      <View style={styles.buttonsContainer}>
        {/* Botão para finalizar a compra */}
        <TouchableOpacity
          style={styles.finalizarButton}
          onPress={() => {
            navigation.navigate('FinalizarPedido', {
              jogosSelecionados: jogosLocaisSelecionados,
            });
          }}
        >
          <Text style={styles.finalizarButtonText}>Finalizar o carrinho</Text>
        </TouchableOpacity>

        {/* Botão para continuar comprando */}
        <TouchableOpacity
          style={styles.continuarComprandoButton}
          onPress={() => {
            navigation.navigate('Home');
          }}
        >
          <Text style={styles.continuarComprandoButtonText}>
            Continuar Comprando
          </Text>
        </TouchableOpacity>
      </View>
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

export default Carrinho;
