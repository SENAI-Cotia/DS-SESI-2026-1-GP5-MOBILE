import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

const DARK_MODE_KEY = 'appDarkMode'

type ThemeContextValue = {
  darkMode: boolean
  loaded: boolean
  setDarkMode(value: boolean): Promise<void>
  toggleDarkMode(): Promise<void>
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkModeState] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem(DARK_MODE_KEY)
      .then((value) => {
        setDarkModeState(value === 'true')
      })
      .catch(() => {})
      .finally(() => setLoaded(true))
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

  const value = useMemo(
    () => ({ darkMode, loaded, setDarkMode, toggleDarkMode }),
    [darkMode, loaded]
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
