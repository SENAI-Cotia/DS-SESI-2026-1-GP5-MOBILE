import { useEffect, useState } from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// O COMPONENTE COMEÇA AQUI!
export default function itensaVenda() {
    
    // 1. Os hooks DEVEM ficar aqui dentro, no início do componente:
    const [itensAVenda, setItensAVenda] = useState([]);

    useEffect(() => {
        buscarProdutos();
    }, []);

    // 2. A função que busca os dados também fica aqui dentro:
    async function buscarProdutos() {
        try {
            const response = await fetch("http://10.92.199.29:3000/produtos");
            const data = await response.json();
            
            setItensAVenda(data);
            console.log("Dados carregados:", data);
        } catch (error) {
            console.log("ERRO AO BUSCAR PRODUTOS", error);
        }
    }

    // 3. O retorno visual (JSX) vem logo em seguida:
    return (
        <SafeAreaView style={style.fundo}>
            <TouchableOpacity
                style={style.botaoVoltar}
                onPress={() => router.back()}
            >
                <Ionicons name="chevron-back" size={30} color="#e01a5f" />
            </TouchableOpacity>

            <ScrollView showsHorizontalScrollIndicator={false}>
                <View>
                    <Text style={style.principal}>Itens à Venda</Text>
                </View>

                <View style={style.container}>
                    {itensAVenda.map((itenAVenda: any) => (
                        <View
                            key={itenAVenda.id}
                            style={[
                                style.card,
                                itenAVenda.disponibilidade && style.cardAndamento
                            ]}
                        >
                            <TouchableOpacity
                                style={style.iconeEditar}
                                onPress={() => console.log("Editar item", itenAVenda.id)}
                            >
                                <Link href={"/(tabs)/perfil/editarVenda"}>
                                    <MaterialCommunityIcons
                                        name="pencil"
                                        size={20}
                                        color={itenAVenda.disponibilidade ? "#000" : "#fff"}
                                    />
                                </Link>
                            </TouchableOpacity>

                            <View>
                                <View style={style.linha}>
                                    <Image
                                        style={style.imagem}
                                        source={{ uri: itenAVenda.imagem }}
                                    />

                                    <View style={style.conteudo}>
                                        <Text
                                            style={[
                                                style.title,
                                                itenAVenda.disponibilidade && style.titleVenda
                                            ]}
                                        >
                                            {itenAVenda.name}
                                        </Text>

                                        <View style={style.infos}>
                                            <Text
                                                style={[
                                                    style.preco,
                                                    itenAVenda.disponibilidade && style.infoVenda
                                                ]}
                                            >
                                                R$ {itenAVenda.preco}
                                            </Text>

                                            <Text
                                                style={[
                                                    style.situacao,
                                                    itenAVenda.disponibilidade && style.infoVenda
                                                ]}
                                            >
                                                {itenAVenda.disponibilidade ? "À Venda" : "Entregue"}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

const style = StyleSheet.create({



    fundo: {

        flex: 1,

        backgroundColor: "#fff",

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

    },

    bolaBaixo: {

        position: "absolute",

        bottom: -80,

        right: -50,

        width: 250,

        height: 250,

        borderRadius: 125,

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

        top: 15,

        right: 15,

        zIndex: 1,

    },

    botaoVoltar: {

        position: "absolute",

        top: 60,

        left: 20,

        zIndex: 20,

    },

});

