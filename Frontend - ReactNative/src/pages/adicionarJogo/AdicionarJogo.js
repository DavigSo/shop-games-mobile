import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { styles } from './adicionarJogoStyle';
import axios from 'axios';

function AdicionarJogo({ navigation }) {
  // Estados para controlar os campos de entrada
  const [cod, setCod] = useState('');
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [value, setValue] = useState('');
  const [urlImg, setUrlImg] = useState('');
  // Função para adicionar um novo jogo
  const sendForm = async () => {
    try {
      if (!cod || !item || !amount || !value || !urlImg) {
        // Verifica se os campos estão preenchidos
        Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        return;
      }

      const response = await axios.post('http://10.5.0.166:8000/api/games', {
        cod,
        item,
        amount,
        value,
        urlImg,
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

      {/* Formulário para adicionar um novo jogo */}
      <View style={styles.formContainer}>
        {/* Cabeçalho do formulário */}
        <View style={styles.header}>
          <Image
            source={require('../../../assets/BGLOGO.png')}
            style={styles.logoImage}
          />
          <View style={styles.divider} />
          <Text style={styles.title}>Adicionar Jogo</Text>
        </View>

        {/* Campo de entrada para o código do jogo */}
        <TextInput
          style={[
            styles.input,
            { borderColor: '#991F36', borderWidth: 2, color: '#DDE3F0' },
          ]}
          placeholder="Código de identificação"
          onChangeText={(text) => setCod(parseInt(text, 10))}
          placeholderTextColor="#DDE3F0" // Alterado para a cor branca
        />

        {/* Campo de entrada para o nome do jogo */}
        <TextInput
          style={[
            styles.input,
            { borderColor: '#991F36', borderWidth: 2, color: '#DDE3F0' },
          ]}
          placeholder="Nome do jogo"
          onChangeText={(text) => setItem(text)}
          placeholderTextColor="#DDE3F0" // Alterado para a cor branca
        />
        <TextInput
          style={[
            styles.input,
            { borderColor: '#991F36', borderWidth: 2, color: '#DDE3F0' },
          ]}
          placeholder="Quantidade disponível"
          onChangeText={(text) => setAmount(parseInt(text, 10))}
          placeholderTextColor="#DDE3F0" // Alterado para a cor branca
        />

        {/* Campo de entrada para o preço do jogo */}
        <TextInput
          style={[
            styles.input,
            { borderColor: '#991F36', borderWidth: 2, color: '#DDE3F0' },
          ]}
          placeholder="Preço"
          onChangeText={(text) => setValue(parseFloat(text))}
          placeholderTextColor="#DDE3F0" // Alterado para a cor branca
        />
        {/* Campo de entrada para a URL da imagem do jogo */}
        <TextInput
          style={[
            styles.input,
            { borderColor: '#991F36', borderWidth: 2, color: '#DDE3F0' },
          ]}
          placeholder="URL da imagem"
          onChangeText={(text) => setUrlImg(text)}
          placeholderTextColor="#DDE3F0" // Alterado para a cor branca
        />

        {/* Botão para adicionar o jogo */}
        <TouchableOpacity style={styles.button} onPress={sendForm}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>

        {/* Botão para voltar para a tela inicial */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default AdicionarJogo;
