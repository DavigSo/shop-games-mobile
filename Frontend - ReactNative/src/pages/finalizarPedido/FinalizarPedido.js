import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { styles } from './finalizarPedidoStyle';

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

const FinalizarPedido = () => {
  const [userId, setUserId] = useState(null);
  const [gameDetails, setGameDetails] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const navigation = useNavigation();

  const fetchCartDetails = async (userId) => {
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
        // Obter detalhes do carrinho
        const responseCart = await axios.get(
          `http://10.5.0.166:8000/api/cart/getCartDetails/${userData.cart}`,
        );

        if (responseCart.status !== 200) {
          throw new Error('Erro ao obter detalhes do carrinho');
        }

        const cartDetailsData = responseCart.data;

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
    fetchCartDetails(userId);
  }, [userId]);

  useEffect(() => {
    // Calcular o valor total da compra
    let total = 0;
    for (const jogo of gameDetails) {
      // Verificar se a propriedade 'value' existe antes de usá-la
      if (jogo.value && typeof jogo.value === 'string') {
        const price = parseFloat(jogo.value.replace('R$', '').trim()) || 0;
        total += price * jogo.quantity;

        console.log(
          `Calculando ${jogo.item}: preço ${price}, quantidade ${
            jogo.quantity
          }, subtotal ${price * jogo.quantity}`,
        );
      }
    }

    setTotalValue(total);
  }, [gameDetails]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finalizar Compra</Text>
      <Text style={styles.totalValue}>
        Valor Total: R${' '}
        {gameDetails
          .reduce((total, jogo) => {
            return total + jogo.quantity * parseFloat(jogo.value);
          }, 0)
          .toFixed(2)}
      </Text>

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
              {jogo.value && <Text style={styles.price}>{jogo.value}</Text>}

              {/* Exibir a quantidade do jogo */}
              <Text style={styles.quantity}>Quantidade: {jogo.quantity}</Text>
            </View>
          </View>
        )}
      />

      {/* Resumo da compra */}
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

      <TouchableOpacity
        style={styles.finalizarButton}
        onPress={() => {
          navigation.navigate('Pagamento', {
            gameDetails,
            totalValue: totalValue.toFixed(2),
          });
        }}
      >
        <Text style={styles.finalizarButtonText}>Finalizar Compra</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FinalizarPedido;
