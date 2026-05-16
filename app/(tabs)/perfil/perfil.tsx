import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

        // pede permissão
        const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissao.granted) {
            alert("Precisamos da permissão da galeria!");
            return;
        }

        // abre galeria
        const resultado = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        // salva foto
        if (!resultado.canceled) {
            const uri = resultado.assets[0].uri;

            setFoto(uri);

            await AsyncStorage.setItem("fotoPerfil", uri);
        }
    };

    const [foto, setFoto] = useState("")

    const router = useRouter()

    useEffect(() => {
        carregarFoto();
    }, []);

    const carregarFoto = async () => {
        const fotoSalva = await AsyncStorage.getItem("fotoPerfil");

        if (fotoSalva) {
            setFoto(fotoSalva);
        }
    };

    return (
        <View style={style.fundo}>
            <View style={style.bolaTopo} />
            <View style={style.bolaBaixo} />

            


            <ScrollView contentContainerStyle={style.scrollContainer}>

                <View style={style.headerPerfil}>

                    <View style={{ flex: 1 }}>
                        <Text style={style.titulo}>Olá [nome]</Text>
                    </View>

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

                    <TouchableOpacity
                        style={style.botao}
                        activeOpacity={0.7}
                        onPress={() => router.push("/(tabs)/perfil/editarPerfil")}
                    >
                        <MaterialCommunityIcons
                            name="cog"
                            size={20}
                            color="#000000"
                            style={{ marginLeft: 20 }}
                        />

                        <Text style={style.textoBotao}>Configurações da minha conta</Text>
                    </TouchableOpacity>

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
                        onPress={() => router.push("/")}
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
        textAlign: "left",
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
        
        width: "90%",
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
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: -240,
    },

    fotoContainer: {
        position: "relative",
        overflow: "visible",
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
        borderRadius: 20,
        padding: 6,
        zIndex: 10,
        elevation: 10,
    },
    cog: {
        marginLeft: 100
    }

});