import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../lib/api";
import { getUserId } from "../../lib/session";

const { width } = Dimensions.get("window")

interface Produto {
    id: number;
    name: string;
    descricao: string;
    imagem?: string[];
    preco: number;
    disponibilidade: boolean;
    user?: {
        name: string;
        curso: string;
    };
}

export default function itensaVenda() {

    const [produtos, setProdutos] = useState<Produto[]>([])
    const [loading, setLoading] = useState(true)
    const [userId, setUserId] = useState<number | null>(null)
    
    useEffect(() => {
        let mounted = true
        getUserId()
            .then((id) => {
                if (!mounted) return
                setUserId(id)
                if (!id) {
                    return
                }
                return api.listMyProducts(id)
            })
            .then((data) => {
                if (!mounted || !data) return
                setProdutos(Array.isArray(data) ? data : [])
            })
            .catch((error) => {
                console.error('Erro carregando produtos:', error)
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
            <View style={style.bolaTopo}></View>
            <View style={style.bolaBaixo}></View>

            <TouchableOpacity style={style.botaoVoltar} onPress={() => router.push("/(tabs)/perfil/perfil")}>
                <Ionicons name="chevron-back" size={30} color="#fff" />
            </TouchableOpacity>

            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >

                <View>
                    <Text style={style.principal}>Itens à Venda</Text>
                </View>


                <View style={style.container}>
                    {loading ? (
                        <Text style={style.emptyText}>Carregando seus itens à venda...</Text>
                    ) : !userId ? (
                        <View style={style.emptyState}>
                            <Text style={style.emptyTitle}>Você precisa estar logado para ver seus itens.</Text>
                            <TouchableOpacity style={style.loginButton} onPress={() => router.push("/") }>
                                <Text style={style.loginButtonText}>Fazer login</Text>
                            </TouchableOpacity>
                        </View>
                    ) : produtos.length === 0 ? (
                        <View style={style.emptyState}>
                            <Text style={style.emptyTitle}>Nenhum item cadastrado ainda.</Text>
                            <TouchableOpacity style={style.loginButton} onPress={() => router.push("/novoProduto") }>
                                <Text style={style.loginButtonText}>Cadastrar produto</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        produtos.map((produto) => (
                            <View
                                key={produto.id}
                                style={[
                                    style.card,
                                    produto.disponibilidade && style.cardAndamento
                                ]}
                            >
                                <TouchableOpacity
                                    style={style.iconeEditar}
                                    onPress={() => router.push(`/(tabs)/perfil/editarVenda?id=${produto.id}`)}
                                >
                                    <MaterialCommunityIcons
                                        name="pencil"
                                        size={20}
                                        color={
                                            produto.disponibilidade
                                                ? "#000"
                                                : "#fff"
                                        }
                                    />
                                </TouchableOpacity>

                                <View>

                                    <View style={style.linha}>

                                        <Image
                                            style={style.imagem}
                                            source={{ uri: produto.imagem?.[0] || "https://via.placeholder.com/100" }}
                                        />

                                        <View style={style.conteudo}>
                                            <Text
                                                style={[
                                                    style.title,
                                                    produto.disponibilidade && style.titleVenda
                                                ]}
                                            >
                                                {produto.name}
                                            </Text>

                                            <View style={style.infos}>
                                                <Text
                                                    style={[
                                                        style.preco,
                                                        produto.disponibilidade && style.infoVenda
                                                    ]}
                                                >
                                                    {`R$ ${produto.preco}`}
                                                </Text>

                                                <Text
                                                    style={[
                                                        style.situacao,
                                                        produto.disponibilidade && style.infoVenda
                                                    ]}
                                                >
                                                    {produto.disponibilidade ? 'À venda' : 'Vendido'}
                                                </Text>
                                            </View>
                                        </View>

                                    </View>

                                </View>

                            </View>
                        ))
                    )}
                </View>

            </ScrollView>

            <View style={style.menuInferior}>
                <TouchableOpacity style={style.menuItem}><Ionicons name="people-outline" size={30} color="#fff" /></TouchableOpacity>

                <View>
                    <TouchableOpacity
                        style={style.homeBotao}
                        onPress={() => router.push("/")}
                    >
                        <Ionicons name="home" size={32} color="#fff" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={style.menuItem}><Ionicons name="person-outline" size={30} color="#fff" /></TouchableOpacity>
            </View>

        </SafeAreaView >

    )
}

const style = StyleSheet.create({

    fundo: {
        flex: 1,
        backgroundColor: "#fff",
        overflow: "hidden",
    },

    menuInferior: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 70,
        backgroundColor: "#e01a5f",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        zIndex: 10,
    },

    menuItem: {
        padding: 10
    },

    homeCirculo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#e01a5f",
        marginTop: -40,
        justifyContent: "center",
        alignItems: "center"
    },

    homeBotao: {
        width: 65,
        height: 65,
        borderRadius: 32.5,
        backgroundColor: "#e01a5f",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5
    },

    bolaTopo: {
        position: "absolute",
        top: -50,
        left: -50,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: "#e01a5f",
        zIndex: -1,
    },

    bolaBaixo: {
        position: "absolute",
        bottom: -120,
        right: -120,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: "#e01a5f",
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
        padding: 30,
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
        marginVertical: 24,
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

    iconeEditar: {
        position: "absolute",
        top: 25,
        right: 25,
        zIndex: 1,
    },

    botaoVoltar: {
        position: "absolute",
        top: 50,
        left: 20,
        zIndex: 20,
    },
});