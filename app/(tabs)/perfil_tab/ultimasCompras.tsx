import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from '@react-navigation/native';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../_lib/api";
import { getUserId } from "../../_lib/session";
import { useTheme } from "../../_lib/theme";

interface Produto {
    id: number;
    name: string;
    descricao: string;
    imagem?: string[];
    preco: number;
    disponibilidade: boolean;
    user?: {
        name?: string;
        curso?: string;
    };
}

interface Interest {
    id: number;
    status?: string;
    createdAt?: string;
    localEscolhido?: string[];
    horarioEscolhido?: string[];
    produto?: Produto;
    vendedor?: {
        name?: string;
        email?: string;
        curso?: string;
    };
}

export default function ultimascompras() {
    const { darkMode } = useTheme();
    const [pedidos, setPedidos] = useState<Interest[]>([])
    const [loading, setLoading] = useState(true)
    const [userId, setUserId] = useState<number | null>(null)

    const handleCancelInterest = async (interestId: number) => {
        if (!userId) return

        try {
            await api.cancelInterest(interestId, userId)
            setPedidos((current) => current.filter((pedido) => pedido.id !== interestId))
        } catch (err: any) {
            console.error(err)
            Alert.alert('Erro', err?.message || 'Falha ao cancelar interesse')
        }
    }

    const isFocused = useIsFocused()

    useEffect(() => {
        let mounted = true

        getUserId()
            .then((id) => {
                if (!mounted) return
                setUserId(id)
                if (!id) {
                    setLoading(false)
                    return
                }
                return api.listBuyerInterests(id)
            })
            .then((data) => {
                if (!mounted || !data) return
                setPedidos(Array.isArray(data) ? data : [])
            })
            .catch((error) => {
                console.error('Erro carregando pedidos:', error)
            })
            .finally(() => {
                if (mounted) setLoading(false)
            })

        return () => {
            mounted = false
        }
    }, [isFocused])

    return (
        <SafeAreaView style={[style.fundo, darkMode && style.darkFundo]}>

            <TouchableOpacity
                style={style.botaoVoltar}
                onPress={() => router.push('/perfil_tab')}
            >
                {/* Ícone de voltar dinâmico para destacar bem no fundo escuro */}
                <Ionicons name="chevron-back" size={30} color={darkMode ? "#fff" : "#e01a5f"} />
            </TouchableOpacity>

            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                <View>
                    <Text style={[style.principal, darkMode && style.darkText]}>Últimas Compras</Text>
                </View>

                <View style={[style.container, darkMode && style.darkContainer]}>
                    {loading ? (
                        <Text style={[style.emptyText, darkMode && style.darkText]}>Carregando suas compras...</Text>
                    ) : !userId ? (
                        <View style={[style.emptyState, darkMode && style.darkEmptyState]}>
                            <Text style={[style.emptyTitle, darkMode && style.darkText]}>Você precisa fazer login para ver suas compras.</Text>
                            <TouchableOpacity style={[style.loginButton, darkMode && style.darkLoginButton]} onPress={() => router.push('/')}>
                                <Text style={[style.loginButtonText, darkMode && style.darkLoginButtonText]}>Fazer login</Text>
                            </TouchableOpacity>
                        </View>
                    ) : pedidos.length === 0 ? (
                        <View style={[style.emptyState, darkMode && style.darkEmptyState]}>
                            <Text style={[style.emptyTitle, darkMode && style.darkText]}>Nenhuma compra registrada ainda.</Text>
                        </View>
                    ) : (
                        pedidos.map((pedido) => {
                            const produto = pedido.produto
                            const isPendente = produto?.disponibilidade === true
                            const situacao = isPendente ? 'Pendente' : 'Vendido' 
                            
                            const preco = produto?.preco ? Number(produto.preco).toFixed(2).replace('.', ',') : '0,00'
                            const locais = Array.isArray(pedido.localEscolhido) ? pedido.localEscolhido.join(', ') : (pedido.localEscolhido || '-')
                            const horarios = Array.isArray(pedido.horarioEscolhido) ? pedido.horarioEscolhido.join(', ') : (pedido.horarioEscolhido || '-')

                            return (
                                <View
                                    key={pedido.id}
                                    style={[
                                        style.card,
                                        isPendente && style.cardAndamento, // Rosa claro se estiver pendente no LightMode
                                        darkMode && style.darkCard,        // Cinza escuro se for Vendido no DarkMode
                                        (darkMode && isPendente) && style.darkCardAndamento // Vinho/Rosa escuro se for Pendente no DarkMode
                                    ]}
                                >
                                    <View style={style.linha}>
                                        <Image
                                            style={style.imagem}
                                            source={{ uri: produto?.imagem?.[0] || "https://via.placeholder.com/100" }}
                                        />

                                        <View style={[style.conteudo]}>
                                            <Text 
                                                style={[
                                                    style.title, 
                                                    isPendente && style.titleVenda, // Texto preto para o fundo rosa claro
                                                    darkMode && style.darkText,
                                                    (darkMode && isPendente) && style.darkTextAndamento
                                                ]}
                                            >
                                                {produto?.name || 'Produto'}
                                            </Text>
                                            
                                            <View style={style.infos}>
                                                <Text 
                                                    style={[
                                                        style.preco, 
                                                        isPendente && style.infoVenda,
                                                        darkMode && style.darkText,
                                                        (darkMode && isPendente) && style.darkTextAndamentoSecondary
                                                    ]}
                                                >
                                                    {`R$ ${preco}`}
                                                </Text>
                                                
                                                <Text 
                                                    style={[
                                                        style.situacao, 
                                                        isPendente && style.infoVenda,
                                                        darkMode && style.darkText,
                                                        (darkMode && isPendente) && style.darkTextAndamentoSecondary
                                                    ]}
                                                >
                                                    {situacao}
                                                </Text>
                                            </View>
                                            
                                            <Text style={[style.subText, isPendente && style.infoVenda, darkMode && style.darkText]}>
                                                Vendedor: {pedido.vendedor?.name || 'Desconhecido'}
                                            </Text>
                                            <Text style={[style.subText, isPendente && style.infoVenda, darkMode && style.darkText]}>
                                                Local: {locais}
                                            </Text>
                                            <Text style={[style.subText, isPendente && style.infoVenda, darkMode && style.darkText]}>
                                                Horário: {horarios}
                                            </Text>
                                        </View>
                                    </View>
                                    
                                    <TouchableOpacity
                                        style={[style.cancelButton, darkMode && style.darkCancelButton]}
                                        onPress={() => handleCancelInterest(pedido.id)}
                                    >
                                        <Text style={[style.cancelButtonText, darkMode && style.darkCancelButtonText]}>
                                            Retirar interesse
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    )}
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    // --- DESIGN DO DARKMODE OTIMIZADO ---
    darkFundo: { backgroundColor: '#121212' },
    darkContainer: { backgroundColor: 'transparent' },
    darkText: { color: '#fff' },
    darkCard: { backgroundColor: '#1e1e1e' }, // Card "Vendido" no escuro (Neutro)
    darkCardAndamento: { backgroundColor: '#3a1424' }, // Card "Pendente" no escuro (Vinho elegante)
    darkTextAndamento: { color: '#ffc0d6' },
    darkTextAndamentoSecondary: { color: '#e01a5f' },
    darkLoginButton: { backgroundColor: '#e01a5f' },
    darkLoginButtonText: { color: '#fff' },
    darkEmptyState: { borderColor: '#333', marginTop: 50 },
    darkCancelButton: { backgroundColor: '#2a2a2a' },
    darkCancelButtonText: { color: '#fff' },

    // --- SEUS COMPONENTES BASE ---
    fundo: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    container: {
        display: "flex",
        alignItems: "center"
    },
    card: {
        backgroundColor: "#e01a5f", // Card padrão (Vendido - LightMode)
        width: "90%",
        borderRadius: 30,
        padding: 25,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 12
    },
    cardAndamento: {
        backgroundColor: "#FFC0D6", // Card Pendente - LightMode
    },
    emptyState: {
        width: "90%",
        padding: 24,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#e01a5f",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    emptyTitle: {
        fontSize: 16,
        color: "#333",
        textAlign: "center",
        marginBottom: 12,
    },
    emptyText: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: "#e01a5f",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
    },
    loginButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    subText: {
        marginTop: 4,
        color: "#fff",
        fontSize: 12,
    },
    cancelButton: {
        marginTop: 15,
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
    },
    cancelButtonText: {
        color: '#e01a5f',
        fontWeight: 'bold',
    },
    title: {
        color: "#fff",
        fontWeight: "bold",
    },
    titleVenda: {
        color: "#000",
    },
    preco: {
        color: "#FFC0D6",
        fontWeight: "bold",
    },
    situacao: {
        color: "#FFC0D6",
        fontWeight: "bold",
    },
    infoVenda: {
        color: "#6d505a", // Cor escura para textos dentro do card rosa claro
    },
    imagem: {
        height: 100,
        width: 100,
        resizeMode: "contain",
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    principal: {
        marginTop: 15,
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 22,
    },
    infos: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
    },
    linha: {
        flexDirection: "row",
        alignItems: "center",
    },
    conteudo: {
        flex: 1,
        marginLeft: 10,
    },
    botaoVoltar: {
        position: "absolute",
        top: 16,
        left: 20,
        zIndex: 20,
    },
});