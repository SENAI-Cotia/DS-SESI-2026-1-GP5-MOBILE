import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from './_lib/theme';

const FONT_SIZE_KEY = 'appFontSize';

export default function AcessibilidadePage() {
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useTheme();
  const [fontSize, setFontSize] = useState<'small'|'medium'|'large'>('medium');

  useEffect(() => {
    const loadFontPreferences = async () => {
      const value = await AsyncStorage.getItem(FONT_SIZE_KEY);
      if (value === 'small' || value === 'medium' || value === 'large') {
        setFontSize(value);
      }
    };
    loadFontPreferences();
  }, []);

  const savePreference = async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
  };

  const handleFontSize = async (size: 'small'|'medium'|'large') => {
    setFontSize(size);
    await savePreference(FONT_SIZE_KEY, size);
  };

  const handleToggleDark = async () => {
    await toggleDarkMode();
  };

  return (
    <View style={[styles.container, darkMode && styles.darkBackground]}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={26} color="#fff" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, darkMode && styles.darkText]}>Acessibilidade</Text>
        <Text style={[styles.subtitle, darkMode && styles.darkText]}>Personalize a experiência do aplicativo conforme suas necessidades.</Text>
        <View style={styles.card}>
          <Text style={[styles.cardTitle, darkMode && styles.darkText]}>Tamanho do texto</Text>
          <Text style={[styles.cardDescription, darkMode && styles.darkText]}>Ajuste o tamanho da fonte exibida no aplicativo.</Text>
          <View style={styles.buttonRow}>
            {['small', 'medium', 'large'].map((size) => (
              <TouchableOpacity
                key={size}
                style={[styles.sizeButton, fontSize === size && styles.sizeButtonActive]}
                onPress={() => handleFontSize(size as 'small'|'medium'|'large')}
              >
                <Text style={[styles.sizeButtonText, fontSize === size && styles.sizeButtonTextActive]}>{size === 'small' ? 'P' : size === 'medium' ? 'M' : 'G'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.card}>
          <Text style={[styles.cardTitle, darkMode && styles.darkText]}>Modo escuro</Text>
          <Text style={[styles.cardDescription, darkMode && styles.darkText]}>Ativa o tema escuro nas telas do app.</Text>
          <TouchableOpacity style={styles.toggleRow} onPress={handleToggleDark}>
            <View style={[styles.toggleTrack, darkMode && styles.toggleTrackActive]}>
              <View style={[styles.toggleThumb, darkMode && styles.toggleThumbActive]} />
            </View>
            <Text style={[styles.toggleText, darkMode && styles.darkText]}>{darkMode ? 'Ativado' : 'Desativado'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  darkBackground: { backgroundColor: '#1f1f1f' },
  backButton: { backgroundColor: '#e01a5f', width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', margin: 16 },
  content: { paddingHorizontal: 20, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#222', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#555', marginBottom: 20 },
  darkText: { color: '#f8f8f8' },
  card: { backgroundColor: '#f8f4f7', borderRadius: 24, padding: 18, marginBottom: 16, borderWidth: 1, borderColor: '#eee' },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8, color: '#222' },
  cardDescription: { fontSize: 14, color: '#555' },
  buttonRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  sizeButton: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 14, paddingVertical: 10, paddingHorizontal: 18 },
  sizeButtonActive: { backgroundColor: '#e01a5f', borderColor: '#e01a5f' },
  sizeButtonText: { fontSize: 16, color: '#333', fontWeight: '700' },
  sizeButtonTextActive: { color: '#fff' },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
  toggleTrack: { width: 60, height: 32, borderRadius: 18, backgroundColor: '#ddd', padding: 4 },
  toggleTrackActive: { backgroundColor: '#e01a5f' },
  toggleThumb: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#fff', transform: [{ translateX: 0 }] },
  toggleThumbActive: { transform: [{ translateX: 26 }] },
  toggleText: { fontSize: 14, fontWeight: '700', color: '#333' },
});
