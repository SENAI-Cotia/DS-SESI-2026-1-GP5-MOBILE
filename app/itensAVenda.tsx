import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const itensAVenda = [
    {
        id: 1,
        title: "Kit Conjunto para Desenho Geométrico - Acrilex 10 Peças",
        preco: 45,
        image: "https://www.armarinhosaojose.com.br/octopus/design/images/94/products/b/conjunto-desenho-geom-acrilex-10pcs.jpg",
        situacao: "Entregue"
    },
    {
        id: 2,
        title: "Jaleco Manga Longa pra Laboratório",
        preco: 15,
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_679505-MLB96163273472_102025-F-jaleco-de-oxford-branco-com-gola-manga-longa-3-bolsos.webp",
        situacao: "À Venda"
    },
    {
        id: 3,
        title: "Conexões com a Matemática",
        preco: 25,
        image: "https://m.media-amazon.com/images/I/61AB9jiPgGL._AC_UF1000,1000_QL80_.jpg",
        situacao: "À Venda"
    },
];

const { width } = Dimensions.get("window")

export default function itensaVenda() {
    return (
        <SafeAreaView style={style.fundo}>
            <View style={style.bolaTopo}></View>
            <View style={style.bolaBaixo}></View>

            <ScrollView showsHorizontalScrollIndicator={false}>

                <View>
                    <Text style={style.principal}>Itens à Venda</Text>
                </View>


                <View style={style.container}>
                    {itensAVenda.map((itenAVenda) => (
                        <View
                            key={itenAVenda.id}
                            style={[
                                style.card,
                                itenAVenda.situacao.toLowerCase().includes("venda") && style.cardAndamento
                            ]}
                        >
                            <TouchableOpacity
                                style={style.iconeEditar}
                                onPress={() => console.log("Editar item", itenAVenda.id)}
                            >
                                <Link href={"/"}>
                                    <MaterialCommunityIcons
                                        name="pencil"
                                        size={20}
                                        color={
                                            itenAVenda.situacao.toLowerCase().includes("venda")
                                                ? "#000"   // À venda → preto
                                                : "#fff"   // Entregue → branco
                                        }
                                    />
                                </Link>
                            </TouchableOpacity>

                            <View>

                                <View style={style.linha}>

                                    <Image
                                        style={style.imagem}
                                        source={{ uri: itenAVenda.image }}
                                    />

                                    <View style={style.conteudo}>
                                        <Text
                                            style={[
                                                style.title,
                                                itenAVenda.situacao.toLowerCase().includes("venda") && style.titleVenda
                                            ]}
                                        >
                                            {itenAVenda.title}
                                        </Text>
                                        <br></br>
                                        <br></br>

                                        <View style={style.infos}>
                                            <Text
                                                style={[
                                                    style.preco,
                                                    itenAVenda.situacao.toLowerCase().includes("venda") && style.infoVenda
                                                ]}
                                            >
                                                R$
                                                {itenAVenda.preco}
                                            </Text>

                                            <Text
                                                style={[
                                                    style.situacao,
                                                    itenAVenda.situacao.toLowerCase().includes("venda") && style.infoVenda
                                                ]}
                                            >
                                                {itenAVenda.situacao}
                                            </Text>
                                        </View>
                                    </View>

                                </View>

                            </View>

                        </View>
                    ))}
                </View>

            </ScrollView>

            <View style={style.menuInferior}>
                <TouchableOpacity style={style.menuItem}><Ionicons name="people-outline" size={30} color="#fff" /></TouchableOpacity>

                <View style={style.homeCirculo}>
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
        top: 25,
        right: 25,
        zIndex: 1,
    },
});