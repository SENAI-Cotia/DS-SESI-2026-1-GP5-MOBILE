import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
    Image
} from 'react-native';

const { width } = Dimensions.get('window');

export default function CadastroPage() {
    const [email, setEmail] = useState("")
    const [cpf, setCpf] = useState("")
    const [rm, setRm] = useState("")
    const [nome, setNome] = useState("")
    const [telefone, setTelefone] = useState("")
    const [curso, setCurso] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")

    const router = useRouter()

    return (
        <View style={style.fundo}>
            <View style={style.bolaTopo} />
            <View style={style.bolaBaixo} />


            <ScrollView contentContainerStyle={style.scrollContainer}>


                <Image source={require("../assets/images/logo.png")} style={style.logo}></Image>


                <View style={style.card}>
                    <Text style={style.titulo}>Cadastro</Text>
                    <Text style={style.subtitulo}>Preencha os dados de login para acessar</Text>


                    <View style={style.inputArea}>
                        <TextInput
                            style={style.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                        ></TextInput>
                    </View>

                    <View style={style.inputArea}>
                        <TextInput
                            style={style.input}
                            placeholder="CPF"
                            value={cpf}
                            onChangeText={setCpf}
                        ></TextInput>
                    </View>

                    <View style={style.inputArea}>
                        <TextInput
                            style={style.input}
                            placeholder="RM"
                            value={rm}
                            onChangeText={setRm}
                        ></TextInput>
                    </View>

                    <View style={style.inputArea}>
                        <TextInput
                            style={style.input}
                            placeholder="Nome Completo"
                            value={nome}
                            onChangeText={setNome}
                        ></TextInput>
                    </View>

                    <View style={style.inputArea}>
                        <TextInput
                            style={style.input}
                            placeholder="Telefone"
                            value={telefone}
                            onChangeText={setTelefone}
                        ></TextInput>
                    </View>

                    <View style={style.inputArea}>
                        <TextInput
                            style={style.input}
                            placeholder="Curso"
                            value={curso}
                            onChangeText={setCurso}
                        ></TextInput>
                    </View>

                    <View style={style.inputArea}>
                        <TextInput
                            style={style.input}
                            placeholder="Senha"
                            secureTextEntry={true}
                            value={senha}
                            onChangeText={setSenha}
                        ></TextInput>
                    </View>

                    <View style={style.dicasSenha}>
                        <Text style={style.dicaTitulo}>DEVE HAVER:</Text>
                        <Text style={style.dicaItem}>• Ao menos 8 caracteres</Text>
                        <Text style={style.dicaItem}>• Letra maiúscula</Text>
                        <Text style={style.dicaItem}>• Letra minúscula</Text>
                        <Text style={style.dicaItem}>• Número</Text>
                        <Text style={style.dicaItem}>• Símbolo</Text>
                    </View>

                    <View style={style.inputArea}>
                        <TextInput
                            style={style.input}
                            placeholder="Confirmar Senha"
                            secureTextEntry={true}
                            value={confirmarSenha}
                            onChangeText={setConfirmarSenha}
                        >
                        </TextInput>
                    </View>

                    <TouchableOpacity
                        style={style.botao}
                        onPress={() => router.push("/concluido")}
                    >
                        <Text style={style.textoBotao}>Cadastrar</Text>
                    </TouchableOpacity>

                    <View style={style.loginContainer}>
                        <Text>Já possui o cadastro? </Text>
                        <TouchableOpacity onPress={() => console.log("Ir para login")}></TouchableOpacity>
                        <Text style={style.textoLogin}>Logar</Text>
                    </View>




                </View>
            </ScrollView>
        </View>
    )

}

const style = StyleSheet.create({
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
        alignItems: "center"
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
    },
    titulo: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 5,
    },
    subtitulo: {
        fontSize: 13,
        color: "#666",
        textAlign: "center",
        marginBottom: 20,
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
    dicasSenha: {
        marginBottom: 15,
    },
    dicaTitulo: {
        fontSize: 10,
        fontWeight: "bold",
    },
    dicaItem: {
        fontSize: 10,
        color: "#333",
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
    },
    textoLogin: {
        color: "#E91E8C",
        fontWeight: "bold",
        
    },
    logo: {
        width: 160,
        height: 50,
    },


});