import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { clearUserSession, getUserSession } from '../../_lib/session';

const { width } = Dimensions.get('window');

export default function PerfilPage() {
    const router = useRouter()
    const [user, setUser] = useState<{ name: string; curso?: string } | null>(null)

    const handleLogout = async () => {
        await clearUserSession()
        router.push('/')
    }

    useEffect(() => {
        getUserSession()
            .then(setUser)
            .catch(console.error)
    }, [])

    const firstName = user?.name?.split(' ')[0] ?? 'Usuário'

    return (
        <View style={style.fundo}>
            <View style={style.bolaTopo} />
            <View style={style.bolaBaixo} />

            <ScrollView contentContainerStyle={style.scrollContainer}>

                <View style={style.headerPerfil}>

                    <View style={{
                        flex: 1,
                        minWidth: 0,
                    }}>
                        <Text style={style.titulo}>Olá {firstName}</Text>
                        {user?.curso ? <Text style={style.cursoText}>{user.curso}</Text> : null}
                    </View>

                    <View style={style.fotoContainer}>
                        <View style={style.fotoPerfil}>
                            <Text style={style.fotoInicial}>{user?.name?.trim()?.charAt(0).toUpperCase() ?? 'U'}</Text>
                        </View>
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
                            color="#ffffff"
                            style={{ marginLeft: 20 }}
                        />

                        <Text style={style.textoBotao}>Configurações da minha conta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={style.botao}
                        activeOpacity={0.7}
                        onPress={() => router.push("/acessibilidade")}
                    >
                        <MaterialCommunityIcons
                            name="puzzle"
                            size={20}
                            color="#ffffff"
                            style={{ marginLeft: 20 }}
                        />

                        <Text style={style.textoBotao}>Acessibilidade</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={style.botao}
                        activeOpacity={0.7}
                        onPress={() => router.push("/(tabs)/perfil/ultimasCompras")}
                    >

                        <MaterialCommunityIcons
                            name="restart"
                            size={20}
                            color="#ffffff"
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
                            color="#ffffff"
                            style={{ marginLeft: 20 }}
                        />
                        <Text style={style.textoBotao}>Itens à venda</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={style.botao}
                        activeOpacity={0.7}
                        onPress={() => router.push("/(tabs)/perfil/interessesRecebidos")}
                    >
                        <MaterialCommunityIcons
                            name="bell"
                            size={20}
                            color="#ffffff"
                            style={{ marginLeft: 20 }}
                        />
                        <Text style={style.textoBotao}>Interesses recebidos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={style.botao}
                        activeOpacity={0.7}
                        onPress={() => router.push("/ajuda")}
                    >
                        <MaterialCommunityIcons
                            name="help"
                            size={20}
                            color="#ffffff"
                            style={{ marginLeft: 20 }}
                        />
                        <Text style={style.textoBotao}>Central de ajuda</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={style.botao}
                        activeOpacity={0.7}
                        onPress={handleLogout}
                    >
                        <MaterialCommunityIcons
                            name="logout"
                            size={20}
                            color="#ffffff"
                            style={{ marginLeft: 20 }}
                        />
                        <Text style={style.textoBotao}>Sair</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView >

        </View >
    )
}

const style = StyleSheet.create({
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

    scrollContainer: {
        flexGrow: 1,
        alignItems: "center",
        paddingTop: 40,
    },

    container: {
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    card: {
        backgroundColor: "#fff",
        width: "85%",
        borderRadius: 30,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
        padding: 20,
        marginBottom: 20,
    },

    headerPerfil: {
        width: width - 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    cursoText: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },

    fotoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    fotoPerfil: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#e01a5f',
        alignItems: 'center',
        justifyContent: 'center',
    },

    fotoInicial: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },

    botao: {
        width: width - 40,
        backgroundColor: '#e01a5f',
        paddingVertical: 14,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        flexDirection: 'row',
    },

    textoBotao: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
})
