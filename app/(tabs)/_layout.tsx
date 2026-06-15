import { Feather } from '@expo/vector-icons';
import { Tabs, usePathname } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../_lib/theme';

export default function AppLayout() {
  const { darkMode } = useTheme();
  const pathname = usePathname();

  const circleBackgroundColor = darkMode ? '#222' : '#e01a5f';

  // ATUALIZADO: Agora checa se a rota atual começa com /perfil_tab
  const isPerfilFocused = pathname.startsWith('/perfil_tab');

  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#fff',
      tabBarInactiveTintColor: '#ffffffb6',
      tabBarShowLabel: false,
      tabBarStyle: {
        position: "absolute",
        height: 70,
        backgroundColor: darkMode ? '#222' : '#e01a5f',
        borderTopWidth: 0,
      },
      headerShown: false
    }}>
      <Tabs.Screen
        name="comunidade"
        options={{
          title: 'Comunidade',
          tabBarIcon: ({ color, focused }) => (
            <View style={[focused && styles.iconFocused, focused && { backgroundColor: circleBackgroundColor }]}>
              <Feather name="users" size={focused ? 30 : 20} color={color} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="inicio"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, focused }) => (
            <View style={[focused && styles.iconFocused, focused && { backgroundColor: circleBackgroundColor }]}>
              <Feather name="home" size={focused ? 30 : 20} color={color} />
            </View>
          )
        }}
      />

      <Tabs.Screen
        name="perfil_tab" // <--- Aponta para a pasta que criamos
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => {
            const active = focused || isPerfilFocused;
            return (
              <View style={[active && styles.iconFocused, active && { backgroundColor: circleBackgroundColor }]}>
                <Feather name="user" size={active ? 30 : 20} color={active ? '#fff' : color} />
              </View>
            );
          }
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: { alignItems: 'center', justifyContent: 'center', width: 45, height: 44, borderRadius: 22.5 },
  iconFocused: { alignItems: "center", justifyContent: "center", height: 80, width: 80, borderRadius: 100, marginTop: -30, shadowColor: "#000", shadowOffset: { width: 0, height: -6 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 4, borderTopWidth: 1, borderTopColor: 'rgba(0, 0, 0, 0.15)' },
});