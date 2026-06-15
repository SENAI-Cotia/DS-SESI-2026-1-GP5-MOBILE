import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import api from "../../_lib/api";
import { getUserId } from "../../_lib/session";
import { parseCurrency } from "../../_lib/validation";
import { useTheme } from "../../_lib/theme";  

const { width } = Dimensions.get("window");

export default function EditarVenda() {
  const { darkMode } = useTheme();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [produtoId, setProdutoId] = useState<number | null>(null);
  const [produto, setProduto] = useState<any>(null);
  const [disponibilidade, setDisponibilidade] = useState(true);
  const [condicao, setCondicao] = useState(5);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    getUserId().then(setUserId).catch(console.error);
  }, []);

  useEffect(() => {
    const pid = Number(id);
    if (!pid || isNaN(pid)) return;
    setProdutoId(pid);
    api.getProduct(pid)
      .then((data) => {
        setProduto(data)
        setDisponibilidade(data?.disponibilidade ?? true)
        setCondicao(data?.condicao ?? 5)
      })
      .catch((err) => {
        console.error(err);
        Alert.alert('Erro', 'Não foi possível carregar o produto.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = async () => {
    if (!produtoId || !userId) {
      Alert.alert('Erro', 'Não foi possível localizar o produto ou usuário.')
      return router.push('/');
    }

    const nome = String(produto?.name ?? '').trim()
    const preco = parseCurrency(String(produto?.preco ?? '0'))
    const descricao = String(produto?.descricao ?? '').trim()

    if (!nome) {
      Alert.alert('Erro', 'Informe o nome do produto.')
      return
    }

    if (preco <= 0) {
      Alert.alert('Erro', 'Informe um preço válido maior que zero.')
      return
    }

    if (!descricao) {
      Alert.alert('Erro', 'Informe a descrição do produto.')
      return
    }

    setSaving(true);
    try {
      await api.updateProduct(produtoId, {
        ...produto,
        disponibilidade,
        condicao,
      });
      Alert.alert('Sucesso', 'Produto atualizado.');
      router.push('/perfil_tab/itensAVenda');
    } catch (err: any) {
      Alert.alert('Erro', err?.message || 'Falha ao atualizar produto');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <View style={style.fundo}><Text style={style.loadingText}>Carregando...</Text></View>
  );

  if (!produto) return (
    <View style={style.fundo}><Text style={style.loadingText}>Produto não encontrado.</Text></View>
  );

  return (
    <ScrollView contentContainerStyle={[style.container, darkMode && style.darkFundo]}>
      <TouchableOpacity style={style.botaoVoltar} onPress={() => router.push('/perfil_tab')}>
        <Ionicons name="chevron-back" size={30} color="#fff" />
      </TouchableOpacity>

      <View style={[style.card, darkMode && style.darkCard]}>
        <Text style={[style.title, darkMode && style.darkText]}>Editar produto</Text>

        <Image source={{ uri: produto.imagem?.[0] || 'https://via.placeholder.com/150' }} style={style.imagem} />

        <Text style={[style.label, darkMode && style.darkText]}>Nome</Text>
        <TextInput style={[style.input, darkMode && style.darkInput]} value={produto.name} onChangeText={(text) => setProduto({ ...produto, name: text })} />

        <Text style={[style.label, darkMode && style.darkText]}>Preço</Text>
        <TextInput style={[style.input, darkMode && style.darkInput]} value={String(produto.preco)} onChangeText={(text) => setProduto({ ...produto, preco: Number(text.replace(/[^0-9.,]/g,'').replace(',','.')) })} keyboardType="numeric" />

        <Text style={[style.label, darkMode && style.darkText]}>Descrição</Text>
        <TextInput style={[style.input, { height: 80 }, darkMode && style.darkInput]} value={produto.descricao} onChangeText={(text) => setProduto({ ...produto, descricao: text })} multiline />

        <Text style={[style.label, darkMode && style.darkText]}>Status</Text>
        <TouchableOpacity
          style={[
            style.statusButton,
            disponibilidade ? style.statusAvailable : style.statusSold,
          ]}
          onPress={() => setDisponibilidade((prev) => !prev)}
        >
          <Text style={style.statusButtonText}>{disponibilidade ? 'Disponível' : 'Vendido'}</Text>
        </TouchableOpacity>

        <Text style={[style.label, darkMode && style.darkText]}>Condição</Text>
        <View style={style.condicaoRow}>
          <TouchableOpacity style={style.condicaoControl} onPress={() => setCondicao((prev) => Math.max(1, prev - 1))}>
            <Text style={style.condicaoControlText}>-</Text>
          </TouchableOpacity>
          <Text style={[style.condicaoValue, darkMode && style.darkText]}>{condicao}</Text>
          <TouchableOpacity style={style.condicaoControl} onPress={() => setCondicao((prev) => Math.min(10, prev + 1))}>
            <Text style={style.condicaoControlText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[style.saveButton, saving && style.disabled, darkMode && style.darkSaveButton]} onPress={handleSave} disabled={saving}>
          <Text style={[style.saveText, darkMode && style.darkSaveText]}>{saving ? 'Salvando...' : 'Salvar'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  fundo: { flex: 1, backgroundColor: '#fff', paddingTop: 40 },
  loadingText: { textAlign: 'center', marginTop: 40 },
  container: { padding: 16, paddingTop: 80 },
  botaoVoltar: { backgroundColor: '#e01a5f', width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  card: { backgroundColor: '#f9f4f6', borderRadius: 20, padding: 16 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
  imagem: { width: '100%', height: 180, borderRadius: 12, marginBottom: 10 },
  label: { fontWeight: '700', marginTop: 8, marginBottom: 4 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#eee' },
  statusButton: { paddingVertical: 10, borderRadius: 10, alignItems: 'center', marginTop: 6 },
  statusAvailable: { backgroundColor: '#4CAF50' },
  statusSold: { backgroundColor: '#d43768' },
  statusButtonText: { color: '#fff', fontWeight: '700' },
  condicaoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  condicaoControl: { backgroundColor: '#e01a5f', padding: 8, borderRadius: 6 },
  condicaoControlText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  condicaoValue: { fontSize: 18, fontWeight: '700', marginHorizontal: 12 },
  saveButton: { backgroundColor: '#e01a5f', padding: 12, borderRadius: 10, marginTop: 12, alignItems: 'center' },
  saveText: { color: '#fff', fontWeight: '700' },
  disabled: { opacity: 0.6 },
  darkFundo: {flex: 1, backgroundColor: '#000', paddingTop: 10},
  darkText: { color: '#fff' },
  darkCard: { backgroundColor: '#333' },
  darkSaveButton: { backgroundColor: '#e01a5f' },
  darkSaveText: { color: '#fff' },
  darkInput: { backgroundColor: '#555', color: '#fff', borderColor: '#666' },
});
