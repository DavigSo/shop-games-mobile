import { createStackNavigator } from '@react-navigation/stack';
import TelaInicial from '../pages/telaInicial/TelaInicial';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import RegisterScreen from '../pages/register/RegisterScreen';
import FinalizarPedido from '../pages/finalizarPedido/FinalizarPedido';
import Carrinho from '../pages/carrinho/Carrinho';
import AdicionarJogo from '../pages/adicionarJogo/AdicionarJogo';
import MinhasCompras from '../pages/minhasCompras/MinhasCompras';
import Suporte from '../pages/Suporte/Suporte';
import Favoritos, { SeusJogosFavoritos } from '../pages/favorito/Favoritos';
import Pagamento from '../pages/Pagamento';

// Criação do navegador de pilha (Stack Navigator)
const Stack = createStackNavigator();

// Componente de navegação principal
export default function Routes() {
  return (
    <Stack.Navigator>
      {/* Configurações para a tela inicial */}
      <Stack.Screen
        name="TelaInicial"
        component={TelaInicial}
        options={{ headerShown: false }} // Oculta o cabeçalho da tela
      />
      {/* Configurações para a tela de login */}
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }} // Oculta o cabeçalho da tela
      />
      {/* Configurações para a tela de registro */}
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }} // Oculta o cabeçalho da tela
      />
      {/* Configurações para a tela principal (Home) */}
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }} // Oculta o cabeçalho da tela
      />
      {/* Configurações para a tela de finalização de compra */}
      <Stack.Screen
        name="FinalizarPedido"
        component={FinalizarPedido}
        options={{ headerShown: false }} // Oculta o cabeçalho da tela
      />
      {/* Configurações para a tela de carrinho */}
      <Stack.Screen
        name="Carrinho"
        component={Carrinho}
        options={{ headerShown: false }} // Oculta o cabeçalho da tela
      />
      {/* Configurações para a tela de adição de jogo */}
      <Stack.Screen
        name="AdicionarJogo"
        component={AdicionarJogo}
        options={{ headerShown: false }} // Oculta o cabeçalho da tela
      />
      {/* Configurações para a tela de histórico de compras */}
      <Stack.Screen
        name="MinhasCompras"
        component={MinhasCompras}
        options={{ headerShown: false }} // Oculta o cabeçalho da tela
      />
	  {/*Comfigurações para a tela de favoritos*/}
	  <Stack.Screen
        name="FavoritosScreen"
        component={SeusJogosFavoritos}
        options={{ headerShown: false }} // Oculta o cabeçalho da tela
	  />

      <Stack.Screen
        name="Favoritos"
        component={Favoritos}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Suporte"
        component={Suporte}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Pagamento"
        component={Pagamento}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
