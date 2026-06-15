import { Ionicons } from "@expo/vector-icons"
import { useIsFocused } from '@react-navigation/native'
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import api from "../_lib/api"
import { COURSE_OPTIONS } from "../_lib/cursos"
import { getUserCurso } from "../_lib/session"
import { useTheme } from '../_lib/theme';

interface Produto {
    id: number;
    name: string;
    descricao: string;
    imagem?: string[];
    disponibilidade?: boolean;
    user?: {
        name?: string;
        curso?: string;
    };
}

export default function PaginaInicio() {
    const { darkMode } = useTheme();
    const router = useRouter()
    const [busca, setBusca] = useState("")
    const [mostrarFiltro, setMostrarFiltro] = useState(false)
    const [cursoSelecionado, setCursoSelecionado] = useState("")

    const cursos = [
        'Todos',
        ...COURSE_OPTIONS,
    ]

    const [produtos, setProdutos] = useState<Produto[]>([])
    const [loading, setLoading] = useState(true)

    const isFocused = useIsFocused()

    useEffect(() => {
        let mounted = true
        getUserCurso()
            .then((savedCurso) => {
                if (!mounted) return
                if (savedCurso && cursos.includes(savedCurso)) {
                    setCursoSelecionado(savedCurso)
                }
            })
            .catch(() => { })

        setLoading(true)
        api.listProducts()
            .then((data) => {
                if (!mounted) return
                const disponiveis = Array.isArray(data)
                    ? data.filter((produto: Produto) => produto.disponibilidade !== false)
                    : []
                setProdutos(disponiveis)
            })
            .catch((error) => {
                console.error('Erro carregando produtos:', error)
            })
            .finally(() => { if (mounted) setLoading(false) })

        return () => { mounted = false }
    }, [isFocused])

    const postsFiltrados = produtos.filter((produto) => {
        const matchesCurso = cursoSelecionado === "" || cursoSelecionado === "Todos" || produto.user?.curso === cursoSelecionado
        const texto = busca.toLowerCase().trim()
        const matchesTexto = !texto ||
            produto.name.toLowerCase().includes(texto) ||
            produto.descricao.toLowerCase().includes(texto) ||
            (produto.user?.name ?? '').toLowerCase().includes(texto) ||
            (produto.user?.curso ?? '').toLowerCase().includes(texto)
        return matchesCurso && matchesTexto
    })


import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native"

        <View style={[style.fundo, darkMode && style.fundoDark]}>


            <ScrollView contentContainerStyle={style.scrollContainer} showsHorizontalScrollIndicator={false}>

  const postsFiltrados =
    cursoSelecionado === "" || cursoSelecionado === "Todos"
      ? posts
      : posts.filter(
          (post) => post.curso === cursoSelecionado
        )

                    <TouchableOpacity onPress={() => router.push('/novoProduto')}><Ionicons name="add" size={30} color="#e01a5f" /></TouchableOpacity>
                    <Text style={[style.titulo, darkMode && style.tituloDark]}>
                        C<Image source={require("../../assets/images/logo-etrooc-infinito.png")} style={style.logo}></Image>MUNIDADE</Text>

                    <TouchableOpacity><Ionicons name="notifications-outline" size={26} color="#e01a5f" /></TouchableOpacity>
                </View>

            <TextInput
              style={style.inputBusca}
              value={busca}
              onChangeText={setBusca}
            />

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

                    <TouchableOpacity
                        style={style.botaoFiltro}
                        onPress={() => setMostrarFiltro(!mostrarFiltro)}
                    >
                        <Ionicons name="filter-sharp" size={20} color="#e01a5f" />
                    </TouchableOpacity>

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

                            <TouchableOpacity
                                key={index}
                                style={[
                                    style.itemFiltro,
                                    cursoSelecionado === curso && style.itemSelecionado
                                ]}
                                onPress={() => {
                                    setCursoSelecionado(curso)
                                    setMostrarFiltro(false)
                                }}
                            >

                                <Text style={[style.textoFiltro, cursoSelecionado === curso && style.textoFiltroSelected]}>
                                    {curso}
                                </Text>

                                <Ionicons
                                    name="chevron-forward"
                                    size={16}
                                    color={cursoSelecionado === curso ? '#fff' : '#f43170'}
                                />

          </View>
        )}

        {postsFiltrados.map((post) => (
          <View
            key={post.id}
            style={style.card}
          >

            <View style={style.perfilContainer}>

              <Image
                source={{ uri: post.fotoPerfil }}
                style={style.fotoPerfil}
              />




                {postsFiltrados.map((produto) => (
                    <View key={produto.id} style={[style.card, darkMode && { backgroundColor: "#333" }]}>
                        <View style={[style.perfilContainer, darkMode && { backgroundColor: "#333" }]}>
                            <View style={style.fotoPerfil}>
                                <Text style={style.fotoInicial}>{produto.user?.name?.trim()?.charAt(0).toUpperCase() ?? 'U'}</Text>
                            </View>
                            <View style={{ flex: 1, marginLeft: 10 }} >
                                <Text style={[style.nomePerfil, darkMode && { color: "#fff" }]}>
                                    {produto.user?.name ?? 'Vendedor'}
                                </Text>
                                <Text style={[style.cursoPerfil, darkMode && { color: "#ccc" }]}>
                                    {produto.user?.curso ?? ''}
                                </Text>
                            </View>
                        </View>

                        <Text style={[style.textoPost, darkMode && { color: "#ccc" }]}>
                            {produto.descricao}
                        </Text>

                        <View style={style.produtoContainer}>
                            <Image
                                source={{ uri: produto.imagem?.[0] || "https://via.placeholder.com/300" }}
                                style={style.imagemProduto}
                                resizeMode="cover"
                            />
                        </View>

                        <TouchableOpacity style={style.botaoVerMais} onPress={() => router.push(`/produto/${produto.id}`)}>
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
        backgroundColor: "#F9F4F6"
    },
    logo: {
        width: 44,
        height: 34,
        marginHorizontal: 4,
    },
    fundoDark: {
        backgroundColor: "#121212",
    },
    tituloDark: {
        color: "#fff",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 30,

    },
    iconTop: {
        fontSize: 24,
        color: "#e01a5f",
        fontWeight: "bold"
    },
    titulo: {
        fontSize: 30,
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
        width: "93%",
    },

            <TouchableOpacity style={style.botaoVerMais}>

    iconBusca: {
        color: "#fff",
        fontSize: 18,

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
        backgroundColor: '#e01a5f',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fotoInicial: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
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
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
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
        backgroundColor: "transparent",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 8,
        marginBottom: 6,
    },

    itemSelecionado: {
        backgroundColor: "#f43170",
        borderRadius: 10,
    },

    textoFiltro: {
        fontSize: 13,
        fontWeight: "600",
        color: '#444'
    },
    textoFiltroSelected: {
        color: '#fff',
        fontWeight: '700'
    },

})