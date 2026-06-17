import {
    Alert,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Text from './_lib/Text';

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { createProduct } from "./_lib/api";
import { getUserId, getUserSession } from "./_lib/session";
import { theme, useTheme } from "./_lib/theme";
import { parseCurrency } from "./_lib/validation";

const { width } = Dimensions.get("window")

export default function NovoProduto() {
    const { darkMode } = useTheme();
    const colors = darkMode ? theme.dark : theme.light;
    const [publicado, setPublicado] = useState(false)
    const [imagem, setImagem] = useState<string | null>(null)
    const [descricao, setDescricao] = useState("")
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

    const [nomeProduto, setNomeProduto] = useState("")
    const [precoProduto, setPrecoProduto] = useState("")
    const [condicao, setCondicao] = useState("5")

    const [locais, setLocais] = useState<string[]>([])

    const [horarios, setHorarios] = useState<string[]>([])

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
        if (tipo === "local" && locais.length >= 6) {
            Alert.alert('Limite atingido', 'Máximo de 6 locais permitidos')
            return
        }

        if (tipo === "horario" && horarios.length >= 6) {
            Alert.alert('Limite atingido', 'Máximo de 6 horários permitidos')
            return
        }

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

        if (!nomeTrimmed) {
            Alert.alert('Erro', 'Preencha o nome do produto')
            return
        }

        if (precoParsed <= 0) {
            Alert.alert('Erro', 'Informe um preço válido maior que zero')
            return
        }

        if (!descricaoTrimmed) {
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

        const condicaoParsed = Number(condicao)
        if (!condicao || isNaN(condicaoParsed) || condicaoParsed < 1 || condicaoParsed > 10) {
            Alert.alert('Erro', 'Informe a condição do produto entre 1 e 10')
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
            condicao: condicaoParsed,
            imagem: imagem ? [imagem] : [], // <--- Agora envia a string Base64 completa para o Banco
            descricao,
            disponibilidade: true,
            local: locais,
            horario: horarios,
        }

        try {
            await createProduct(payload)
            Alert.alert('Sucesso', 'Seu produto foi cadastrado com sucesso!')
            setPublicado(true)
        } catch (err: any) {
            Alert.alert('Erro', err?.message || 'Erro ao cadastrar produto')
        }
    }

    return (
        <SafeAreaView style={[style.fundo, { backgroundColor: colors.background }]}>

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

                <View style={[style.card, { backgroundColor: colors.card }] }>

                    <View style={style.perfilContainer}>
                        <View style={[style.fotoPerfil, darkMode && style.fotoPerfilDark]}>
                            <Text style={[style.fotoInicial, darkMode && style.fotoInicialDark]}>{userName.trim().charAt(0).toUpperCase() || 'U'}</Text>
                        </View>

                        <View style={style.textoContainer}>
                            <View style={[style.linhaNome, darkMode && style.linhaNomeDark]}>
                                <Text style={[style.nomePerfil, darkMode && style.nomePerfilDark]}>{userName}</Text>
                            </View>

                            <Text style={[style.cursoPerfil, darkMode && style.cursoPerfilDark]}>{userCurso || 'Curso não informado'}</Text>
                        </View>
                    </View>

                    <View style={[style.field, { marginBottom: 25 }]}>
                        <Text style={[style.fieldLabel, darkMode && style.fieldLabelDark]}>Descrição do produto</Text>
                        <TextInput
                            style={[style.textArea, darkMode && style.textAreaDark]}
                            value={descricao}
                            onChangeText={setDescricao}
                            placeholder="Escreva uma descrição clara e objetiva"
                            placeholderTextColor={colors.placeholder}
                            multiline
                            numberOfLines={4}
                        />
                    </View>

                    <TouchableOpacity
                        style={[style.fotoProduto, darkMode && style.fotoProdutoDark]}
                        onPress={escolherImagem}
                        activeOpacity={0.8}
                    >
                        {imagem ? (
                            <Image source={{ uri: imagem }} style={style.imagemSelecionada} />
                        ) : (
                            <>
                                <Ionicons
                                    name="cloud-upload-outline"
                                    size={60}
                                    color={darkMode ? colors.text : '#000'}
                                />

                                <Text style={[style.addImg, darkMode && style.addImgDark]}>
                                    ADICIONAR IMAGEM
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>

                    <View style={style.field}>
                        <Text style={[style.fieldLabel, darkMode && style.fieldLabelDark]}>Nome do produto</Text>
                        <TextInput
                            style={[style.input, darkMode && style.inputDark]}
                            placeholder="Nome do produto"
                            placeholderTextColor={colors.placeholder}
                            value={nomeProduto}
                            onChangeText={setNomeProduto}
                        />
                    </View>

                    <View style={style.field}>
                        <Text style={[style.fieldLabel, darkMode && style.fieldLabelDark]}>Preço</Text>
                        <TextInput
                            style={[style.input, darkMode && style.inputDark]}
                            placeholder="R$ 0,00"
                            placeholderTextColor={colors.placeholder}
                            value={precoProduto}
                            onChangeText={setPrecoProduto}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={style.field}>
                        <Text style={[style.fieldLabel, darkMode && style.fieldLabelDark]}>Condição (1 a 10)</Text>
                        <TextInput
                            style={[style.input, darkMode && style.inputDark]}
                            placeholder="Informe a condição"
                            placeholderTextColor={colors.placeholder}
                            value={condicao}
                            onChangeText={(text) => {
                                const digits = text.replace(/[^0-9]/g, '')
                                setCondicao(digits.slice(0, 2))
                            }}
                            keyboardType="numeric"
                            maxLength={2}
                        />
                    </View>

                    <View style={style.container2}>

                        <View>

                            <Text style={[style.tituloSecao, darkMode && style.tituloSecaoDark]}>LOCAL</Text>

                            <View style={[style.card2, { backgroundColor: colors.surface }]}>

                                {locais.length === 0 ? (
                                    <Text style={[style.emptyText, darkMode && style.emptyTextDark]}>
                                        Adicione pelo menos um local
                                    </Text>
                                ) : (
                                    locais.map((local, index) => (
                                        <View
                                            key={index}
                                            style={[style.card3, darkMode && style.card3Dark]}
                                        >

                                            <Text style={[style.card3Texto, darkMode && style.card3TextoDark]}>
                                                {local}
                                            </Text>

                                            <TouchableOpacity
                                                onPress={() => editarItem("local", index)}
                                            >

                                                <MaterialCommunityIcons
                                                    name="pencil"
                                                    size={10}
                                                    color={darkMode ? colors.text : '#000'}
                                                />

                                            </TouchableOpacity>

                                        </View>
                                    ))
                                )}

                                <TouchableOpacity
                                    style={[style.cardAdicionar, { borderColor: colors.accent }, darkMode && style.cardAdicionarDark]}
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

                            <Text style={[style.tituloSecao, darkMode && style.tituloSecaoDark]}>HORÁRIO</Text>

                            <View style={[style.card2, { backgroundColor: colors.surface }]}>

                                {horarios.length === 0 ? (
                                    <Text style={[style.emptyText, darkMode && style.emptyTextDark]}>
                                        Adicione pelo menos um horário
                                    </Text>
                                ) : (
                                    horarios.map((horario, index) => (
                                        <View
                                            key={index}
                                            style={[style.card3, darkMode && style.card3Dark]}
                                        >

                                            <Text style={[style.card3Texto, darkMode && style.card3TextoDark]}>
                                                {horario}
                                            </Text>

                                            <TouchableOpacity
                                                onPress={() => editarItem("horario", index)}
                                            >

                                                <MaterialCommunityIcons
                                                    name="pencil"
                                                    size={10}
                                                    color={darkMode ? colors.text : '#000'}
                                                />

                                            </TouchableOpacity>

                                        </View>
                                    ))
                                )}

                                <TouchableOpacity
                                    style={[style.cardAdicionar, { borderColor: colors.accent }, darkMode && style.cardAdicionarDark]}
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
                                backgroundColor: publicado ? (darkMode ? '#6f6f6f' : '#ccc') : colors.accent,
                                justifyContent: "center",
                                alignItems: "center",
                            }
                        ]}
                        onPress={handlePublish}
                    >

                        <Text style={[style.entregue, darkMode && style.entregueDark]}>
                            {publicado ? "PUBLICADO" : "PUBLICAR"}
                        </Text>

                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

const style = StyleSheet.create({
    fundoDark: {
        backgroundColor: '#222',
    },
    tituloSecaoDark: {
        color: '#e01a5f',
    },

    field: {
        width: '90%',
        marginTop: 15,
    },
    fieldLabel: {
        fontSize: 12,
        marginBottom: 8,
        color: '#333',
        fontWeight: '600',
    },
    fieldLabelDark: {
        color: '#ddd',
    },
    input: {
        width: '100%',
        borderRadius: 16,
        backgroundColor: '#fff',
        color: '#111',
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: '#e7e7e7',
    },
    inputDark: {
        backgroundColor: '#2b2b2f',
        color: '#f3f3f3',
        borderColor: '#444',
    },
    textArea: {
        width: '100%',
        minHeight: 100,
        borderRadius: 16,
        backgroundColor: '#fff',
        color: '#111',
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: '#e7e7e7',
        textAlignVertical: 'top',
    },
    textAreaDark: {
        backgroundColor: '#2b2b2f',
        color: '#f3f3f3',
        borderColor: '#444',
    },
    emptyText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        paddingHorizontal: 8,
    },
    emptyTextDark: {
        color: '#ccc',
    },

    linhaNomeDark: {
        borderBottomColor: '#555',
    },

    fotoPerfilDark: {
        backgroundColor: '#ff6f95',
    },
    fotoInicialDark: {
        color: '#fff',
    },
    fotoProdutoDark: {
        backgroundColor: '#2b2b2f',
    },
    addImgDark: {
        color: '#fff',
    },
    card2Dark: {
        backgroundColor: '#2b2b2f',
    },
    card3Dark: {
        backgroundColor: '#2b2b2f',
    },
    cardAdicionarDark: {
        borderColor: '#ff6f95',
    },
    cursoPerfilDark: {
        color: '#e01a5f',
    },
    nomePerfilDark: {
        color: '#e01a5f',
    },
    card3TextoDark: {
        color: '#ccc',
    },
    entregueDark: {
        color: '#ccc',
    },
    darkCard: {
        backgroundColor: '#444',
    },
    container2: {
        width: '95%',
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 25,
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
        minWidth: 80,
        height: 28,
        borderRadius: 100,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
        paddingHorizontal: 12,
    },
    botao: {
        width: '100%',
        height: 44,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 10,
        elevation: 6,
        justifyContent: "center",
        alignItems: "center",
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
        letterSpacing: 0.3,
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
        width: '90%',
        maxWidth: 280,
        alignSelf: 'center',
        height: 158,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 4,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        paddingTop: 12,
        paddingHorizontal: 10,
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
        width: width * 0.92,
        maxWidth: 420,
        borderRadius: 40,
        shadowColor: "#000",
        shadowOpacity: 0.14,
        shadowRadius: 14,
        elevation: 8,
        alignItems: "center",
        paddingVertical: 30,
        paddingHorizontal: 18,
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
        marginBottom: 12,
        overflow: 'hidden',
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