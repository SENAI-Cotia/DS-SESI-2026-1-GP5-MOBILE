import { useRouter } from "expo-router"
import { useState } from "react"

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native"

import {
  Ionicons,
  MaterialCommunityIcons
} from "@expo/vector-icons"

export default function Comunidade() {

  const router = useRouter()

  const [busca, setBusca] = useState("")
  const [mostrarFiltro, setMostrarFiltro] = useState(false)
  const [cursoSelecionado, setCursoSelecionado] = useState("")

  const cursos = [
    "Todos",
    "Desenvolvimento de Sistemas",
    "Administração",
    "RH",
    "Marketing",
    "Nutrição",
  ]

  const posts = [
    {
      id: 1,
      nome: "Leide Vikram",
      curso: "Desenvolvimento de Sistemas",
      tempo: "Há 16 horas",
      texto: "Galera! Eu comprei um teclado personalizado, mas no fim eu não gostei muito kk. Interessados?",
      fotoPerfil: "https://scontent.fcgh39-1.fna.fbcdn.net/v/t39.30808-6/344848253_603660541486991_3243920538383365764_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=X2nGH_0yMT4Q7kNvwH0f6eo&_nc_oc=Adqd28ADhp67iEsAe1lbBr9DbsXdx9d4m9muZNp7CFTEghJv4wVHpT2Tp05uoTyKQPk&_nc_zt=23&_nc_ht=scontent.fcgh39-1.fna&_nc_gid=M24zkBaBSl4N9rn-1xecjg&_nc_ss=7a289&oh=00_Af7gMxmXhG0aJXColowiajkKHF37b5NhFsj84itgs9c6Rw&oe=6A0A651A",
      imagem: "https://m.media-amazon.com/images/I/71jAUlz7KPL.jpg"
    },

    {
      id: 2,
      nome: "Victor Alexandre",
      curso: "Desenvolvimento de Sistemas",
      tempo: "Há 2 semanas",
      texto: "Gente! Comprei um curso online de Design Gráfico, já utilizei e tenho o login liberado, alguém quer?",
      imagem: "https://www.edunecursos.com.br/storage/images/2022/02/design-grafico1645132668.png",
      fotoPerfil: "https://scontent.fcgh15-1.fna.fbcdn.net/v/t39.30808-6/679881179_27412836014984980_3928926536147438789_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=20G9IkgqNzUQ7kNvwGs8tpE&_nc_oc=AdphC2QDaoIWv9vnSAIK45PvkcpEVf1FyRczSxPwKLDID_s-q9F_5uiflpKnOTnBMi4&_nc_zt=23&_nc_ht=scontent.fcgh15-1.fna&_nc_gid=Y9T6Bv12-ogtE84r32T4yQ&_nc_ss=7b289&oh=00_Af4RzQ6ewfqsR2gDXyew_v_0unaJc5wbpbOsYWfGAkl6SQ&oe=6A0A55B0"
    },

    {
      id: 3,
      nome: "Evanildo dos Santos",
      curso: "Administração",
      tempo: "Há 5 segundos",
      texto: "Vou participar de um workshop de administração, quem quiser ir comigo, só clicar aí embaixo!",
      imagem: "https://www.bentoquirino.com.br/novo/wp-content/uploads/2022/09/workshop-adm-1024x1024.png",
      fotoPerfil: "https://i.pinimg.com/736x/ee/7d/79/ee7d79d3ae2167e4a27e0076b2ea71a8.jpg"
    },

    {
      id: 4,
      nome: "Lorena Vitória",
      curso: "Administração",
      tempo: "Há 1 mês",
      texto: "Gente! Estou vendendo meu tablet seminovo, da Samsung, bateria ótima, armazenamento 128gb, em ótimo estado, com capinha e carregador, interessados me chamem!! 💗",
      imagem: "https://imgs.extra.com.br/1562531011/1xg.jpg?imwidth=500",
      fotoPerfil: "https://img.magnific.com/fotos-gratis/retrato-de-mulher-jovem-e-bonita-ao-ar-livre-no-parque_231208-4664.jpg?semt=ais_hybrid&w=740&q=80"
    },
  ]

  const postsFiltrados =
    cursoSelecionado === "" || cursoSelecionado === "Todos"
      ? posts
      : posts.filter(
          (post) => post.curso === cursoSelecionado
        )

  return (
    <View style={style.fundo}>

      <ScrollView
        contentContainerStyle={style.scrollContainer}
        showsHorizontalScrollIndicator={false}
      >

        <View style={style.header}>

          <TouchableOpacity
            onPress={() => router.push("/novoProduto")}
          >
            <Ionicons
              name="add"
              size={30}
              color="#e01a5f"
            />
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
            />

            <Ionicons
              name="search"
              size={20}
              color="#fff"
            />

          </View>

          <TouchableOpacity
            style={style.botaoFiltro}
            onPress={() => setMostrarFiltro(!mostrarFiltro)}
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
          <View
            key={post.id}
            style={style.card}
          >

            <View style={style.perfilContainer}>

              <Image
                source={{ uri: post.fotoPerfil }}
                style={style.fotoPerfil}
              />

              <View
                style={{
                  flex: 1,
                  marginLeft: 10
                }}
              >

                <Text style={style.nomePerfil}>
                  {post.nome}
                </Text>

                <Text style={style.cursoPerfil}>
                  {post.curso}
                </Text>

              </View>
            </View>

            <Text style={style.tempoPost}>
              {post.tempo}
            </Text>

            <Text style={style.textoPost}>
              {post.texto}
            </Text>

            <View style={style.produtoContainer}>

              <Image
                source={{ uri: post.imagem }}
                style={style.imagemProduto}
                resizeMode="cover"
              />

              <TouchableOpacity style={style.setaDireita}>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#e01a5f"
                />

              </TouchableOpacity>

            </View>

            <TouchableOpacity style={style.botaoVerMais}>

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

  iconTop: {
    fontSize: 24,
    color: "#e01a5f",
    fontWeight: "bold"
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