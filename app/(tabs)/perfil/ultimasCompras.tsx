import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
    
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
        situacao: "À Venda"
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

export default function ultimascompras() {
    return (
        <SafeAreaView style={style.fundo}>


            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
            >

                <View>
                    <Text style={style.principal}>Últimas Compras</Text>
                </View>


                <View style={style.container}>
                    {ultimasCompras.map((ultimaCompra) => (
                        <View
                            key={ultimaCompra.id}
                            style={[
                                style.card,
                                ultimaCompra.situacao.toLowerCase().includes("venda") && style.cardAndamento
                            ]}
                        >

                            <View>

                                <View style={style.linha}>

                                    <Image
                                        style={style.imagem}
                                        source={{ uri: ultimaCompra.image }}
                                    />

                                    <View style={style.conteudo}>
                                        <Text
                                            style={[
                                                style.title,
                                                ultimaCompra.situacao.toLowerCase().includes("venda") && style.titleVenda
                                            ]}
                                        >
                                            {ultimaCompra.title}
                                        </Text>


                                        <View style={style.infos}>
                                            <Text
                                                style={[
                                                    style.preco,
                                                    ultimaCompra.situacao.toLowerCase().includes("venda") && style.infoVenda
                                                ]}
                                            >
                                                R$
                                                {ultimaCompra.preco}
                                            </Text>

                                            <Text
                                                style={[
                                                    style.situacao,
                                                    ultimaCompra.situacao.toLowerCase().includes("venda") && style.infoVenda
                                                ]}
                                            >
                                                {ultimaCompra.situacao}
                                            </Text>
                                        </View>
                                    </View>

                                </View>

                            </View>

                        </View>
                    ))}
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

});