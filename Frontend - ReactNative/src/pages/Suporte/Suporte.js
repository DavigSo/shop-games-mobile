import React, { useState, useEffect, Fragment } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SuporteStyle from '../Suporte/SuporteStyle';
import Baloon from './Baloon';
import io from 'socket.io-client';
import api from '../../services/api.js';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Certifique-se de importar AsyncStorage

const socket = io('http://10.5.0.166:8000');
socket.on('connect', () => {
  console.log('Connected to Socket.io server');
});

const Suporte = () => {
  const [content, setContent] = useState('');
  const [userName, setUserName] = useState('');
  const [chat, setChat] = useState({ messages: [] });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
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

    const fetchUserIdAndUserName = async () => {
      try {
        const id = await getUserIdFromAsyncStorage();
        setUserId(id);

        const response = await api.get(`http://10.5.0.166:8000/api/users/${id}`);
        setUserName(response.data.username);
      } catch (error) {
        console.error('Erro ao obter o ID do usuário ou nome de usuário:', error);
      }
    };

    // Chame a função para buscar o ID do usuário e o nome de usuário
    fetchUserIdAndUserName();
  }, []); // O segundo argumento vazio garante que isso seja executado apenas uma vez quando o componente é montado

  useEffect(() => {
    const handleChatMessage = (msg) => {
      console.log('Received message:', msg);
      setChat((prevChat) => ({ messages: [...prevChat.messages, msg] }));
    };

    socket.on('chat message', handleChatMessage);

    return () => {
      socket.off('chat message', handleChatMessage);
    };
  }, []);

  const sendMessage = () => {
    console.log('userName:', userName);
    const message = {
      content: content,
      sentBy: userName,
    };
    socket.emit('chat message', message);
    setContent('');
  };

  return (
    <Fragment>
      <ScrollView contentContainerStyle={SuporteStyle.scrollViewContainer}>
        {chat.messages.length > 0 ? (
          chat.messages.map((m, index) => (
            <Baloon key={index} message={m} currentUser={userName}></Baloon>
          ))
        ) : (
          <Text style={{ alignSelf: 'center', color: '#848484' }}>
            Sem mensagens no momento
          </Text>
        )}
      </ScrollView>

      <SafeAreaView>
        <View style={SuporteStyle.messageTextInputContainer}>
          <TextInput
            style={SuporteStyle.messageTextInput}
            placeholder="Digite sua mensagem..."
            placeholderTextColor={Colors.light}
            value={content}
            multiline
            onChangeText={(message) => setContent(message)}
          />
          <TouchableOpacity
            style={SuporteStyle.sendButton}
            disabled={!content}
            onPress={() => sendMessage()}
          >
            <Text style={{ color: Colors.white }}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default Suporte;
