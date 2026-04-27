import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get('window');

export default function Index() {
  const [cpf, setCpf] = useState("")
  const [senha, setSenha] = useState("")

  const router = useRouter()

  const [mostrarSenha, setMostrarSenha] = useState(false)
  // Para a função de ocultar senha

  return (
    <View style={style.fundo}>
      <View style={style.bolaTopo} />
      <View style={style.bolaBaixo} />

      <Image source={require("../assets/images/logo.png")}
      style={style.logo}></Image>

      <ScrollView contentContainerStyle={style.scrollContainer}>

        <View style={style.card}>

          <View style={style.header}>
            <Text style={style.titulo}>Bem vindo ao</Text>
            <Image source={require("../assets/images/logo.png")}
              style={style.logoInline}></Image>
          </View>

          <Text style={style.subtitulo}>Preencha os dados de login para acessar</Text>

          <View style={style.inputArea}>
            <TextInput
              style={style.input}
              placeholder="CPF"
              value={cpf}
              onChangeText={setCpf}>
            </TextInput>

            <MaterialCommunityIcons
              name="account"
              size={22}
              color="#000000"
            />
          </View>

          <View style={style.inputArea}>
            <TextInput
              style={style.input}
              placeholder="Senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!mostrarSenha}
            >
            </TextInput>

            <TouchableOpacity onPress={() => setMostrarSenha(prev => !prev)}>
              <MaterialCommunityIcons
                name={mostrarSenha ? "eye-off" : "eye"}
                size={24}
                color="#333"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={style.botao}
            onPress={() => router.push("/")}
          >
            <Text style={style.textoBotao}>Entrar</Text>
          </TouchableOpacity>

          <View style={style.loginContainer}>
            <Text>Não possui cadastro?</Text>

            <Link href={"/cadastro"}><Text style={style.textoCadastro}>Me Cadastrar</Text></Link>

          </View>

        </View>

      </ScrollView>

    </View>
  )
}

const style = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: "#fff"
  },

  bolaTopo: {
    position: "absolute",
    top: -50,
    left: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#E91E8C",
  },

  bolaBaixo: {
    position: "absolute",
    bottom: -80,
    right: -50,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#E91E8C",
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    backgroundColor: "#fff",
    width: "85%",
    borderRadius: 30,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 100,
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

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8, //espaço entre o texto e logo
  },

  logo: {
    width: 160,
    height: 50,
    alignSelf: "center",
    marginTop: 60,
  },

  logoInline: {
    width: 80,
    height: 30,
    resizeMode: "contain",
    top: 2,
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

  botao: {
    backgroundColor: "#E91E8C",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },

  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    gap: 4,
  },

  textoCadastro: {
    color: "#E91E8C",
    fontWeight: "bold",
  },

})
