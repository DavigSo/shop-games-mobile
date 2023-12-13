import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './telaInicialStyle';

function TelaInicial({ navigation }) {
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/union.png')} style={styles.containerImage} />
      <View style={styles.containerWords}>
        <Image
          source={require('../../../assets/Screenshot_124-removebg-preview.png')}
          style={styles.imageSpider}
        />
        <Text style={styles.containerFraseOne}>Conecte-se e organize suas jogatinas</Text>
        <Text style={styles.containerFraseTwo}>
          Crie grupos, conheça novas pessoas, jogue e opine!
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Image
            source={require('../../../assets/Screenshot_122-removebg-preview.png')}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Entre, vamos jogar!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default TelaInicial;
