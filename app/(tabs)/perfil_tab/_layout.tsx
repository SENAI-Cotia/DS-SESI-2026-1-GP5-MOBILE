// app/(tabs)/perfil_tab/_layout.tsx
import { Stack } from 'expo-router';

export default function PerfilSubStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {}
      <Stack.Screen name="index" options={{ title: 'Meu Perfil' }} />
      <Stack.Screen name="acessibilidade" options={{ title: 'Acessibilidade' }} />
    </Stack>
  );
}