import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { styles } from './loginStyle.js';
import axios from 'axios';
import api from '../../services/api.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  ('');
  const sendForm = async () => {
    try {
      if (!email || !password) {
        // Verifica se os campos estão preenchidos
        Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        return;
      }

      const emailValidation = email.toLowerCase().includes('@gmail.com');
      const passwordValidation = password.length >= 6;

      if (!emailValidation || !passwordValidation) {
      // Show an error message or prevent form submission
      if (!emailValidation) {
      alert('Por favor, insira um endereço de e-mail válido do Gmail.');
         } else {
      alert('A senha deve ter pelo menos 6 caracteres.');
      }
       return;
      }

      const response = await api.post('http://10.5.0.166:8000/api/login', {
        email,
        password,
      });

      const token = response.data.token;
      const userId = response.data._id;
      await AsyncStorage.setItem('Authorization', token);
      await AsyncStorage.setItem('userId', userId);

      api.defaults.headers.common.Authorization = token;

      console.log(token); // Assume que a resposta contém dados
      console.log(userId); // Assume que a resposta contém dados

      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);

      if (axios.isAxiosError(error)) {
        // Verifica se é um erro do Axios
        const errorMessage =
          error.response?.data?.message || 'Erro desconhecido';
        Alert.alert('Erro', errorMessage);
      } else {
        Alert.alert('Erro', 'Erro desconhecido');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/union.png')}
        style={styles.containerImage}
      />

      <View style={styles.formContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/BGLOGO.png')}
            style={styles.logoImage}
          />
          <View style={styles.divider} />
          <Text style={styles.loginTitle}>Faça seu login</Text>
        </View>

        <TextInput
          style={[styles.input, { color: '#DDE3F0' }]}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor="#DDE3F0"
        />

        <TextInput
          style={[styles.input, { color: '#DDE3F0' }]}
          placeholder="Senha"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor="#DDE3F0"
        />

        <TouchableOpacity style={styles.button} onPress={sendForm}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('RegisterScreen')}
        >
          <Text style={styles.registerButtonText}>
            Não tem uma conta? Registre-se
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Login;
