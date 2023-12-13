import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import axios from 'axios';
// Importação dos estilos específicos para o componente RegisterScreen
import { styles } from './registerStyle';

// Componente de Registro
function RegisterScreen({ navigation }) {
  // Estados para armazenar o nome de usuário, senha, e-mail e o foco dos campos
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const sendForm = async () => {
    try {
      if (!username || !email || !password) {
        // Verifica se os campos estão preenchidos
        Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        return;
      }

      const emailValidation = email.toLowerCase().includes('@gmail.com');
      const passwordValidation = password.length >= 6;

      if (!emailValidation || !passwordValidation) {
      if (!emailValidation) {
        alert('Por favor, insira um endereço de e-mail válido do Gmail.');
      } else {
        alert('A senha deve ter pelo menos 6 caracteres.');
      }
      return;
      }

      const response = await axios.post('http://10.5.0.166:8000/api/users', {
        username,
        email,
        password,
      });

      console.log(response.data); // Assume que a resposta contém dados

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
      {/* Imagem de fundo */}
      <Image
        source={require('../../../assets/union.png')}
        style={styles.containerImage}
      />
      <View style={styles.formContainer}>
        <View style={styles.logoContainer}>
          {/* Logo do aplicativo */}
          <Image
            source={require('../../../assets/BGLOGO.png')}
            style={styles.logoImage}
          />
          <View style={styles.divider} />
          <Text style={styles.registerTitle}>Faça seu registro</Text>
        </View>

        {/* Campo de entrada para o nome de usuário */}
        <TextInput
          style={[styles.input, { color: '#DDE3F0' }]}
          placeholder="Nome de usuário"
          onChangeText={(text) => setUsername(text)}
          placeholderTextColor="#DDE3F0"
        />

        {/* Campo de entrada para o e-mail */}
        <TextInput
          style={[
            styles.input,
            {
              color: '#DDE3F0',
              borderColor: '#991F36',
              borderWidth: 2,
            },
          ]}
          placeholder="E-mail"
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor="#DDE3F0"
        />

        {/* Campo de entrada para a senha */}
        <TextInput
          style={[styles.input, { color: '#DDE3F0' }]}
          placeholder="Senha (min: 6)"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor="#DDE3F0"
        />

        {/* Botão para realizar o registro */}
        <TouchableOpacity style={styles.button} onPress={sendForm}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>

        {/* Botão para navegar para a tela de login */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginButtonText}>
            Já tem uma conta? Faça Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default RegisterScreen;
