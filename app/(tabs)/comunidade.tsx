import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"

import { Ionicons } from "@expo/vector-icons"

export default function PaginaInicio() {

    const router = useRouter()

    const [busca, setBusca] = useState("")
    const [mostrarFiltro, setMostrarFiltro] = useState(false)
    const [cursoSelecionado, setCursoSelecionado] = useState("")
    const [posts, setPosts] = useState([])

    const cursos = [
        "Todos",
        "Desenvolvimento de Sistemas",
        "Administração",
        "RH",
        "Marketing",
        "Nutrição",
    ]

    async function buscarPosts() {

        try {

            const response = await fetch("http://10.92.199.28:3000/produtos")

            const data = await response.json()

            setPosts(data)

        } catch (error) {

            console.log(error)

        }

    }

    useEffect(() => {

        buscarPosts()

    }, [])

    const postsFiltrados =
        cursoSelecionado === "" || cursoSelecionado === "Todos"
            ? posts
            : posts.filter(
                (post) => post.user.curso === cursoSelecionado
            )

    return (

        <View style={style.fundo}>

            <ScrollView
                contentContainerStyle={style.scrollContainer}
                showsVerticalScrollIndicator={false}
            >

                <View style={style.header}>

                    <TouchableOpacity>
                        <Ionicons name="add" size={30} color="#e01a5f" />
                    </TouchableOpacity>

                    <Text style={style.titulo}>
                        COMUNIDADE
                    </Text>

                    <TouchableOpacity>
                        <Ionicons
                            name="notifications-outline"
                            size={26}
                            color="#e01a5f"
                        />
                    </TouchableOpacity>

                </View>

                <View style={style.linhaPesquisa}>

                    <View style={style.buscaContainer}>

                        <TextInput
                            style={style.inputBusca}
                            value={busca}
                            onChangeText={setBusca}
                            placeholder="Pesquisar..."
                            placeholderTextColor="#fff"
                        />

                        <Ionicons
                            name="search"
                            size={20}
                            color="#fff"
                        />

                    </View>

                    <TouchableOpacity
                        style={style.botaoFiltro}
                        onPress={() =>
                            setMostrarFiltro(!mostrarFiltro)
                        }
                    >

                        <Ionicons
                            name="filter-sharp"
                            size={20}
                            color="#e01a5f"
                        />

                    </TouchableOpacity>

                </View>

                {mostrarFiltro && (

                    <View style={style.cardFiltro}>

                        <Text style={style.tituloFiltro}>
                            Busque pela sua comunidade
                        </Text>

                        {cursos.map((curso, index) => (

                            <TouchableOpacity
                                key={index}
                                style={[
                                    style.itemFiltro,
                                    cursoSelecionado === curso &&
                                    style.itemSelecionado
                                ]}
                                onPress={() => {

                                    setCursoSelecionado(curso)
                                    setMostrarFiltro(false)

                                }}
                            >

                                <Text style={style.textoFiltro}>
                                    {curso}
                                </Text>

                                <Ionicons
                                    name="chevron-forward"
                                    size={16}
                                    color="#e01a5f"
                                />

                            </TouchableOpacity>

                        ))}

                    </View>

                )}

                {postsFiltrados.map((post) => (

                    <View key={post.id} style={style.card}>

                        <View style={style.perfilContainer}>

                            <Image
                                source={{
                                    uri: "https://i.pravatar.cc/300"
                                }}
                                style={style.fotoPerfil}
                            />

                            <View
                                style={{
                                    flex: 1,
                                    marginLeft: 10
                                }}
                            >

                                <Text style={style.nomePerfil}>
                                    {post.user.name}
                                </Text>

                                <Text style={style.cursoPerfil}>
                                    {post.user.curso}
                                </Text>

                            </View>

                        </View>

                        <Text style={style.tempoPost}>
                            Produto publicado
                        </Text>

                        <Text style={style.textoPost}>
                            {post.descricao}
                        </Text>

                        <View style={style.produtoContainer}>

                            <Image
                                source={{ uri: post.imagem }}
                                style={style.imagemProduto}
                                resizeMode="cover"
                            />

                            <TouchableOpacity
                                style={style.setaDireita}
                            >

                                <Ionicons
                                    name="chevron-forward"
                                    size={20}
                                    color="#e01a5f"
                                />

                            </TouchableOpacity>

                        </View>

                        <TouchableOpacity
                            style={style.botaoVerMais}
                        >

                            <Text style={style.textoVerMais}>
                                Ver mais
                            </Text>

                        </TouchableOpacity>

                    </View>

                ))}

            </ScrollView>

        </View>

    )
}

const style = StyleSheet.create({

    fundo: {
        flex: 1,
        backgroundColor: "#F9F4F6"
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 10,
    },

    titulo: {
        fontSize: 35,
        fontWeight: "bold"
    },

    buscaContainer: {
        backgroundColor: "#e01a5f",
        marginTop: 15,
        borderRadius: 25,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        height: 40,
        width: "50%",
    },

    inputBusca: {
        flex: 1,
        color: "#fff",
        fontSize: 14,
    },

    scrollContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 100,
        marginTop: 25,
    },

    card: {
        backgroundColor: "#e6dada",
        borderRadius: 35,
        padding: 20,
        marginBottom: 25,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5
    },

    perfilContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
    },

    fotoPerfil: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
    },

    nomePerfil: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#e01a5f"
    },

    cursoPerfil: {
        fontSize: 12,
        color: "#666"
    },

    tempoPost: {
        fontSize: 13,
        color: "#000",
        lineHeight: 18,
        marginBottom: 15
    },

    textoPost: {
        fontSize: 13,
        color: "#000",
        lineHeight: 18,
        marginBottom: 15,
    },

    produtoContainer: {
        width: "100%",
        height: 200,
        backgroundColor: "#f9f9f9",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#eee",
        position: "relative"
    },

    imagemProduto: {
        width: "100%",
        height: "100%",
        borderRadius: 20,
    },

    setaDireita: {
        position: "absolute",
        right: -10,
        backgroundColor: "#fff",
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        elevation: 3
    },

    botaoVerMais: {
        backgroundColor: "#e01a5f",
        alignSelf: "center",
        paddingHorizontal: 30,
        paddingVertical: 6,
        borderRadius: 15,
        marginTop: 15
    },

    textoVerMais: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold"
    },

    linhaPesquisa: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },

    botaoFiltro: {
        marginLeft: 20,
        marginRight: 23
    },

    cardFiltro: {
        position: "absolute",
        top: 110,
        right: 20,
        width: 180,
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 15,
        elevation: 8,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        zIndex: 999,
    },

    tituloFiltro: {
        fontWeight: "bold",
        fontSize: 14,
        marginBottom: 10,
    },

    itemFiltro: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginBottom: 8,
    },

    itemSelecionado: {
        backgroundColor: "#FFC0D6",
    },

    textoFiltro: {
        fontSize: 12,
        fontWeight: "600",
    },

})