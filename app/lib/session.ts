import AsyncStorage from '@react-native-async-storage/async-storage'

export type UserSession = {
  id: number
  email: string
  name: string
  rm?: string
  curso?: string
  telNumero?: string
  funcao?: string
}

const USER_SESSION_KEY = 'userSession'

export async function saveUserSession(user: UserSession) {
  await AsyncStorage.setItem(USER_SESSION_KEY, JSON.stringify(user))
}

export async function getUserSession(): Promise<UserSession | null> {
  const json = await AsyncStorage.getItem(USER_SESSION_KEY)
  if (!json) return null
  try {
    return JSON.parse(json) as UserSession
  } catch {
    return null
  }
}

export async function clearUserSession() {
  await AsyncStorage.removeItem(USER_SESSION_KEY)
}

export async function getUserId(): Promise<number | null> {
  const session = await getUserSession()
  return session?.id ?? null
}

export async function getUserName(): Promise<string | null> {
  const session = await getUserSession()
  return session?.name ?? null
}

export async function getUserCurso(): Promise<string | null> {
  const session = await getUserSession()
  return session?.curso ?? null
}
