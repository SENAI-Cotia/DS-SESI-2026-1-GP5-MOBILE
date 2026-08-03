import { useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Text from './_lib/Text';
import { theme, useTheme } from './_lib/theme';

export default function Concluido() {
    const router = useRouter()
    const { darkMode } = useTheme()
    const colors = darkMode ? theme.dark : theme.light

    return (

        <View style={[style.fundo, darkMode && style.fundoDark]}>
            <View style={style.bolaTopo} />
            <Text>Teste</Text>
            <View style={style.bolaBaixo} />

            <Image source={require("../assets/images/logo.png")} style={style.logo}></Image>


            <View style={[style.card, darkMode && style.cardDark]}>
                <Text style={[style.titulo, darkMode && style.tituloDark]}>Cadastro concluído!</Text>
                <Text style={[style.subtitulo, darkMode && style.subtituloDark]}>
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
        backgroundColor: "#e01a5f",
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