import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import api from "../../lib/api";
import { getUserId } from "../../lib/session";

const { width } = Dimensions.get("window");

export default function EditarVenda() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [produtoId, setProdutoId] = useState<number | null>(null);
  const [produto, setProduto] = useState<any>(null);
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
      .then((data) => setProduto(data))
      .catch((err) => {
        console.error(err);
        Alert.alert('Erro', 'Não foi possível carregar o produto.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = async () => {
    if (!produtoId || !userId) return router.push('/');
    setSaving(true);
    try {
      await api.updateProduct(produtoId, produto);
      Alert.alert('Sucesso', 'Produto atualizado.');
      router.push('/(tabs)/perfil/itensAVenda');
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
    <ScrollView contentContainerStyle={style.container}>
      <TouchableOpacity style={style.botaoVoltar} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={30} color="#fff" />
      </TouchableOpacity>

      <View style={style.card}>
        <Text style={style.title}>Editar produto</Text>

        <Image source={{ uri: produto.imagem?.[0] || 'https://via.placeholder.com/150' }} style={style.imagem} />

        <Text style={style.label}>Nome</Text>
        <TextInput style={style.input} value={produto.name} onChangeText={(text) => setProduto({ ...produto, name: text })} />

        <Text style={style.label}>Preço</Text>
        <TextInput style={style.input} value={String(produto.preco)} onChangeText={(text) => setProduto({ ...produto, preco: Number(text.replace(/[^0-9.,]/g,'').replace(',','.')) })} keyboardType="numeric" />

        <Text style={style.label}>Descrição</Text>
        <TextInput style={[style.input, { height: 80 }]} value={produto.descricao} onChangeText={(text) => setProduto({ ...produto, descricao: text })} multiline />

        <TouchableOpacity style={[style.saveButton, saving && style.disabled]} onPress={handleSave} disabled={saving}>
          <Text style={style.saveText}>{saving ? 'Salvando...' : 'Salvar'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  fundo: { flex: 1, backgroundColor: '#fff', paddingTop: 40 },
  loadingText: { textAlign: 'center', marginTop: 40 },
  container: { padding: 16, paddingTop: 80 },
  botaoVoltar: { position: 'absolute', top: 40, left: 20, zIndex: 10, backgroundColor: '#e01a5f', borderRadius: 999, padding: 8 },
  card: { backgroundColor: '#f9f4f6', borderRadius: 20, padding: 16 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
  imagem: { width: '100%', height: 180, borderRadius: 12, marginBottom: 10 },
  label: { fontWeight: '700', marginTop: 8, marginBottom: 4 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#eee' },
  saveButton: { backgroundColor: '#e01a5f', padding: 12, borderRadius: 10, marginTop: 12, alignItems: 'center' },
  saveText: { color: '#fff', fontWeight: '700' },
  disabled: { opacity: 0.6 },
});
