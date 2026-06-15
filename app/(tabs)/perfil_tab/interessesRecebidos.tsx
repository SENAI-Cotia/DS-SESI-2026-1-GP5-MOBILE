import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from '@react-navigation/native';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import api from "../../_lib/api";
import { getUserId } from "../../_lib/session";
import { useTheme } from "../../_lib/theme";

interface Interesse {
  id: number;
  status?: string;
  createdAt?: string;
  localEscolhido?: string[];
  horarioEscolhido?: string[];
  comprador?: {
    name?: string;
    email?: string;
    curso?: string;
    telNumero?: string;
  };
  produto?: {
    id?: number;
    name?: string;
    preco?: number;
    imagem?: string[];
    disponibilidade?: boolean;
  };
}

const { width } = Dimensions.get("window");

export default function InteressesRecebidosPage() {
  const { darkMode } = useTheme();
  const router = useRouter();
  const [interesses, setInteresses] = useState<Interesse[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    let mounted = true;
    getUserId()
      .then((id) => {
        if (!mounted) return;
        setUserId(id);
        if (id) {
          return api.listSellerInterests(id);
        }
        return null;
      })
      .then((data) => {
        if (!mounted || !data) return;
        if (data && Array.isArray(data)) {
          setInteresses(data);
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar os interesses recebidos.');
      })
      .finally(() => { if (mounted) setLoading(false); });

    return () => { mounted = false; };
  }, [isFocused]);

  const handleViewProduct = (produtoId?: number) => {
    if (!produtoId) return;
    router.push(`/produto/${produtoId}`);
  };

  return (
    <View style={[style.fundo, darkMode && style.darkFundo]}>
      <TouchableOpacity style={style.botaoVoltar} onPress={() => router.push('/perfil_tab')}>
        <Ionicons name="chevron-back" size={30} color="#fff" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={style.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={[style.titulo, darkMode && style.darkText]}>Interesses Recebidos</Text>

        {loading ? (
          <Text style={[style.message, darkMode && style.darkText]}>Carregando interesses...</Text>
        ) : !userId ? (
          <View style={style.emptyState}>
            <Text style={[style.emptyTitle, darkMode && style.darkText]}>Faça login para ver seus interesses recebidos.</Text>
            <TouchableOpacity style={[style.loginButton, darkMode && style.darkLoginButton]} onPress={() => router.push('/')}>
              <Text style={[style.loginButtonText, darkMode && style.darkLoginButtonText]}>Fazer login</Text>
            </TouchableOpacity>
          </View>
        ) : interesses.length === 0 ? (
          <View style={style.emptyState}>
            <Text style={[style.emptyTitle, darkMode && style.darkText]}>Nenhum interesse recebido ainda.</Text>
            <Text style={[style.emptySubtitle, darkMode && style.darkText]}>Publique um produto para atrair compradores.</Text>
          </View>
        ) : (
          interesses.map((interesse) => {
            const produtoVendido = interesse.produto?.disponibilidade === false;
            const textoStatus = produtoVendido ? 'vendido' : (interesse.status || 'pendente');

            return (
              <View key={interesse.id} style={[style.card, darkMode && style.darkCard]}>
                <View style={style.headerCard}>
                  {/* Avatar do comprador */}
                  <View style={style.avatar}>
                    <Text style={style.avatarText}>
                      {interesse.comprador?.name?.charAt(0).toUpperCase() ?? 'C'}
                    </Text>
                  </View>

                  <View style={style.infoBox}>
                    <Text style={[style.buyerName, darkMode && style.darkText]}>{interesse.comprador?.name || 'Comprador'}</Text>
                    <Text style={[style.buyerMeta, darkMode && style.darkText]}>{interesse.comprador?.curso || ''}</Text>
                    <Text style={[style.buyerMeta, darkMode && style.darkText]}>{interesse.comprador?.email || ''}</Text>
                    <Text style={[style.buyerMeta, darkMode && style.darkText]}>{interesse.comprador?.telNumero || ''}</Text>
                  </View>
                </View>

                <View style={style.detailRow}>
                  <Text style={[style.label, darkMode && style.darkText]}>Produto:</Text>
                  <Text style={[style.value, darkMode && style.darkText]}>{interesse.produto?.name || '-'}</Text>
                </View>

                <View style={style.detailRow}>
                  <Text style={[style.label, darkMode && style.darkText]}>Preço:</Text>
                  <Text style={[style.value, darkMode && style.darkText]}>R$ {Number(interesse.produto?.preco || 0).toFixed(2).replace('.', ',')}</Text>
                </View>

                <View style={style.detailRow}>
                  <Text style={[style.label, darkMode && style.darkText]}>Local:</Text>
                  <Text style={[style.value, darkMode && style.darkText]}>
                    {(interesse.localEscolhido || []).join(', ') || '-'}
                  </Text>
                </View>

                <View style={style.detailRow}>
                  <Text style={[style.label, darkMode && style.darkText]}>Horário:</Text>
                  <Text style={[style.value, darkMode && style.darkText]}>
                    {(interesse.horarioEscolhido || []).join(', ') || '-'}
                  </Text>
                </View>

                <View style={style.footerRow}>
                  <Text style={[
                    style.status,
                    produtoVendido && style.statusVendido,
                    darkMode && style.darkText
                  ]}>
                    {textoStatus}
                  </Text>
                  <TouchableOpacity style={style.linkButton} onPress={() => handleViewProduct(interesse.produto?.id)}>
                    <Text style={[style.linkText, darkMode && style.darkText]}>Ver produto</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  darkFundo: { backgroundColor: '#333' },
  darkText: { color: '#fff' },
  darkLoginButton: { backgroundColor: '#e01a5f' },
  darkLoginButtonText: { color: '#fff' },
  darkCard: { backgroundColor: '#444' },
  fundo: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { paddingTop: 80, paddingHorizontal: 16, paddingBottom: 40 },
  botaoVoltar: { position: 'absolute', top: 40, left: 16, zIndex: 10, backgroundColor: '#e01a5f', borderRadius: 333, padding: 8, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#222', marginBottom: 20 },
  message: { textAlign: 'center', color: '#555', marginTop: 20 },
  emptyState: { alignItems: 'center', justifyContent: 'center', marginTop: 40 },
  emptyTitle: { fontSize: 16, color: '#333', fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  emptySubtitle: { fontSize: 14, color: '#666', textAlign: 'center' },
  loginButton: { backgroundColor: '#e01a5f', borderRadius: 20, paddingVertical: 12, paddingHorizontal: 24, marginTop: 14 },
  loginButtonText: { color: '#fff', fontWeight: '700' },
  card: { backgroundColor: '#f6edf0', borderRadius: 24, padding: 18, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 10, elevation: 4 },
  headerCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#e01a5f', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  infoBox: { marginLeft: 12, flex: 1 },
  buyerName: { fontSize: 16, fontWeight: '700', color: '#222' },
  buyerMeta: { fontSize: 13, color: '#666' },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  label: { fontSize: 13, fontWeight: '700', color: '#333' },
  value: { fontSize: 13, color: '#555', maxWidth: width * 0.52, textAlign: 'right' },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 },
  status: { fontSize: 12, fontWeight: '700', color: '#d43768', textTransform: 'uppercase' },
  statusVendido: { color: '#777' },
  linkButton: { paddingVertical: 8, paddingHorizontal: 16 },
  linkText: { fontSize: 13, fontWeight: '700', color: '#e01a5f' },
});