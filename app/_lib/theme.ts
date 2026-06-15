import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

const DARK_MODE_KEY = 'appDarkMode'
const FONT_SIZE_KEY = 'appFontSize'

// Definição dos tipos aceitos para o tamanho
export type FontSizeOption = 'small' | 'medium' | 'large'

// Mapeamento de multiplicadores de escala
const fontScale = {
  small: 0.85,
  medium: 1.0,
  large: 1.25,
}

type ThemeContextValue = {
  darkMode: boolean
  fontSize: FontSizeOption // <--- Novo estado global
  loaded: boolean
  setDarkMode(value: boolean): Promise<void>
  toggleDarkMode(): Promise<void>
  setFontSize(size: FontSizeOption): Promise<void> // <--- Nova função para mudar o tamanho
  getScaledFont(baseSize: number): number // <--- Nova função helper matemática
}

export type ThemeColors = {
  background: string
  surface: string
  card: string
  text: string
  textSecondary: string
  border: string
  placeholder: string
  accent: string
  accentSoft: string
  danger: string
  muted: string
}

export const theme = {
  light: {
    background: '#ffffff',
    surface: '#f5f5f5',
    card: '#ffffff',
    text: '#111111',
    textSecondary: '#666666',
    border: '#dddddd',
    placeholder: '#999999',
    accent: '#e01a5f',
    accentSoft: '#fde8ef',
    danger: '#d62876',
    muted: '#888888',
  } as ThemeColors,
  dark: {
    background: '#121212',
    surface: '#1f1f1f',
    card: '#1f1f1f',
    text: '#f5f5f5',
    textSecondary: '#c1c1c7',
    border: '#333333',
    placeholder: '#8a8a8f',
    accent: '#ff6f95',
    accentSoft: '#2b2b2f',
    danger: '#ff5b8b',
    muted: '#777777',
  } as ThemeColors,
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkModeState] = useState(false)
  const [fontSize, setFontSizeState] = useState<FontSizeOption>('medium') // <--- Inicializa como Médio
  const [loaded, setLoaded] = useState(false)

  // Carrega as preferências salvas ao iniciar o app
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const [savedDark, savedFontSize] = await Promise.all([
          AsyncStorage.getItem(DARK_MODE_KEY),
          AsyncStorage.getItem(FONT_SIZE_KEY)
        ])

        if (savedDark !== null) {
          setDarkModeState(savedDark === 'true')
        }
        if (savedFontSize === 'small' || savedFontSize === 'medium' || savedFontSize === 'large') {
          setFontSizeState(savedFontSize as FontSizeOption)
        }
      } catch {
        // ignore storage errors
      } finally {
        setLoaded(true)
      }
    }

    loadPreferences()
  }, [])

  const setDarkMode = async (value: boolean) => {
    setDarkModeState(value)
    try {
      await AsyncStorage.setItem(DARK_MODE_KEY, String(value))
    } catch {
      // ignore storage errors
    }
  }

  const toggleDarkMode = async () => {
    await setDarkMode(!darkMode)
  }

  // Nova função para salvar o tamanho da fonte escolhido
  const setFontSize = async (size: FontSizeOption) => {
    setFontSizeState(size)
    try {
      await AsyncStorage.setItem(FONT_SIZE_KEY, size)
    } catch {
      // ignore storage errors
    }
  }

  // Função helper matemática que calcula o tamanho real
  const getScaledFont = (baseSize: number) => {
    return baseSize * fontScale[fontSize]
  }

  // Memoriza os valores para evitar re-renderizações desnecessárias
  const value = useMemo(
    () => ({ 
      darkMode, 
      fontSize, 
      loaded, 
      setDarkMode, 
      toggleDarkMode, 
      setFontSize, 
      getScaledFont 
    }),
    [darkMode, fontSize, loaded]
  )

  return React.createElement(ThemeContext.Provider, { value }, children)
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}