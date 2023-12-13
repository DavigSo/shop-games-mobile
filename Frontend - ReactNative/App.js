import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import Routes from './src/routes/Index';
import { useState } from 'react';

// Componente principal da aplicação
export default function App() {
  return (
    // Container de navegação que engloba toda a aplicação
    <NavigationContainer>
      {/* Barra de status que define o estilo da barra (light) e a cor de fundo (#000) */}
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      {/* Componente que contém as definições de rotas da aplicação */}
      <Routes />
    </NavigationContainer>
  );
}
