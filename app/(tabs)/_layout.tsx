import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function AppLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#fff',
      tabBarInactiveTintColor: '#ffffffb6',
      tabBarShowLabel: false,
      tabBarStyle: {
        position: "absolute",
        height: 70,
        backgroundColor: '#e01a5f',      // Cor de fundo da barra
        borderTopWidth: 0,
      },
      headerShown: false
    }}>
      <Tabs.Screen
        name="comunidade"
        options={{
          title: 'Comunidade',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused && styles.iconFocused}>
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
            <View style={focused && styles.iconFocused}>
              <Feather name="home" size={focused ? 30 : 20} color={color} />,
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused && styles.iconFocused}>
              <Feather name="user" size={focused ? 30 : 20} color={color} />
            </View>
          )
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    borderRadius: 22.5, // Círculo perfeito
  },
  iconFocused: {
    backgroundColor: '#e01a5f',
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    width: 80,
    borderRadius: 100,
    marginTop: -30, // melhor que translateY
  
  },
});