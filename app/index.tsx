import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Dimensions, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import api from './_lib/api';
import { saveUserSession } from './_lib/session';
import { isValidEmail } from './_lib/validation';
import Text from './_lib/Text';

const { width } = Dimensions.get('window');

export default function Index() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const router = useRouter()

  const [mostrarSenha, setMostrarSenha] = useState(false)

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha email e senha')
      return
    }

    if (!isValidEmail(email)) {
      Alert.alert('Erro', 'Informe um email válido')
      return
    }

    if (senha.length < 8) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 8 caracteres')
      return
    }

    try {
      const result = await api.login({ email, password: senha })
      const user = result?.user ?? result
      if (!user?.id) {
        const message = result?.error || result?.message || result?.msg || 'Email ou senha incorretos'
        Alert.alert('Erro', String(message))
        return
      }
      await saveUserSession({
        id: user.id,
        email: user.email,
        name: user.name,
        rm: user.rm,
        curso: user.curso,
        telNumero: user.telNumero,
        funcao: user.funcao,
      })
      router.push('/(tabs)/inicio')
    } catch (err: any) {
      const message = typeof err === 'string' ? err : err?.message || 'Falha ao efetuar login'
      Alert.alert('Erro', message)
    }
  }

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
              placeholder="Email"
              placeholderTextColor="#999999"
              value={email}
              onChangeText={setEmail}>
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
              placeholderTextColor="#999999"
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
            onPress={handleLogin}
          >
           <Text style={style.textoBotao}>Entrar</Text>
          </TouchableOpacity>

          <View style={style.loginContainer}>
            <Text style={style.text}>Não possui cadastro?</Text>

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
    marginTop: 30,
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
    color: '#111',
  },

  inputDark: {
    color: '#f5f5f5',
  },

  inputAreaDark: {
    borderBottomColor: '#444',
  },

  cardDark: {
    backgroundColor: '#1e1e1e',
    borderColor: '#333',
  },

  fundoDark: {
    backgroundColor: '#121212',
  },

  tituloDark: {
    color: '#f8f8f8',
  },

  subtituloDark: {
    color: '#c1c1c7',
  },

  textDark: {
    color: '#f5f5f5',
  },

  text: {
    color: '#333',
  },

  textoCadastroDark: {
    color: '#ff7fa9',
  },

  botao: {
    backgroundColor: "#e01a5f",
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
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 15,
  gap: 4,
},

  textoCadastro: {
    color: "#e01a5f",
    fontWeight: "bold",
  },

})
