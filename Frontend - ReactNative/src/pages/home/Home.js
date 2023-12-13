import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import * as FileSystem  from 'expo-file-system';

import { useNavigation } from '@react-navigation/native';
import { styles } from './homeStyle.js';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';  // Importação do ImagePicker
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import httpService from '../../services/httpService.js';


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

const uploadImageToServer = async (img, userId) => {
  try {
    const user = await AsyncStorage.getItem('Authorization');
    const formData = new FormData();

    // Lê a imagem como base64
    const base64Img = await FileSystem.readAsStringAsync(img, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Adiciona a imagem diretamente ao FormData
    formData.append('file', base64Img);

    const response = await axios.post(`http://10.5.0.166:8000/api/uploadImage/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: user,
      },
    });

    const data = response.data;
    console.log(data);
  } catch (error) {
    console.error('Erro ao enviar a imagem para o servidor:', error);
    Alert.alert('Erro', 'Erro ao enviar a imagem para o servidor.');
  }
};

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.cancelled) {
      const img = result.assets[0].uri;
      setImage(img);
      await uploadImageToServer(img, userId);
    } else {
      console.error('Erro ao escolher a imagem:', result.cancelled);
    }
  };


  // Componente principal da tela Home
  const Home = () => {
    // Hooks de estado e navegação
    const navigation = useNavigation();
    const [carrinho, setCarrinho] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [ popupMessage, setPopupMessage] = useState('');
    const [games, setGames] = useState([]); // Changed from 'products' to 'games'
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [favoritos, setFavoritos] = useState([]);

    const [userId, setUserId] = useState(null);

    // Efeito para buscar jogos ao carregar a tela
    useEffect(() => {
      const fetchGames = async () => {
        try {
          // Requisição para obter dados dos jogos
          const response = await axios.get(
            'http://10.5.0.166:8000/api/games',
          );

          // Log dos dados obtidos

          // Atualiza o estado com os dados dos jogos
          setGames(response.data);

          // Log do estado atualizado
        } catch (error) {
          console.error('Erro ao obter a lista de jogos:', error);
        }
      };

      fetchGames();
    }, []);

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

    const handleAddToCart = async (gameId) => {
      try {
        if (!userId) {
          console.error('ID do usuário não definido.');
          return;
        }

        if (!gameId) {
          console.error('ID do jogo não definido:', gameId);
          return;
        }

        console.log('Fazendo solicitação para adicionar ao carrinho:', {
          userId,
          gameId,
        });

        // Dados a serem enviados no corpo da solicitação
        const requestData = {
          userId,
          gameId,
        };

        const response = await axios.post(
          'http://10.5.0.166:8000/api/cart/addToCart',
          requestData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        setPopupMessage(`Produto adicionado ao carrinho.`);
		    setShowPopup(true);
        console.log(
          `Added game with ID ${gameId} to the cart. Response:`,
          response.data,
        );
      } catch (error) {
        setPopupMessage('Erro ao adicionar produto ao carrinho.');
        console.error('Erro ao adicionar ao carrinho:', error);
      }
    };
   // Função para adicionar um item aos favoritos
   const handleAddToFavorites = async (game) => {
	console.log('favoritosss', game)
	try {
	  const jogoNosFavoritos = favoritos.find(
		(itemFavorito) => itemFavorito._id === game._id
	  );
	  console.log('Favoritos locais:', favoritos);
	  //console.log('cu', jogoNosFavoritos)
  
	  if (jogoNosFavoritos) {
		setPopupMessage(`O jogo ${game.item} já está nos favoritos.`);
	  } else {
		const novoJogo = {
		  item: game.item,
		  amount: 1,
		  _id: game._id,
		};
		console.log('cu', userId)
  
		const response = await axios.post(
			'http://10.5.0.166:8000/api/favorite/add',
			{
				gameId: game._id,
				userId: userId,
			}
			);
			
		setFavoritos([...favoritos, novoJogo]);
		console.log('Favoritos locais após adição:', favoritos);
		setPopupMessage(`Jogo ${game.item} adicionado aos favoritos.`);
	  }
  
	  setShowPopup(true);
	} catch (error) {
	  console.error('Erro ao adicionar jogo aos favoritos:', error);
	}
  };

    // Função para navegar para a tela de adicionar produto
    const navigateToAddProduct = () => {
      navigation.navigate('AdicionarJogo');
    };

    // Função para navegar para a tela de carrinho, passando os produtos selecionados como parâmetro
    const navigateToCart = () => {
      navigation.navigate('Carrinho', { produtosSelecionados: carrinho });
    };

    // Função para navegar para a tela de compras do usuário
    const navigateToMyPurchases = () => {
      navigation.navigate('MinhasCompras');
    };

    // Função para navegar para a tela de Suporte
    const navigateSuporte = () => {
      navigation.navigate('Suporte');
    };

    // Função para fechar o popup
    const closePopup = () => {
      setShowPopup(false);
    };

    // Função para navegar para a tela de favoritos
	const navigateToFavorites = () => {
		navigation.navigate('Favoritos'); // Supondo que 'Favoritos' seja o nome da tela de favoritos
	};

    // Efeito para fechar o popup automaticamente após 1 segundo
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        closePopup();
      }, 1500);

      return () => clearTimeout(timeoutId);
    }, [showPopup]);

    // Renderização da tela
    return (
      <ScrollView>
        <ScrollView>
          <View style={styles.header}>
            <TouchableWithoutFeedback onPress={pickImage}>
              <Image 
                
                style={styles.userImage}
              />
            </TouchableWithoutFeedback>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{`Olá, Campeão!`}</Text>
              <Text style={styles.userQuote}>Hoje é dia de vitória!</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.container}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.buttonsContainer}>
              {/* Botão para navegar para a tela de adicionar produto */}
              <TouchableOpacity
                style={[
                  styles.button,
                  { marginRight: 10, width: 120, height: 50 },
                ]}
                onPress={navigateToAddProduct}
              >
                <Text style={styles.buttonText}>Adicionar Produto</Text>
              </TouchableOpacity>

              {/* Botão para navegar para a tela de carrinho */}
              <TouchableOpacity
                style={[
                  styles.button,
                  { marginRight: 10, width: 120, height: 50 },
                ]}
                onPress={navigateToCart}
              >
                <Text style={styles.buttonText}>Carrinho</Text>
              </TouchableOpacity>

              {/* Botão para navegar para a tela de compras do usuário */}
              <TouchableOpacity
                style={[
                  styles.button,
                  { marginRight: 10, width: 120, height: 50 },
                ]}
                onPress={navigateToMyPurchases}
              >
                <Text style={styles.buttonText}>Minhas Compras</Text>
              </TouchableOpacity>

              {/* Botão para navegar para a tela de favoritos */}
			       <TouchableOpacity
              style={[
              	styles.button,
               	{ marginRight: 10, width: 120, height: 50 },
              ]}
              onPress={navigateToFavorites}
            >
              <Text style={styles.buttonText}>Favoritos</Text>
            </TouchableOpacity>

              {/* Botão para navegar para a tela de Suporte */}
              <TouchableOpacity
                style={[
                  styles.button,
                  { marginRight: 10, width: 120, height: 50 },
                ]}
                onPress={navigateSuporte}
              >
                <Text style={styles.buttonText}>Suporte</Text>
              </TouchableOpacity>

              {/* Adicione outros botões aqui... */}
            </View>
          </ScrollView>

          {/* Seção de últimas novidades */}
          <View style={styles.lastReleasesContainer}>
            <Text style={styles.sectionTitle}>Últimas Novidades</Text>

            {/* Mapeia a lista de produtos para exibir informações */}
            <View>
              {games.map((game) => (
                <View key={game._id} style={styles.gameItem}>
                  <Image
                    source={{ uri: game.urlImg }}
                    style={styles.gameImage}
                  />

                  {/* Detalhes do produto */}
                  <View style={styles.gameDetails}>
                    <View style={styles.gameInfo}>
                      <Text style={styles.gameName}>{game.item}</Text>
                      <Text style={styles.gamePrice}> R$ {game.value},00 </Text>
                    </View>

                    {/* Botão para adicionar aos favoritos */}
					<TouchableOpacity
                  	 style={styles.addToFavoriteButton}
                  	 onPress={() => handleAddToFavorites(game)}
                	>
					  <Icon name="star" size={20} color="white" />
                	</TouchableOpacity>

                    {/* Botão para adicionar ao carrinho */}
                    <TouchableOpacity
                      style={styles.addToCartButton}
                      onPress={() => handleAddToCart(game._id)}
                    >
                      <Text style={styles.addToCartButtonText}>
                        Adicionar ao Carrinho
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Popup Modal */}
          {showPopup && (
            <Modal
              transparent={true}
              visible={showPopup}
              animationType="slide"
              onRequestClose={closePopup}
            >
              <View style={styles.popupContainer}>
                <View style={styles.popupContent}>
                  <Text style={styles.popupText}>{popupMessage}</Text>
                  <TouchableOpacity onPress={closePopup}></TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
        </View>
      </ScrollView>
    );
  };

  return <Home />;
}
