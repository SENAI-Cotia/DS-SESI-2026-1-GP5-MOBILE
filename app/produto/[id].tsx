import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Text from '../_lib/Text';
import api from "../_lib/api";
import { getUserId } from "../_lib/session";
import { useTheme } from '../_lib/theme';

interface Produto {
  id: number;
  name: string;
  descricao: string;
  preco: number;
  condicao?: number;
  disponibilidade?: boolean;
  imagem?: string[];
  local?: string[];
  horario?: string[];
  user?: {
    name?: string;
    curso?: string;
  };
}

const { width } = Dimensions.get("window");

export default function ProdutoPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { darkMode } = useTheme();
  const [produto, setProduto] = useState<Produto | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedLocal, setSelectedLocal] = useState<string | null>(null);
  const [selectedHorario, setSelectedHorario] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    getUserId().then(setUserId).catch(console.error);
  }, []);

  const isFocused = useIsFocused()

  useEffect(() => {
    if (!id) return;
    const productId = Number(id);
    if (isNaN(productId)) return;
    let mounted = true

    setLoading(true)
    api.getProduct(productId)
      .then((data) => { if (mounted) setProduto(data) })
      .catch((error) => {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar o produto.');
      })
      .finally(() => { if (mounted) setLoading(false) })

    return () => { mounted = false }
  }, [id, isFocused]);

  const imagens = produto?.imagem || [];
  const mainImage = imagens.length > 0 ? imagens[selectedImageIndex] : undefined;

  const canSubmit = !!selectedLocal && !!selectedHorario && !!produto && produto.disponibilidade !== false;

  const handleInterest = async () => {
    if (!produto || !userId) {
      Alert.alert('Erro', 'Faça login para demonstrar interesse.');
      router.push('/');
      return;
    }
    if (!selectedLocal || !selectedHorario) {
      Alert.alert('Erro', 'Selecione local e horário antes de enviar o interesse.');
      return;
    }
    setSubmitting(true);
    try {
      await api.createInterest({
        userId,
        produtoId: produto.id,
        local: [selectedLocal],
        horario: [selectedHorario],
      });
      Alert.alert('Sucesso', 'Interesse enviado ao vendedor.');
    } catch (err: any) {
      Alert.alert('Erro', err?.message || 'Falha ao registrar interesse');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={[style.fundo, darkMode && style.fundoDark]}>
        <Text style={[style.loadingText, darkMode && style.loadingTextDark]}>Carregando produto...</Text>
      </View>
    );
  }

  if (!produto) {
    return (
      <View style={[style.fundo, darkMode && style.fundoDark]}>
        <Text style={[style.loadingText, darkMode && style.loadingTextDark]}>Produto não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={[style.fundo, darkMode && style.fundoDark]}>
      <TouchableOpacity style={style.botaoVoltar} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={30} color="#fff" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={style.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={[style.card, darkMode && style.cardDark]}>
          <View style={style.header}>
            <Text style={[style.title, darkMode && style.titleDark]}>Produto</Text>
            <Text style={style.price}>R$ {Number(produto.preco || 0).toFixed(2).replace('.', ',')}</Text>
          </View>

          <View style={style.imageArea}>
            {mainImage ? (
              <Image source={{ uri: mainImage }} style={style.mainImage} resizeMode="cover" />
            ) : (
              <View style={[style.imagePlaceholder, darkMode && style.imagePlaceholderDark]}><Text style={[style.placeholderText, darkMode && style.placeholderTextDark]}>Sem imagem</Text></View>
            )}
          </View>

          {imagens.length > 1 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={style.thumbnailRow}>
              {imagens.map((uri, index) => (
                <TouchableOpacity key={index} onPress={() => setSelectedImageIndex(index)}>
                  <Image source={{ uri }} style={[style.thumbnail, selectedImageIndex === index && style.thumbnailSelected]} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          <View style={style.section}>
            <Text style={[style.sectionTitle, darkMode && style.sectionTitleDark]}>{produto.name}</Text>
            <Text style={[style.description, darkMode && style.descriptionDark]}>{produto.descricao}</Text>
            <Text style={[style.meta, darkMode && style.metaDark]}>Condição: {produto.condicao ?? 'N/A'}/10</Text>
            <Text style={[style.meta, darkMode && style.metaDark]}>Vendedor: {produto.user?.name ?? 'Vendedor'}</Text>
            <Text style={[style.meta, darkMode && style.metaDark]}>Curso: {produto.user?.curso ?? '-'}</Text>
          </View>

          <View style={style.tagsRow}>
            <View style={style.tagGroup}>
              <Text style={[style.sectionLabel, darkMode && style.sectionLabelDark]}>Local</Text>
              <View style={style.tagsContainer}>
                {(produto.local ?? ['Campus', 'Biblioteca', 'Sala de aula']).map((local) => (
                  <TouchableOpacity
                    key={local}
                    style={[style.tag, darkMode && style.tagDark, selectedLocal === local && style.tagSelected]}
                    onPress={() => setSelectedLocal(local)}
                  >
                    <Text style={[style.tagText, darkMode && style.tagTextDark, selectedLocal === local && style.tagTextSelected]}>{local}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={style.tagGroup}>
              <Text style={[style.sectionLabel, darkMode && style.sectionLabelDark]}>Horário</Text>
              <View style={style.tagsContainer}>
                {(produto.horario ?? ['Manhã', 'Tarde', 'Noite']).map((horario) => (
                  <TouchableOpacity
                    key={horario}
                    style={[style.tag, darkMode && style.tagDark, selectedHorario === horario && style.tagSelected]}
                    onPress={() => setSelectedHorario(horario)}
                  >
                    <Text style={[style.tagText, darkMode && style.tagTextDark, selectedHorario === horario && style.tagTextSelected]}>{horario}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[style.button, darkMode && style.buttonDark, (!canSubmit || submitting) && style.buttonDisabled]}
            onPress={handleInterest}
            disabled={!canSubmit || submitting}
          >
            <Text style={style.buttonText}>{produto.disponibilidade === false ? 'PRODUTO VENDIDO' : submitting ? 'ENVIANDO...' : 'DEMONSTRAR INTERESSE'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  fundo: { flex: 1, backgroundColor: '#fff', paddingTop: 40, },
  loadingText: { textAlign: 'center', marginTop: 40, color: '#333' },
  botaoVoltar: { position: 'absolute', top: 40, left: 20, zIndex: 10, backgroundColor: '#e01a5f', borderRadius: 999, padding: 8 },
  scrollContainer: { paddingTop: 80, paddingHorizontal: 16, paddingBottom: 40 },
  card: { backgroundColor: '#f9f4f6', borderRadius: 28, padding: 20, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, elevation: 5, },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  price: { fontSize: 18, fontWeight: '700', color: '#e01a5f' },
  imageArea: { width: '100%', height: 260, borderRadius: 24, overflow: 'hidden', backgroundColor: '#e6e6e6', marginBottom: 12 },
  mainImage: { width: '100%', height: '100%' },
  imagePlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  placeholderText: { color: '#666' },
  thumbnailRow: { marginBottom: 18 },
  thumbnail: { width: 60, height: 60, borderRadius: 16, marginRight: 10, borderWidth: 1, borderColor: '#ddd' },
  thumbnailSelected: { borderColor: '#e01a5f' },
  section: { marginBottom: 18 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#000' },
  description: { fontSize: 14, color: '#444', lineHeight: 20, marginBottom: 10 },
  meta: { fontSize: 13, color: '#666', marginBottom: 4 },
  tagsRow: { marginBottom: 20 },
  tagGroup: { marginBottom: 12 },
  sectionLabel: { fontSize: 14, fontWeight: '700', color: '#333', marginBottom: 10 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  tag: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 18, paddingVertical: 8, paddingHorizontal: 12, marginRight: 8, marginBottom: 8 },
  tagSelected: { backgroundColor: '#e01a5f', borderColor: '#e01a5f' },
  tagText: { color: '#333', fontSize: 12 },
  tagTextSelected: { color: '#fff' },
  button: { backgroundColor: '#e01a5f', borderRadius: 25, paddingVertical: 14, alignItems: 'center' },
  buttonDark: { backgroundColor: '#ff6f95' },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  fundoDark: { backgroundColor: '#121212' },
  cardDark: { backgroundColor: '#1f1f1f' },
  titleDark: { color: '#f5f5f5' },
  imagePlaceholderDark: { backgroundColor: '#2b2b2f' },
  placeholderTextDark: { color: '#c1c1c7' },
  sectionTitleDark: { color: '#f5f5f5' },
  descriptionDark: { color: '#c1c1c7' },
  metaDark: { color: '#aaaaaa' },
  sectionLabelDark: { color: '#f5f5f5' },
  tagDark: { backgroundColor: '#2b2b2f', borderColor: '#444' },
  tagTextDark: { color: '#f5f5f5' },
});
