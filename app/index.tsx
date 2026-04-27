import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get('window');

export default function Index() {
  const [cpf, setCpf] = useState("")
  const [senha, setSenha] = useState("")

  const router = useRouter()

  return (
    <View style={style.fundo}>
      <View style={style.bolaTopo} />
      <View style={style.bolaBaixo} />

      <ScrollView contentContainerStyle={style.scrollContainer}>

        <Image source={require("../assets/images/logo.png")} style={style.logo}></Image>

        <View style={style.card}>

          <View style={style.titulo}>Bem vindo ao</View>

        </View>

      </ScrollView>

      <Link href={"/cadastro"}>Criar uma conta </Link>
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
    paddingTop: 60,
    paddingBottom: 40,
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
  }
})
