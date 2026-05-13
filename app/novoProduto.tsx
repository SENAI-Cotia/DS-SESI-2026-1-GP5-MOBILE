import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from "react-native-safe-area-context"
import { router } from "expo-router";
import { useState } from "react";

const { width } = Dimensions.get("window")

export default function ultimascompras() {

    const [marcado, setMarcado] = useState(false)
    const [imagem, setImagem] = useState(null)

    const escolherImagem = async () => {
        const resultado = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 5],
            quality: 1,
        });

        if (!resultado.canceled) {
            setImagem(resultado.assets[0].uri)
        }
    }

    return (

        <SafeAreaView style={style.fundo}>
            <View style={style.bolaTopo}></View>
            <View style={style.bolaBaixo}></View>

            <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={style.scrollContainer}>

                <View style={style.card}>

                    <View style={style.perfilContainer}>

                        <Image
                            style={style.fotoPerfil}
                            source={{ uri: "https://i.pravatar.cc/150" }}
                        />

                        <View style={style.textoContainer}>

                            <View style={style.linhaNome}>
                                <Text style={style.nomePerfil}>Leticia Soares</Text>
                                <Text style={style.tempo}>há 8 horas</Text>
                            </View>

                            <Text style={style.cursoPerfil}>RH</Text>

                        </View>

                    </View>

                    <View style={style.descricao}>
                        <Text style={style.descricaoTexto}>
                            Descrição do produto...
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={style.fotoProduto}
                        onPress={escolherImagem}
                        activeOpacity={0.8}
                    >

                        {imagem ? (
                            <Image
                                source={{ uri: imagem }}
                                style={style.imagemSelecionada}
                            />
                        ) : (
                            <>
                                <Ionicons
                                    name="cloud-upload-outline"
                                    size={60}
                                    color="#000"
                                />

                                <Text style={style.addImg}>
                                    ADICIONAR IMAGEM
                                </Text>
                            </>
                        )}

                    </TouchableOpacity>

                    <Text style={style.nomeProduto}>NOME</Text>
                    <Text style={style.preco}>PREÇO (R$)</Text>

                    <View style={style.container2}>

                        <View>
                            <Text style={style.tituloSecao}>LOCAL</Text>

                            <View style={style.card2}>

                                <View style={style.card3a}>
                                    <Text style={style.card3Texto}>Pátio 1</Text>
                                    <MaterialCommunityIcons
                                        name="pencil"
                                        size={10}
                                        color={"#000"}
                                    />
                                </View>

                                <View style={style.card3}>
                                    <Text style={style.card3Texto}>Pátio 1</Text>
                                    <MaterialCommunityIcons
                                        name="pencil"
                                        size={10}
                                        color={"#000"}
                                    />
                                </View>

                                <View style={style.card3}>
                                    <Text style={style.card3Texto}>Pátio 1</Text>
                                    <MaterialCommunityIcons
                                        name="pencil"
                                        size={10}
                                        color={"#000"}
                                    />
                                </View>

                                <View style={style.card3}>
                                    <Text style={style.card3Texto}>Pátio 1</Text>
                                    <MaterialCommunityIcons
                                        name="pencil"
                                        size={10}
                                        color={"#000"}
                                    />
                                </View>

                                <View style={style.card3}>
                                    <Text style={style.card3Texto}>Pátio 1</Text>
                                    <MaterialCommunityIcons
                                        name="pencil"
                                        size={10}
                                        color={"#000"}
                                    />
                                </View>

                                <View style={style.card3}>
                                    <Text style={style.card3Texto}>Pátio 1</Text>
                                    <MaterialCommunityIcons
                                        name="pencil"
                                        size={10}
                                        color={"#000"}
                                    />
                                </View>

                            </View>

                        </View>

                        <View>
                            <Text style={style.tituloSecao}>HORÁRIO</Text>

                            <View style={style.card2}>
                                <View style={style.card3a}>
                                    <Text style={style.card3Texto}>Pátio 1</Text>
                                    <MaterialCommunityIcons
                                        name="pencil"
                                        size={10}
                                        color={"#000"}
                                    />
                                </View>

                                <View style={style.card3}>
                                    <Text style={style.card3Texto}>Pátio 1</Text>
                                    <MaterialCommunityIcons
                                        name="pencil"
                                        size={10}
                                        color={"#000"}
                                    />
                                </View>

                                <View style={style.card3}>
                                    <Text style={style.card3Texto}>Pátio 1</Text>
                                    <MaterialCommunityIcons
                                        name="pencil"
                                        size={10}
                                        color={"#000"}
                                    />
                                </View>

                                <View style={style.card3}>
                                    <Text style={style.card3Texto}>Pátio 1</Text>
                                    <MaterialCommunityIcons
                                        name="pencil"
                                        size={10}
                                        color={"#000"}
                                    />
                                </View>

                                <View style={style.card3}>
                                    <Text style={style.card3Texto}>Pátio 1</Text>
                                    <MaterialCommunityIcons
                                        name="pencil"
                                        size={10}
                                        color={"#000"}
                                    />
                                </View>

                                <View style={style.card3}>
                                    <Text style={style.card3Texto}>Pátio 1</Text>
                                    <MaterialCommunityIcons
                                        name="pencil"
                                        size={10}
                                        color={"#000"}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View
                        style={[
                            style.botao,
                            { backgroundColor: marcado ? "#ccc" : "#e01a5f" }
                        ]}
                    >
                        <Text style={style.entregue}>ENTREGUE</Text>

                        <TouchableOpacity
                            style={[
                                style.check,
                                { backgroundColor: marcado ? "#e01a5f" : "#fff" }
                            ]}
                            onPress={() => setMarcado(!marcado)}
                        >
                            {marcado && (
                                <MaterialCommunityIcons name="check" size={14} color="#fff" />
                            )}
                        </TouchableOpacity>

                    </View>

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

    container2: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 15,
        marginTop: 20,
    },

    descricaoTexto: {
        fontSize: 10,
        color: "#3f3f3f",
        textAlign: "center",
    },

    descricao: {
        marginTop: 5,
        marginBottom: 15,
        width: "80%",
        height: 50,
        backgroundColor: "#e0e0e0",
        borderRadius: 20,
        padding: 5,
        justifyContent: "center",
    },

    card3Texto: {
        fontSize: 10,
    },

    tituloSecao: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 5,
        textAlign: "center",
    },

    card3a: {
        backgroundColor: "#ffffff",
        width: 75,
        height: 20,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 3,

        margin: 0.1, // garante espaço caso o gap não funcione
        flexDirection: "row",
        gap: 19,
    },

    card3: {
        backgroundColor: "#ffffff",
        width: 75,
        height: 20,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 19,
    },

    botao: {
        backgroundColor: "#e01a5f",
        width: 153,
        height: 30,
        borderRadius: 40,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,

        flexDirection: "row",      // coloca em linha
        alignItems: "center",      // centraliza vertical
        justifyContent: "space-between", // separa esquerda/direita
        paddingHorizontal: 15,     // dá espaço interno

        marginTop: 30,
    },

    check: {
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 5,
    },

    entregue: {
        color: "#fff",
        fontWeight: "bold",
    },

    imagemSelecionada: {
        width: "100%",
        height: "100%",
        borderRadius: 20,
    },

    preco: {
        color: "#e01a5f",
        fontWeight: "bold",
        marginTop: 5,
        opacity: 0.7,
        backgroundColor: "#dddddd", // fundo pra não ficar transparente
        paddingHorizontal: 5, // espaço interno horizontal
        borderRadius: 10,
        width: "35%",
        textAlign: "center",
    },

    nomeProduto: {
        marginTop: 10,
        fontWeight: "bold",
        textAlign: "center",
        opacity: 0.7,
        backgroundColor: "#e01a5f", // fundo pra não ficar transparente
        paddingHorizontal: 5, // espaço interno horizontal
        borderRadius: 10,
        width: "35%",
    },

    card2: {
        backgroundColor: "#F5F5F5",
        width: 98,
        height: 158,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
        flexDirection: "row",
        flexWrap: "wrap", // permite quebrar linha
        justifyContent: "center",
        alignItems: "center",
        gap: 6, // espaço entre os itens (se não funcionar, usa margin no card3)
    },

    fundo: {
        flex: 1,
        backgroundColor: "#fff",
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

    addImg: {
        color: "#e01a5f",
        fontWeight: "bold",
        marginTop: 10,
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

    card: {
        backgroundColor: "#F5F5F5",
        width: 280,
        height: 710,
        borderRadius: 40,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
        alignItems: "center",
    },

    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 100,
    },

    fotoPerfil: {
        width: 45,
        height: 45,
        borderRadius: 100,

    },

    perfilContainer: {
        margin: 15,
        flexDirection: "row",
    },

    textoContainer: {
        marginLeft: 10,
        justifyContent: "center",
    },

    nomePerfil: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#e01a5f",
    },

    cursoPerfil: {
        fontSize: 12,
        color: "#e01a5f",
    },

    linhaNome: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    tempo: {
        fontSize: 11,
        color: "#3f3f3f",
        marginLeft: 47,
    },

    fotoProduto: {
        width: "80%",
        height: 221,
        backgroundColor: "#e0e0e0",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5,
    },


})