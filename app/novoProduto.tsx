import {
    Alert,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "./_lib/api";
import { getUserId, getUserSession } from "./_lib/session";
import { parseCurrency } from "./_lib/validation";

const { width } = Dimensions.get("window")

export default function ultimascompras() {

    const [publicado, setPublicado] = useState(false)
    const [imagem, setImagem] = useState<string | null>(null)
    const [descricao, setDescricao] = useState("Descrição do produto...")
    const [userId, setUserId] = useState<number | null>(null)
    const [userName, setUserName] = useState('Usuário')
    const [userCurso, setUserCurso] = useState('')

    useEffect(() => {
        getUserId().then((id) => setUserId(id)).catch(console.error)
        getUserSession()
            .then((user) => {
                if (user) {
                    setUserName(user.name ?? 'Usuário')
                    setUserCurso(user.curso ?? '')
                }
            })
            .catch(console.error)
    }, [])

    const [nomeProduto, setNomeProduto] = useState("NOME")
    const [precoProduto, setPrecoProduto] = useState("PREÇO (R$)")

    const [locais, setLocais] = useState([
        ""
    ])

    const [horarios, setHorarios] = useState([
        ""
    ])

    const editarItem = (tipo: string, index: number) => {

        const texto = prompt(`Digite o novo ${tipo}`)

        if (!texto) return

        if (tipo === "local") {
            const novosLocais = [...locais]
            novosLocais[index] = texto
            setLocais(novosLocais)
        }

        if (tipo === "horario") {
            const novosHorarios = [...horarios]
            novosHorarios[index] = texto
            setHorarios(novosHorarios)
        }
    }

    const adicionarItem = (tipo: string) => {

        const texto = prompt(`Digite o novo ${tipo}`)

        if (!texto) return

        if (tipo === "local") {
            setLocais([...locais, texto])
        }

        if (tipo === "horario") {
            setHorarios([...horarios, texto])
        }
    }

    const escolherImagem = async () => {

        const resultado = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 5],
            quality: 0.7, // Reduzido levemente para otimizar o tamanho do Base64 no banco
            base64: true, // <--- Habilita o retorno da imagem em formato texto Base64
        });

        if (!resultado.canceled) {
            // Monta o cabeçalho URI correto do Base64 para que a tag <Image /> consiga renderizar nativamente
            const base64Formatado = `data:image/jpeg;base64,${resultado.assets[0].base64}`;
            setImagem(base64Formatado);
        }
    }

    const handlePublish = async () => {
        const nomeTrimmed = String(nomeProduto).trim()
        const descricaoTrimmed = String(descricao).trim()
        const precoParsed = parseCurrency(String(precoProduto))

        if (!nomeTrimmed || nomeTrimmed.toLowerCase() === 'nome') {
            Alert.alert('Erro', 'Preencha o nome do produto')
            return
        }

        if (precoParsed <= 0) {
            Alert.alert('Erro', 'Informe um preço válido maior que zero')
            return
        }

        if (!descricaoTrimmed || descricaoTrimmed.toLowerCase().includes('descrição do produto')) {
            Alert.alert('Erro', 'Preencha a descrição do produto')
            return
        }

        if (!imagem) {
            Alert.alert('Erro', 'Selecione uma imagem para o produto')
            return
        }

        if (!locais.length || !horarios.length) {
            Alert.alert('Erro', 'Adicione ao menos um local e um horário')
            return
        }

        if (!userId) {
            Alert.alert('Erro', 'Faça login antes de publicar um produto.')
            router.push('/')
            return
        }

        const payload = {
            userId,
            name: nomeProduto,
            preco: precoParsed,
            condicao: 1,
            imagem: imagem ? [imagem] : [], // <--- Agora envia a string Base64 completa para o Banco
            descricao,
            disponibilidade: true,
            local: locais,
            horario: horarios,
        }

        try {
            await api.createProduct(payload)
            Alert.alert('Sucesso', 'Seu produto foi cadastrado com sucesso!')
            setPublicado(true)
        } catch (err: any) {
            Alert.alert('Erro', err?.message || 'Erro ao cadastrar produto')
        }
    }

    return (
        <SafeAreaView style={style.fundo}>

            <View style={style.bolaTopo}></View>
            <View style={style.bolaBaixo}></View>

            <TouchableOpacity
                style={style.botaoVoltar}
                onPress={() => router.back()}
            >
                <Ionicons
                    name="chevron-back"
                    size={30}
                    color="#ffffff"
                />
            </TouchableOpacity>

            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={style.scrollContainer}
            >

                <View style={style.card}>

                    <View style={style.perfilContainer}>
                        <View style={style.fotoPerfil}>
                            <Text style={style.fotoInicial}>{userName.trim().charAt(0).toUpperCase() || 'U'}</Text>
                        </View>

                        <View style={style.textoContainer}>
                            <View style={style.linhaNome}>
                                <Text style={style.nomePerfil}>{userName}</Text>
                                <Text style={style.tempo}>há 8 horas</Text>
                            </View>

                            <Text style={style.cursoPerfil}>{userCurso || 'Curso não informado'}</Text>
                        </View>
                    </View>

                    <View style={style.descricao}>

                        <View style={style.descricaoHeader}>

                            <Text style={style.descricaoTexto}>
                                {descricao}
                            </Text>

                            <TouchableOpacity
                                onPress={() => {

                                    const texto = prompt("Digite a nova descrição")

                                    if (texto) {
                                        setDescricao(texto)
                                    }

                                }}
                            >

                                <MaterialCommunityIcons
                                    name="pencil"
                                    size={16}
                                    color="#000"
                                />

                            </TouchableOpacity>

                        </View>
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

                    <View style={style.editarCampo}>

                        <TouchableOpacity
                            onPress={() => {

                                const texto = prompt("Digite o nome do produto")

                                if (texto) {
                                    setNomeProduto(texto)
                                }

                            }}
                        >

                            <Text style={style.nomeProduto}>
                                {nomeProduto}
                                <MaterialCommunityIcons
                                    name="pencil"
                                    size={14}
                                    color="#000"
                                />

                            </Text>

                        </TouchableOpacity>

                    </View>

                    <View style={style.editarCampo}>

                        <TouchableOpacity
                            onPress={() => {

                                const texto = prompt("Digite o preço do produto")

                                if (texto) {
                                    setPrecoProduto(texto)
                                }

                            }}
                        >

                            <Text style={style.preco}>

                                {precoProduto}
                                <MaterialCommunityIcons
                                    name="pencil"
                                    size={14}
                                    color="#000"
                                />
                            </Text>

                        </TouchableOpacity>

                    </View>

                    <View style={style.container2}>

                        <View>

                            <Text style={style.tituloSecao}>LOCAL</Text>

                            <View style={style.card2}>

                                {locais.map((local, index) => (
                                    <View
                                        key={index}
                                        style={style.card3}
                                    >

                                        <Text style={style.card3Texto}>
                                            {local}
                                        </Text>

                                        <TouchableOpacity
                                            onPress={() => editarItem("local", index)}
                                        >

                                            <MaterialCommunityIcons
                                                name="pencil"
                                                size={10}
                                                color={"#000"}
                                            />

                                        </TouchableOpacity>

                                    </View>
                                ))}

                                <TouchableOpacity
                                    style={style.cardAdicionar}
                                    onPress={() => adicionarItem("local")}
                                >

                                    <Ionicons
                                        name="add"
                                        size={18}
                                        color="#e01a5f"
                                    />

                                </TouchableOpacity>

                            </View>
                        </View>

                        <View>

                            <Text style={style.tituloSecao}>HORÁRIO</Text>

                            <View style={style.card2}>

                                {horarios.map((horario, index) => (
                                    <View
                                        key={index}
                                        style={style.card3}
                                    >

                                        <Text style={style.card3Texto}>
                                            {horario}
                                        </Text>

                                        <TouchableOpacity
                                            onPress={() => editarItem("horario", index)}
                                        >

                                            <MaterialCommunityIcons
                                                name="pencil"
                                                size={10}
                                                color={"#000"}
                                            />

                                        </TouchableOpacity>

                                    </View>
                                ))}

                                <TouchableOpacity
                                    style={style.cardAdicionar}
                                    onPress={() => adicionarItem("horario")}
                                >

                                    <Ionicons
                                        name="add"
                                        size={18}
                                        color="#e01a5f"
                                    />

                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[
                            style.botao,
                            {
                                backgroundColor: publicado ? "#ccc" : "#e01a5f",
                                justifyContent: "center",
                                alignItems: "center",
                            }
                        ]}
                        onPress={handlePublish}
                    >

                        <Text style={style.entregue}>
                            {publicado ? "PUBLICADO" : "PUBLICAR"}
                        </Text>

                    </TouchableOpacity>
                </View>
            </ScrollView>
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
    editarCampo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginTop: 10,
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
        margin: 0.1,
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
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
        backgroundColor: "#dddddd",
        paddingHorizontal: 5,
        borderRadius: 10,
        width: 120,
        textAlign: "center",
    },
    nomeProduto: {
        marginTop: 10,
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff",
        opacity: 0.7,
        backgroundColor: "#e01a5f",
        paddingHorizontal: 5,
        borderRadius: 10,
        width: 120,
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
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
        paddingTop: 10,
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
    addImg: {
        color: "#e01a5f",
        fontWeight: "bold",
        marginTop: 10,
    },
    menuItem: {
        padding: 10
    },
    card: {
        backgroundColor: "#F5F5F5",
        width: 300,
        height: 725,
        borderRadius: 40,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 55,
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
        backgroundColor: '#e01a5f',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fotoInicial: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
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
    descricaoHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
    },
    descricaoTitulo: {
        fontWeight: "bold",
        fontSize: 11,
    },
    cardAdicionar: {
        width: 75,
        height: 20,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "#e01a5f",
        justifyContent: "center",
        alignItems: "center",
        borderStyle: "dashed",
    },
    botaoVoltar: {
        position: "absolute",
        top: 50,
        left: 20,
        zIndex: 20,
    },
})