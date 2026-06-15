import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from '../../_lib/theme';

const faqs = [
  {
    question: 'Como publicar um item para venda?',
    answer: 'Toque no botão + no topo da tela ou acesse Criar produto. Preencha nome, preço, descrição, imagem, locais e horários.',
  },
  {
    question: 'Como entro em contato com um vendedor?',
    answer: 'Na página do produto, selecione local e horário e toque em Demonstrar Interesse. O vendedor receberá sua notificação.',
  },
  {
    question: 'Como edito meus dados de perfil?',
    answer: 'Acesse Configurações da minha conta no perfil, altere os campos e salve as alterações.',
  },
  {
    question: 'Onde vejo os produtos que estou vendendo?',
    answer: 'Acesse Itens à venda na tela de perfil para ver seus anúncios ativos.',
  },
];

export default function AjudaPage() {
  const { darkMode } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, darkMode && styles.darkBackground]}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/perfil_tab')}>
        <Ionicons name="chevron-back" size={26} color="#fff" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Central de Ajuda</Text>
        <Text style={styles.subtitle}>Dúvidas frequentes sobre o ETROOC</Text>

        {faqs.map((faq, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.question}>{faq.question}</Text>
            <Text style={styles.answer}>{faq.answer}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  darkBackground: { backgroundColor: '#222' },
  container: { flex: 1, backgroundColor: '#fff' },
  backButton: { backgroundColor: '#e01a5f', width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', margin: 16 },
  content: { paddingHorizontal: 20, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#222', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#555', marginBottom: 20 },
  card: { backgroundColor: '#f8f4f7', borderRadius: 24, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: '#eee' },
  question: { fontSize: 16, fontWeight: '700', marginBottom: 8, color: '#222' },
  answer: { fontSize: 14, color: '#555', lineHeight: 20 },
});
