import { useRouter } from "expo-router"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function Concluido() {
    const router = useRouter()

    return (

        <View style={style.fundo}>
            <View style={style.bolaTopo} />
            <View style={style.bolaBaixo} />

            <Image source={require("../assets/images/logo.png")} style={style.logo}></Image>


            <View style={style.card}>
                <Text style={style.titulo}>Cadastro concluído!</Text>
                <Text style={style.subtitulo}>
                    Parabéns! seu cadastro foi concluído com sucesso!
                </Text>

                
                <TouchableOpacity
                    style={style.botao}
                    onPress={() => router.push("/")}
                >
                    <Text style={style.textoBotao}>FAZER LOGIN</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const style = StyleSheet.create({
    fundo: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
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
    logoContainer: {
        position: "absolute",
        top: 80,
    },
    logoTexto: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#000",
    },
    card: {
        backgroundColor: "#fff",
        width: "80%",
        borderRadius: 30,
        padding: 30,
        alignItems: "center",
        // Sombra
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    titulo: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    subtitulo: {
        fontSize: 14,
        color: "#555",
        textAlign: "center",
        marginBottom: 30,
    },
    botao: {
        backgroundColor: "#E91E8C",
        paddingVertical: 12,
        width: "100%",
        borderRadius: 25,
        alignItems: "center",
    },
    textoBotao: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "bold",
    },
    logo: {
        width: 160,
        height: 50,
    }
})