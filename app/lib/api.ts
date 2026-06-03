const DEFAULT_BASE_URL = "http://10.0.2.2:3000" // Android emulator -> use your machine host for device

let baseUrl = DEFAULT_BASE_URL

export function setBaseUrl(url: string) {
  baseUrl = url
}

async function request(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  })

  const text = await res.text()
  let data: any = text
  try { data = text ? JSON.parse(text) : null } catch { data = text }

  if (!res.ok) {
    const err = (data && data.error) || data || res.statusText
    throw new Error(err)
  }

  return data
}

export async function register(payload: { email: string; password: string; name: string; rm: string; curso: string; telNumero: string }) {
  return request('/cadastro', { method: 'POST', body: JSON.stringify(payload) })
}

export async function login(payload: { email: string; password: string }) {
  return request('/login', { method: 'POST', body: JSON.stringify(payload) })
}

export async function createProduct(payload: { name: string; categoria: string; preco: number; condicao: string; imagem?: string; descricao: string; disponibilidade?: boolean; atacado?: boolean; userId: number }) {
  return request('/produtos', { method: 'POST', body: JSON.stringify(payload) })
}

export async function listProducts(categoria?: string) {
  const q = categoria ? `?categoria=${encodeURIComponent(categoria)}` : ''
  return request(`/produtos${q}`)
}

export default { setBaseUrl, register, login, createProduct, listProducts }
