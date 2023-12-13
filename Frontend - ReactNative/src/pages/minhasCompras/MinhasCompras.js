import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { styles } from './minhasComprasStyle';

// Componente de Cartão de Compra
const PurchaseCard = ({ purchase }) => {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://10.5.0.166:8000/api/order/${purchase.orderId}`);
        setOrderDetails(response.data);
      } catch (error) {
        console.error('Erro ao obter detalhes do pedido:', error);
      }
    };

    if (purchase.orderId) {
      fetchOrderDetails();
    }
  }, [purchase.orderId]);

  return (
    <View style={styles.purchaseCard}>
      <View style={styles.card}>
        <View style={styles.cardDetails}>
          {orderDetails ? (
            <>
              <Text style={styles.cardUserName}>{orderDetails.user.name}</Text>
              <FlatList
                data={orderDetails.games}
                keyExtractor={(item) => item.gameId.toString()}
                renderItem={({ item }) => (
                  <View>
                    <Text style={styles.cardGameName}>{item.gameName}</Text>
                    <Text style={styles.cardGameQuantity}>Quantidade: {item.quantity}</Text>
                  </View>
                )}
              />
              <Text style={styles.cardTotalValue}>Valor Total: {orderDetails.totalValue}</Text>
              <Text style={styles.cardOrderStatus}>Status: {orderDetails.isCompleted ? 'Concluído' : 'Aguardando'}</Text>
            </>
          ) : (
            <Text style={styles.cardDetailsLoading}>Carregando detalhes do pedido...</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const MinhasCompras = ({ navigation }) => {
  const [userPurchases, setUserPurchases] = useState([]);
  const [userId, setUserId] = useState(null);

  const getUserIdFromAsyncStorage = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      return userId;
    } catch (error) {
      console.error('Erro ao obter o ID do usuário do armazenamento local:', error);
      return null;
    }
  };

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

  useEffect(() => {
    const fetchUserIdAndPurchases = async () => {
      try {
        if (userId) {
          const response = await axios.get(`http://10.5.0.166:8000/api/orders/user/${userId}`);
          setUserPurchases(response.data);
        }
      } catch (error) {
        console.error('Erro ao obter o ID do usuário ou suas compras:', error);
      }
    };

    fetchUserIdAndPurchases();
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Compras</Text>
      <FlatList
        data={userPurchases}
        keyExtractor={(item) => item.orderId.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.purchaseItem}>
            <PurchaseCard purchase={item} />
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.backButtonText}>Voltar para Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MinhasCompras;
