import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"

import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context"
import { router } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";

const { width } = Dimensions.get("window")

export default function ultimascompras() {

  const [marcado, setMarcado] = useState(false)
  const [descricao, setDescricao] = useState("Descrição do produto...")

  const [nomeProduto, setNomeProduto] = useState(
    "Livro Conexões com a Matemática - Vereda Digital"
  )

  const [preco, setPreco] = useState(
    "R$ 25,00"
  )

  const [locais, setLocais] = useState([
    "Pátio 1",
    "Pátio 2",
    "Biblioteca",
  ])

  const [horarios, setHorarios] = useState([
    "13:00",
    "14:30",
    "16:00",
  ])

  const editarItem = (
    lista: string[],
    setLista: Function,
    index: number
  ) => {

    const novoValor = prompt("Editar item:", lista[index])

    if (novoValor && novoValor.trim() !== "") {
      const novaLista = [...lista]
      novaLista[index] = novoValor
      setLista(novaLista)
    }
  }

  const adicionarItem = (
    lista: string[],
    setLista: Function,
    placeholder: string
  ) => {

    const novoValor = prompt(placeholder)

    if (novoValor && novoValor.trim() !== "") {
      setLista([...lista, novoValor])
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


          <Image
            style={style.fotoProduto}
            source={{ uri: "https://i.pravatar.cc/159" }}
          >
          </Image>

          <View style={style.infoProduto}>

            <TouchableOpacity
              style={style.campoEditavel}
              onPress={() => {

                const texto = prompt(
                  "Digite o nome do produto",
                  nomeProduto
                )

                if (texto) {
                  setNomeProduto(texto)
                }

              }}
            >

              <Text style={style.nomeProduto}>
                {nomeProduto}
              </Text>

              <MaterialCommunityIcons
                name="pencil"
                size={16}
                color="#e01a5f"
              />

            </TouchableOpacity>

            <TouchableOpacity
              style={style.campoEditavelPreco}
              onPress={() => {

                const texto = prompt(
                  "Digite o preço",
                  preco
                )

                if (texto) {
                  setPreco(texto)
                }

              }}
            >

              <Text style={style.preco}>
                {preco}
              </Text>

              <MaterialCommunityIcons
                name="pencil"
                size={14}
                color="#e01a5f"
              />

            </TouchableOpacity>

          </View>

          <View style={style.container2}>

            <View>

              <Text style={style.tituloSecao}>LOCAL</Text>

              <View style={style.card2}>

                {locais.map((local, index) => (
                  <TouchableOpacity
                    key={index}
                    style={style.card3}
                    onPress={() => editarItem(locais, setLocais, index)}
                  >

                    <Text style={style.card3Texto}>
                      {local}
                    </Text>

                    <MaterialCommunityIcons
                      name="pencil"
                      size={10}
                      color="#000"
                    />

                  </TouchableOpacity>
                ))}

                <TouchableOpacity
                  style={style.cardAdicionar}
                  onPress={() =>
                    adicionarItem(
                      locais,
                      setLocais,
                      "Novo local"
                    )
                  }
                >

                  <Ionicons
                    name="add"
                    size={16}
                    color="#e01a5f"
                  />

                </TouchableOpacity>

              </View>
            </View>

            <View>

              <Text style={style.tituloSecao}>HORÁRIO</Text>

              <View style={style.card2}>

                {horarios.map((horario, index) => (
                  <TouchableOpacity
                    key={index}
                    style={style.card3}
                    onPress={() => editarItem(horarios, setHorarios, index)}
                  >

                    <Text style={style.card3Texto}>
                      {horario}
                    </Text>

                    <MaterialCommunityIcons
                      name="pencil"
                      size={10}
                      color="#000"
                    />

                  </TouchableOpacity>
                ))}

                <TouchableOpacity
                  style={style.cardAdicionar}
                  onPress={() =>
                    adicionarItem(
                      horarios,
                      setHorarios,
                      "Novo horário"
                    )
                  }
                >

                  <Ionicons
                    name="add"
                    size={16}
                    color="#e01a5f"
                  />

                </TouchableOpacity>

              </View>
            </View>
          </View>

          <View
            style={[
              style.botao,
              {
                backgroundColor: marcado ? "#ccc" : "#e01a5f"
              }
            ]}
          >

            <Text style={style.entregue}>ENTREGUE</Text>

            <TouchableOpacity
              style={[
                style.check,
                {
                  backgroundColor: marcado ? "#e01a5f" : "#fff"
                }
              ]}
              onPress={() => setMarcado(!marcado)}
            >

              {marcado && (
                <MaterialCommunityIcons
                  name="check"
                  size={14}
                  color="#fff"
                />
              )}

            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>

      <View style={style.menuInferior}>

        <TouchableOpacity style={style.menuItem}>
          <Ionicons
            name="people-outline"
            size={30}
            color="#fff"
          />
        </TouchableOpacity>

        <View style={style.homeCirculo}>

          <TouchableOpacity
            style={style.homeBotao}
            onPress={() => router.push("/")}
          >

            <Ionicons
              name="home"
              size={32}
              color="#fff"
            />

          </TouchableOpacity>

        </View>

        <TouchableOpacity style={style.menuItem}>
          <Ionicons
            name="person-outline"
            size={30}
            color="#fff"
          />
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  )
}

const style = StyleSheet.create({

  container2: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 15,
    marginTop: 10,
  },

  card3Texto: {
    fontSize: 10,
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

    // garante espaço caso o gap não funcione
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

    flexDirection: "row", // coloca em linha
    alignItems: "center", // centraliza vertical
    justifyContent: "space-between", // separa esquerda/direita

    paddingHorizontal: 15, // dá espaço interno
    marginTop: 20,
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

  preco: {
    color: "#e01a5f",
    fontWeight: "bold",
    marginTop: 5,
  },

  nomeProduto: {
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
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
    paddingTop: 10
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

  infoProduto: {
    alignItems: "center",
    marginTop: 10,
    gap: 8,
  },

  campoEditavel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,

    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 8,

    borderRadius: 15,

    maxWidth: 220,
  },

  campoEditavelPreco: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,

    backgroundColor: "#ffe3ee",
    paddingHorizontal: 14,
    paddingVertical: 6,

    borderRadius: 20,
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

  tituloSecao: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
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
    width: 300,
    height: 750,
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
  },

  cursoPerfil: {
    fontSize: 12,
    color: "#666",
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
    width: 167,
    height: 221,
  },

  botaoVoltar: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 20,
  },

  cardAdicionar: {
    backgroundColor: "#fff",
    width: 75,
    height: 20,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e01a5f",
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


})