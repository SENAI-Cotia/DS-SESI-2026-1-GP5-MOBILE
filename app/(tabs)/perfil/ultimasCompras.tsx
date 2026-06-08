import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../lib/api";
import { getUserId } from "../../lib/session";

const ultimasCompras = [
    {
        id: 1,
        title: "Kit Profissional De Desenho De Metal Com 16 Peças - Geometria",
        preco: 75,
        image: "https://http2.mlstatic.com/D_Q_NP_601127-MLB91214650285_082025-F-kit-profissional-de-desenho-de-metal-com-16-pecas-geometria.webp",
        situacao: "Entregue"
    },
    {
        id: 2,
        title: "Cálculo Numérico - Aprendizagem Com Apoio De Software",
        preco: 30,
        image: "https://m.media-amazon.com/images/I/91u8wQS2G6L._SY342_.jpg",
        situacao: "Em Andamento"
    },
    {
        id: 3,
        title: "Calculadora Científica Casio FX-82MS 240",
        preco: 50,
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_856555-MLA99937166205_112025-F.webp",
        situacao: "Entregue"
    },
    {
        id: 4,
        title: "Matemática Para O Ensino Médio - Caderno De Atividades 2 Ano Vol. 1",
        preco: 25,
        image: "https://images.tcdn.com.br/img/img_prod/937309/matematica_para_o_ensino_medio_caderno_de_atividades_2_ano_vol_01_34759_1_bad8ac1d9b72172555f9ab8236776e08.jpg",
        situacao: "Entregue"
    },
    {
        id: 5,
        title: "Bolo de Pote - Ninho com Morango e Brigadeiro",
        preco: 10,
        image: "https://www.receiteria.com.br/wp-content/uploads/bolo-de-pote-de-chocolate-com-morango-fit-1-730x730.jpg",
        situacao: "Entregue"
    },
];

const { width } = Dimensions.get("window")

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
    }, [])

    return (
        <SafeAreaView style={style.fundo}>

            <TouchableOpacity
                style={style.botaoVoltar}
                onPress={() => router.back()}
            >
                <Ionicons name="chevron-back" size={30} color="#e01a5f" />
            </TouchableOpacity>


            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
            >

                <View>
                    <Text style={style.principal}>Últimas Compras</Text>
                </View>


                <View style={style.container}>
                    {loading ? (
                        <Text style={style.emptyText}>Carregando suas compras...</Text>
                    ) : !userId ? (
                        <View style={style.emptyState}>
                            <Text style={style.emptyTitle}>Você precisa fazer login para ver suas compras.</Text>
                            <TouchableOpacity style={style.loginButton} onPress={() => router.push('/') }>
                                <Text style={style.loginButtonText}>Fazer login</Text>
                            </TouchableOpacity>
                        </View>
                    ) : pedidos.length === 0 ? (
                        <View style={style.emptyState}>
                            <Text style={style.emptyTitle}>Nenhuma compra registrada ainda.</Text>
                        </View>
                    ) : (
                        pedidos.map((pedido) => {
                            const produto = pedido.produto
                            const situacao = pedido.status || (produto?.disponibilidade ? 'Pendente' : 'Entregue')
                            const preco = produto?.preco ? Number(produto.preco).toFixed(2).replace('.', ',') : '0,00'
                            const locais = Array.isArray(pedido.localEscolhido) ? pedido.localEscolhido.join(', ') : (pedido.localEscolhido || '-')
                            const horarios = Array.isArray(pedido.horarioEscolhido) ? pedido.horarioEscolhido.join(', ') : (pedido.horarioEscolhido || '-')

                            return (
                                <View
                                    key={pedido.id}
                                    style={[
                                        style.card,
                                        situacao.toLowerCase() === 'concluído' && style.cardAndamento
                                    ]}
                                >
                                    <View style={style.linha}>
                                        <Image
                                            style={style.imagem}
                                            source={{ uri: produto?.imagem?.[0] || "https://via.placeholder.com/100" }}
                                        />

                                        <View style={style.conteudo}>
                                            <Text style={style.title}>{produto?.name || 'Produto'}</Text>
                                            <View style={style.infos}>
                                                <Text style={style.preco}>{`R$ ${preco}`}</Text>
                                                <Text style={style.situacao}>{situacao}</Text>
                                            </View>
                                            <Text style={style.subText}>Vendedor: {pedido.vendedor?.name || 'Desconhecido'}</Text>
                                            <Text style={style.subText}>Local: {locais}</Text>
                                            <Text style={style.subText}>Horário: {horarios}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        style={style.cancelButton}
                                        onPress={() => handleCancelInterest(pedido.id)}
                                    >
                                        <Text style={style.cancelButtonText}>Retirar interesse</Text>
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

    fundo: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },

    container: {
        display: "flex",
        alignItems: "center"
    },

    card: {
        backgroundColor: "#e01a5f",
        width: "90%",
        borderRadius: 30,
        padding: 25,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 12
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
        marginTop: 10,
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

    preco: {
        color: "#FFC0D6",
        fontWeight: "bold",
    },

    situacao: {
        color: "#FFC0D6",
        fontWeight: "bold",
    },

    imagem: {
        height: 100,
        width: 100,
        resizeMode: "contain",
        backgroundColor: "#fff", // fundo pra não ficar transparente
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

    cardAndamento: {
        backgroundColor: "#FFC0D6",
    },

    titleVenda: {
        color: "#000",
    },

    infoVenda: {
        color: "#6d505a",
    },
    botaoVoltar: {
        position: "absolute",
        top: 16,
        left: 20,
        zIndex: 20,
    },

});