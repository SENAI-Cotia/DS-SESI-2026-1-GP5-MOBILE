import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from '../../_lib/theme';

const FONT_SIZE_KEY = 'appFontSize';

// 1. Mapeamento de multiplicadores de escala para os tamanhos
const fontScale = {
  small: 0.85,
  medium: 1.0,
  large: 1.25,
};

export default function AcessibilidadePage() {
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useTheme(); // Dica: futuramente, traga o 'fontSize' daqui de dentro!
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

  // 2. Função auxiliar para calcular o tamanho real dinamicamente
  const getScaledFont = (baseSize: number) => {
    return baseSize * fontScale[fontSize];
  };

  return (
    <View style={[styles.container, darkMode && styles.darkBackground]}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/perfil_tab')}>
        <Ionicons name="chevron-back" size={26} color="#fff" />
      </TouchableOpacity>
      
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* 3. Injeção dinâmica do fontSize calculado */}
        <Text style={[
          styles.title, 
          darkMode && styles.darkText,
          { fontSize: getScaledFont(28) } // Sobrescreve o valor do StyleSheet baseado na escala
        ]}>
          Acessibilidade
        </Text>
        
        <Text style={[
          styles.subtitle, 
          darkMode && styles.darkText,
          { fontSize: getScaledFont(14) }
        ]}>
          Personalize a experiência do aplicativo conforme suas necessidades.
        </Text>
        
        <View style={[styles.card, darkMode && styles.cardDark]}>
          <Text style={[
            styles.cardTitle, 
            darkMode && styles.darkText,
            { fontSize: getScaledFont(16) }
          ]}>
            Tamanho do texto
          </Text>
          
          <Text style={[
            styles.cardDescription, 
            darkMode && styles.darkText,
            { fontSize: getScaledFont(14) }
          ]}>
            Ajuste o tamanho da fonte exibida no aplicativo.
          </Text>
          
          <View style={styles.buttonRow}>
            {['small', 'medium', 'large'].map((size) => (
              <TouchableOpacity
                key={size}
                style={[styles.sizeButton, fontSize === size && styles.sizeButtonActive]}
                onPress={() => handleFontSize(size as 'small'|'medium'|'large')}
              >
                <Text style={[
                  styles.sizeButtonText, 
                  fontSize === size && styles.sizeButtonTextActive,
                  { fontSize: getScaledFont(16) }
                ]}>
                  {size === 'small' ? 'P' : size === 'medium' ? 'M' : 'G'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={[styles.card, darkMode && styles.cardDark]}>
          <Text style={[
            styles.cardTitle, 
            darkMode && styles.darkText,
            { fontSize: getScaledFont(16) }
          ]}>
            Modo escuro
          </Text>
          
          <Text style={[
            styles.cardDescription, 
            darkMode && styles.darkText,
            { fontSize: getScaledFont(14) }
          ]}>
            Ativa o tema escuro nas telas do app.
          </Text>
          
          <TouchableOpacity style={styles.toggleRow} onPress={handleToggleDark}>
            <View style={[styles.toggleTrack, darkMode && styles.toggleTrackActive]}>
              <View style={[styles.toggleThumb, darkMode && styles.toggleThumbActive]} />
            </View>
            <Text style={[
              styles.toggleText, 
              darkMode && styles.darkText,
              { fontSize: getScaledFont(14) }
            ]}>
              {darkMode ? 'Ativado' : 'Desativado'}
            </Text>
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
  title: { fontWeight: 'bold', color: '#222', marginBottom: 8 }, 
  subtitle: { color: '#555', marginBottom: 20 },                  
  darkText: { color: '#f8f8f8' },
  card: { backgroundColor: '#f8f4f7', borderRadius: 24, padding: 18, marginBottom: 16, borderWidth: 1, borderColor: '#eee' },
  cardDark: { backgroundColor: '#2a2a2a', borderColor: '#444' },
  cardTitle: { fontWeight: '700', marginBottom: 8, color: '#222' }, 
  cardDescription: { color: '#555' },                                
  buttonRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  sizeButton: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 14, paddingVertical: 10, paddingHorizontal: 18 },
  sizeButtonActive: { backgroundColor: '#e01a5f', borderColor: '#e01a5f' },
  sizeButtonText: { color: '#333', fontWeight: '700' },             
  sizeButtonTextActive: { color: '#fff' },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
  toggleTrack: { width: 60, height: 32, borderRadius: 18, backgroundColor: '#ddd', padding: 4 },
  toggleTrackActive: { backgroundColor: '#e01a5f' },
  toggleThumb: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#fff', transform: [{ translateX: 0 }] },
  toggleThumbActive: { transform: [{ translateX: 26 }] },
  toggleText: { fontWeight: '700', color: '#333' },                  
});