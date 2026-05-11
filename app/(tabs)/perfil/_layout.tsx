import { Stack } from 'expo-router';

export default function VendasStack() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" options={{ title: 'Lista de Vendas' }} />
      <Stack.Screen name="criar" options={{ title: 'Nova Venda' }} />
      <Stack.Screen name="[id]" options={{ title: 'Editar Venda' }} />
    </Stack>
  );
}