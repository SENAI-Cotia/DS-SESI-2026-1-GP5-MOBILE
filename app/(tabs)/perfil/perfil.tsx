import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function PerfilPage() {

    const escolherFoto = async () => {
        const resultado = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!resultado.canceled) {
            setFoto(resultado.assets[0].uri);
        }
    };

    const [foto, setFoto] = useState("")

    const router = useRouter()

    return (
        <View style={style.fundo}>
            <View style={style.bolaTopo} />
            <View style={style.bolaBaixo} />

            <TouchableOpacity 
        style={style.botaoVoltar} 
        onPress={() => router.back()}
      >
        <Ionicons name="chevron-back" size={30} color="#fff" />
      </TouchableOpacity>


            <ScrollView contentContainerStyle={style.scrollContainer}>

                <View style={style.headerPerfil}>

                    <Text style={style.titulo}>      Olá [nome]</Text>

                    <View style={style.fotoContainer}>
                        <Image
                            source={
                                foto
                                    ? { uri: foto }
                                    : require("../../../assets/images/logo.png")
                            }
                            style={style.fotoPerfil}
                        />

                        <TouchableOpacity style={style.botaoEditar} onPress={escolherFoto}>
                            <MaterialCommunityIcons name="pencil" size={14} color="#fff" />
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={style.container}>

                    <Link href={"/(tabs)/perfil/editarPerfil"}
                        style={style.botao}
                        onPress={() => router.push("/")}
                    >

                        <MaterialCommunityIcons
                            name="cog"
                            size={20}
                            color="#ffffff"
                            style={{ marginLeft: 20 }}
                        />

                        <Text style={style.textoBotao}>
                            Configurações da minha conta
                        </Text>

                    </Link>

                    <Link href={"/"}
                        style={style.botao}
                        onPress={() => router.push("/")}
                    >
                        <MaterialCommunityIcons
                            name="puzzle"
                            size={20}
                            color="#ffffff"
                            style={{ marginLeft: 20 }}
                        />

                        <Text style={style.textoBotao}>Acessibilidade</Text>
                    </Link>

                    <Link href={"/(tabs)/perfil/ultimasCompras"}
                            style={style.botao}
                            
                           
                        >

                            <MaterialCommunityIcons
                                name="cog"
                                size={20}
                                color="#000000"
                                style={{ marginLeft: 20 }}
                            />

                            <Text style={style.textoBotao}>
                                Configurações da minha conta
                            </Text>

                        </Link>

                        <View style={style.linha}></View>

                        <TouchableOpacity
                            style={style.botao}
                            activeOpacity={0.7}
                            onPress={() => router.push("/")}
                        >
                            <MaterialCommunityIcons
                                name="puzzle"
                                size={20}
                                color="#000000"
                                style={{ marginLeft: 20 }}
                            />

                            <Text style={style.textoBotao}>Acessibilidade</Text>
                        </TouchableOpacity>

                        <View style={style.linha}></View>

                        <TouchableOpacity
                            style={style.botao}
                            activeOpacity={0.7}
                            onPress={() => router.push("/(tabs)/perfil/ultimasCompras")}
                        >

                            <MaterialCommunityIcons
                                name="restart"
                                size={20}
                                color="#000000"
                                style={{ marginLeft: 20 }}
                            />

                            <Text style={style.textoBotao}>Últimas Compras</Text>
                        </TouchableOpacity>

                    <Link href={"/(tabs)/perfil/itensAVenda"}
                        style={style.botao}
                        onPress={() => router.push("/")}
                    >
                        <MaterialCommunityIcons
                            name="shopping"
                            size={20}
                            color="#ffffff"
                            style={{ marginLeft: 20 }}
                        />
                        <Text style={style.textoBotao}>Itens à venda</Text>
                    </Link>

                        <TouchableOpacity
                            style={style.botao}
                            activeOpacity={0.7}
                            onPress={() => router.push("/(tabs)/perfil/itensAVenda")}
                        >
                            <MaterialCommunityIcons
                                name="shopping"
                                size={20}
                                color="#000000"
                                style={{ marginLeft: 20 }}
                            />
                            <Text style={style.textoBotao}>Itens à venda</Text>
                        </TouchableOpacity>

                        <View style={style.linha}></View>

                        <TouchableOpacity
                            style={style.botao}
                            activeOpacity={0.7}
                            onPress={() => router.push("/novoProduto")}
                        >
                            <MaterialCommunityIcons
                                name="help"
                                size={20}
                                color="#000000"
                                style={{ marginLeft: 20 }}
                            />
                            <Text style={style.textoBotao}>Central de ajuda</Text>
                        </TouchableOpacity>

                   

                </View>

            </ScrollView >

        </View >
    )

}

const style = StyleSheet.create({
    fundo: {
        flex: 1,
        backgroundColor: "#F6ECF0",
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
    botaoVoltar: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 20,
  },
    scrollContainer: {
        flexGrow: 1,
        alignItems: "center",
        paddingTop: 240,
    },

    container: {
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    linha: {
        height: 1,
        backgroundColor: "#E5E5E5",
        width: "100%",
    },

    card: {
        backgroundColor: "#fff",
        width: "85%",
        borderRadius: 30,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    titulo: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",

    },
    subtitulo: {
        fontSize: 13,
        color: "#666",
        textAlign: "center",
        marginBottom: 20,
    },
    inputArea: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        marginBottom: 15,
        alignItems: "center",
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 14,
    },
    dicasSenha: {
        marginBottom: 15,
    },
    dicaTitulo: {
        fontSize: 10,
        fontWeight: "bold",
    },
    dicaItem: {
        fontSize: 10,
        color: "#333",
    },

    botao: {
        backgroundColor: "#ffffff",
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: "flex-start",
        marginTop: 10,
        flexDirection: "row",

        width: "100%",
    },

    textoBotao: {
        color: "#000000",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10,
    },
    loginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15,
        gap: 4,
    },
    textoLogin: {
        color: "#e01a5f",
        fontWeight: "bold",

    },
    logo: {
        width: 160,
        height: 50,
    },

    headerPerfil: {
        width: "85%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        marginBottom: -240,
    },

    fotoContainer: {
        position: "relative",
    },

    fotoPerfil: {
        width: 65,
        height: 65,
        borderRadius: 100, // deixa redonda
    },

    botaoEditar: {
        position: "absolute",
        top: -5,
        right: -5,
        backgroundColor: "#e01a5f",
        borderRadius: 10,
        padding: 4,
    },

});