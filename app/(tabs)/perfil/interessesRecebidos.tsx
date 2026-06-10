import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from '@react-navigation/native';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import api from "../../_lib/api";
import { getUserId } from "../../_lib/session";

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
  };
}

const { width } = Dimensions.get("window");

export default function InteressesRecebidosPage() {
  const router = useRouter();
  const [interesses, setInteresses] = useState<Interesse[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  const isFocused = useIsFocused()

  useEffect(() => {
    let mounted = true
    getUserId()
      .then((id) => {
        if (!mounted) return
        setUserId(id);
        if (id) {
          return api.listSellerInterests(id);
        }
        return null;
      })
      .then((data) => {
        if (!mounted || !data) return
        if (data && Array.isArray(data)) {
          setInteresses(data);
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar os interesses recebidos.');
      })
      .finally(() => { if (mounted) setLoading(false) })

    return () => { mounted = false }
  }, [isFocused]);

  const handleViewProduct = (produtoId?: number) => {
    if (!produtoId) return;
    router.push(`/produto/${produtoId}`);
  };

  return (
    <View style={style.fundo}>
      <TouchableOpacity style={style.botaoVoltar} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={30} color="#fff" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={style.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={style.titulo}>Interesses Recebidos</Text>

        {loading ? (
          <Text style={style.message}>Carregando interesses...</Text>
        ) : !userId ? (
          <View style={style.emptyState}>
            <Text style={style.emptyTitle}>Faça login para ver seus interesses recebidos.</Text>
            <TouchableOpacity style={style.loginButton} onPress={() => router.push('/') }>
              <Text style={style.loginButtonText}>Fazer login</Text>
            </TouchableOpacity>
          </View>
        ) : interesses.length === 0 ? (
          <View style={style.emptyState}>
            <Text style={style.emptyTitle}>Nenhum interesse recebido ainda.</Text>
            <Text style={style.emptySubtitle}>Publique um produto para atrair compradores.</Text>
          </View>
        ) : (
          interesses.map((interesse) => (
            <View key={interesse.id} style={style.card}>
              <View style={style.headerCard}>
                <View style={style.avatar}>{interesse.comprador?.name?.charAt(0).toUpperCase() ?? 'C'}</View>
                <View style={style.infoBox}>
                  <Text style={style.buyerName}>{interesse.comprador?.name || 'Comprador'}</Text>
                  <Text style={style.buyerMeta}>{interesse.comprador?.curso || ''}</Text>
                  <Text style={style.buyerMeta}>{interesse.comprador?.email || ''}</Text>
                  <Text style={style.buyerMeta}>{interesse.comprador?.telNumero || ''}</Text>
                </View>
              </View>
              <View style={style.detailRow}>
                <Text style={style.label}>Produto:</Text>
                <Text style={style.value}>{interesse.produto?.name || '-'}</Text>
              </View>
              <View style={style.detailRow}>
                <Text style={style.label}>Preço:</Text>
                <Text style={style.value}>R$ {Number(interesse.produto?.preco || 0).toFixed(2).replace('.', ',')}</Text>
              </View>
              <View style={style.detailRow}>
                <Text style={style.label}>Local:</Text>
                <Text style={style.value}>{(interesse.localEscolhido || []).join(', ') || '-'}</Text>
              </View>
              <View style={style.detailRow}>
                <Text style={style.label}>Horário:</Text>
                <Text style={style.value}>{(interesse.horarioEscolhido || []).join(', ') || '-'}</Text>
              </View>
              <View style={style.footerRow}>
                <Text style={style.status}>{interesse.status || 'pendente'}</Text>
                <TouchableOpacity style={style.linkButton} onPress={() => handleViewProduct(interesse.produto?.id)}>
                  <Text style={style.linkText}>Ver produto</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  fundo: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { paddingTop: 80, paddingHorizontal: 16, paddingBottom: 40 },
  botaoVoltar: { position: 'absolute', top: 40, left: 20, zIndex: 10, backgroundColor: '#e01a5f', width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#222', marginBottom: 20 },
  message: { textAlign: 'center', color: '#555', marginTop: 20 },
  emptyState: { alignItems: 'center', justifyContent: 'center', marginTop: 40 },
  emptyTitle: { fontSize: 16, color: '#333', fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  emptySubtitle: { fontSize: 14, color: '#666', textAlign: 'center' },
  loginButton: { backgroundColor: '#e01a5f', borderRadius: 20, paddingVertical: 12, paddingHorizontal: 24, marginTop: 14 },
  loginButtonText: { color: '#fff', fontWeight: '700' },
  card: { backgroundColor: '#f6edf0', borderRadius: 24, padding: 18, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 10, elevation: 4 },
  headerCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#e01a5f', justifyContent: 'center', alignItems: 'center' },
  infoBox: { marginLeft: 12, flex: 1 },
  buyerName: { fontSize: 16, fontWeight: '700', color: '#222' },
  buyerMeta: { fontSize: 13, color: '#666' },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  label: { fontSize: 13, fontWeight: '700', color: '#333' },
  value: { fontSize: 13, color: '#555', maxWidth: width * 0.52, textAlign: 'right' },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 },
  status: { fontSize: 12, fontWeight: '700', color: '#d43768', textTransform: 'uppercase' },
  linkButton: { paddingVertical: 8, paddingHorizontal: 16 },
  linkText: { fontSize: 13, fontWeight: '700', color: '#e01a5f' },
});
