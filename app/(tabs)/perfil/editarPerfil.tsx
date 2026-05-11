import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function editarPerfil() {
    const router = useRouter()

    const [nome, setNome] = useState("Pietro")
    const [sobrenome, setSobrenome] = useState("Augusto")
    const [celular, setCelular] = useState("(11) 91234-5678")
    const [email, setEmail] = useState("pietro.augusto@gmail.com")
    const [identidade, setIdentidade] = useState("123-456-789-10")
    const [nascimento, setNascimento] = useState("01/02/2003")
    const [rm, setRM] = useState("112233")
    const [genero, setGenero] = useState("Masculino")

    return (
        <View style={style.fundo}>
            <View style={style.faixaRosaTopo} />
            <View style={style.bolaTopo} />
            <View style={style.bolaBaixo} />

            <TouchableOpacity
                style={style.botaoVoltar}
                onPress={() => router.back()}
            >
                <Ionicons name="chevron-back" size={30} color="#fff" />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={style.scrollContainer} showsVerticalScrollIndicator={false}>

                <View style={style.card}>
                    <Text style={style.tituloCard}>Informações da conta</Text>

                    <View style={style.linhaDupla}>
                        <View style={style.campoMetade}>
                            <Text style={style.label}>Nome</Text>
                            <TextInput style={style.input} value={nome} onChangeText={setNome} />
                        </View>
                        <View style={style.campoMetade}>
                            <Text style={style.label}>Sobrenome</Text>
                            <TextInput style={style.input} value={sobrenome} onChangeText={setSobrenome} />
                        </View>
                    </View>

                    <View style={style.campoInteiro}>
                        <View style={style.labelComIcone}>
                            <Text style={style.label}>Celular</Text>
                            <Ionicons name="pencil" size={14} color="#000" style={{ marginLeft: 5 }} />
                        </View>
                        <TextInput style={style.input} value={celular} onChangeText={setCelular} />
                    </View>

                    <View style={style.campoInteiro}>
                        <View style={style.labelComIcone}>
                            <Text style={style.label}>Email</Text>
                            <Ionicons name="pencil" size={14} color="#000" style={{ marginLeft: 5 }} />
                        </View>
                        <TextInput style={style.input} value={email} onChangeText={setEmail} />
                    </View>

                    <View style={style.campoInteiro}>
                        <Text style={style.label}>Número de Identidade</Text>
                        <TextInput style={style.input} value={identidade} onChangeText={setIdentidade} />
                    </View>

                    <View style={style.campoInteiro}>
                        <Text style={style.label}>Data de Nascimento</Text>
                        <TextInput style={style.input} value={nascimento} onChangeText={setNascimento} />
                    </View>

                    <View style={style.campoInteiro}>
                        <Text style={style.label}>RM</Text>
                        <TextInput style={style.input} value={rm} onChangeText={setRM} />
                    </View>

                    <View style={style.campoInteiro}>
                        <Text style={style.label}>Gênero</Text>
                        <View style={style.seletorGenero}>
                            <TouchableOpacity
                                style={[style.opcaoGenero, genero === "Masculino" && style.opcaoAtiva]}
                                onPress={() => setGenero("Masculino")}
                            >
                                <Text style={[style.textoGenero, genero === "Masculino" && style.textoAtivo]}>Masculino</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[style.opcaoGenero, genero === "Feminino" && style.opcaoAtiva]}
                                onPress={() => setGenero("Feminino")}
                            >
                                <Text style={[style.textoGenero, genero === "Feminino" && style.textoAtivo]}>Feminino</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </ScrollView>





        </View>
    )
}

const style = StyleSheet.create({
    fundo: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    faixaRosaTopo: {
        position: "absolute",
        top: 0,
        width: "100%",
        height: 100,
        backgroundColor: "#e01a5f",
        transform: [{ skewY: "-10deg" }, { translateY: -30 }],
    },
    bolaTopo: {
        position: "absolute",
        top: -50,
        left: -50,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: "#e01a5f",
        shadowColor: "#000",
        shadowRadius: 6,
        shadowOpacity: 0.8
    },
    bolaBaixo: {
        position: "absolute",
        bottom: -80,
        right: -50,
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: "#e01a5f",
        shadowColor: "#000",
        shadowRadius: 6,
        shadowOpacity: 0.8
    },
    scrollContainer: {
        paddingHorizontal: 25,
        paddingTop: 100,
        paddingBottom: 120,
        alignItems: "center",
    },
    botaoVoltar: {
        position: "absolute",
        top: 50,
        left: 20,
        zIndex: 20,
    },
    card: {
        backgroundColor: "#fff",
        width: "100%",
        borderRadius: 35,
        padding: 25,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 8,
    },
    tituloCard: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 25,
    },
    linhaDupla: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    campoMetade: {
        width: "48%",
    },
    campoInteiro: {
        width: "100%",
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#999",
        marginBottom: 5,
    },
    labelComIcone: {
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        fontSize: 14,
        color: "#000",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        paddingVertical: 5,
    },
    linhaDivisoria: {
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        marginTop: 5,
    },
    seletorGenero: {
        flexDirection: "row",
        marginTop: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 15,
        padding: 5,
    },
    opcaoGenero: {
        flex: 1,
        paddingVertical: 8,
        alignItems: "center",
        borderRadius: 12,
    },
    opcaoAtiva: {
        backgroundColor: "#e01a5f",
    },
    textoGenero: {
        fontSize: 14,
        color: "#666",
    },
    textoAtivo: {
        color: "#fff",
        fontWeight: "bold",
    },


})