import { useRouter } from "expo-router"
import { useState } from "react"
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
export default function PaginaInicio() {

    const router = useRouter()
    const [busca, setBusca] = useState("")


    const posts = [
        {
            id: 1,
            nome: "Daniel Rosa",
            curso: "Marketing",
            tempo: "Há 8 horas",
            texto: "Pessoal! Comprei um caderno inteligente no início do ano mas acabei não usando e também não pretendo usar. Interessados, me chamem no chat!",
            fotoPerfil: "https://images.unsplash.com/photo-1654110455429-cf322b40a906?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm90byUyMGRvJTIwcGVyZmlsfGVufDB8fDB8fHww",
            imagem: "https://m.media-amazon.com/images/I/61jxpLGWDHL._AC_SY355_.jpg"
        },
        {
            id: 2,
            nome: "Sarah Livia",
            curso: "Nutrição",
            tempo: "Há 2 dias",
            texto: "A sobremesa que você precisa aqui!!! 🤎🤍 Estou vendendo bolos de pote pessoal! São todos bem recheados, uma delícia. Me chamem para mais informações!",
            imagem: "https://www.receiteria.com.br/wp-content/uploads/bolo-de-pote-de-chocolate-com-morango-fit-1-730x730.jpg",
            fotoPerfil: "https://wallpapers.com/images/hd/professional-profile-pictures-4162-x-6243-ds59e3wn0uignqdp.jpg"
        }

    ]

    return (

        <View style={style.fundo}>
            

            <ScrollView contentContainerStyle={style.scrollContainer} showsHorizontalScrollIndicator={false}>

                <View style={style.header}>

                    <TouchableOpacity><Ionicons name="add" size={30} color="#e01a5f" /></TouchableOpacity>
                    <Image source={require("../../assets/images/logo.png")} style={style.logo}></Image>

                    <TouchableOpacity><Ionicons name="notifications-outline" size={26} color="#e01a5f" /></TouchableOpacity>
                </View>


                <View style={style.buscaContainer}>
                    <TextInput
                        style={style.inputBusca}
                        placeholder="calculadora científica..."
                        placeholderTextColor="#ffffff9f"
                        value={busca}
                        onChangeText={setBusca}
                    />
                    <Ionicons name="search" size={20} color="#fff" />
                </View>

                {posts.map((post) => (
                    <View key={post.id} style={style.card}>
                        <View style={style.perfilContainer}>
                            <Image
                                source={{ uri: post.fotoPerfil }}
                                style={style.fotoPerfil}
                            />
                            <View style={{ flex: 1, marginLeft: 10 }} >
                                <Text style={style.nomePerfil}>{post.nome}</Text>
                                <Text style={style.cursoPerfil}>{post.curso}</Text>
                            </View>
                        </View>
                        <Text style={style.tempoPost}>{post.tempo}</Text>

                        <Text style={style.textoPost}>{post.texto}</Text>

                        <View style={style.produtoContainer}>
                            <Image
                                source={{ uri: post.imagem }}
                                style={style.imagemProduto}
                                resizeMode="cover"
                            />
                            <TouchableOpacity style={style.setaDireita}>
                                <Ionicons name="chevron-forward" size={20} color="#e01a5f" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={style.botaoVerMais}>
                            <Text style={style.textoVerMais}>Ver mais</Text>
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
        backgroundColor: "#f5f5f5"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 10,

    },
    iconTop: {
        fontSize: 24,
        color: "#e01a5f",
        fontWeight: "bold"
    },
    logo: {
        width: 160,
        height: 50,
    },
    buscaContainer: {
        backgroundColor: "#e01a5f",
        marginHorizontal: 20,
        marginTop: 15,
        marginBottom: 20, // espaço entre a busca e os cards
        borderRadius: 25,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        height: 35,
        zIndex: 10
    },
    inputBusca: {
        flex: 1,
        color: "#fff",
        fontSize: 14
    },
    iconBusca: {
        color: "#fff",
        fontSize: 18
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 100
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

})
