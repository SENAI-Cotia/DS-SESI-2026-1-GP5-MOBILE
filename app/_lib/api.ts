const DEFAULT_BASE_URL = "http://10.92.199.17:3000"

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
    const err =
      (data && (data.error || data.message || data.msg)) ||
      (typeof data === 'string' ? data : null) ||
      res.statusText
    throw new Error(String(err))
  }

  return data
}

export async function register(payload: { email: string; password: string; name: string; rm: string; curso: string; telNumero: string }) {
  return request('/cadastro', { method: 'POST', body: JSON.stringify(payload) })
}

export async function login(payload: { email: string; password: string }) {
  return request('/login', { method: 'POST', body: JSON.stringify(payload) })
}

export async function getCursos() {
  return request('/cursos')
}

export async function createProduct(payload: { name: string; preco: number; condicao: number; imagem?: string[]; descricao: string; disponibilidade?: boolean; atacado?: boolean; userId: number }) {
  return request('/produtos', { method: 'POST', body: JSON.stringify(payload) })
}

export async function listProducts(categoria?: string) {
  const q = categoria ? `?categoria=${encodeURIComponent(categoria)}` : ''
  return request(`/produtos${q}`)
}

export async function getProduct(id: number) {
  return request(`/produtos/${id}`)
}

export async function listMyProducts(userId: number) {
  return request(`/produtos/meus?userId=${Number(userId)}`)
}

export async function listBuyerInterests(userId: number) {
  return request(`/produtos/interesses/comprador?userId=${Number(userId)}`)
}

export async function listSellerInterests(userId: number) {
  return request(`/produtos/interesses/vendedor?userId=${Number(userId)}`)
}

export async function createInterest(payload: { userId: number; produtoId: number; localId?: number; horarioId?: number; local?: unknown; horario?: unknown }) {
  return request('/produtos/interesse', { method: 'POST', body: JSON.stringify(payload) })
}

export async function cancelInterest(id: number, userId: number) {
  return request(`/produtos/interesses/${id}`, { method: 'DELETE', body: JSON.stringify({ userId }) })
}

export async function updateProduct(id: number, payload: Partial<{ name: string; preco: number; condicao: number; imagem: string[]; descricao: string; disponibilidade: boolean; userId: number; localId: number; horarioId: number; local: unknown; horario: unknown }>) {
  return request(`/produtos/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
}

export async function updateUser(id: number, payload: Partial<{ email: string; password?: string; name: string; rm: string | number; curso: string; telNumero: string; funcao?: string }>) {
  return request(`/cadastro/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
}

export async function deleteProduct(id: number, userId: number) {
  return request(`/produtos/${id}`, { method: 'DELETE', body: JSON.stringify({ userId }) })
}

export default {
  setBaseUrl,
  register,
  login,
  createProduct,
  listProducts,
  getProduct,
  listMyProducts,
  listBuyerInterests,
  listSellerInterests,
  createInterest,
  cancelInterest,
  updateProduct,
  updateUser,
  deleteProduct,
  getCursos,
}
