import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert, Dimensions, Image, ScrollView, StyleSheet, Text,
    TextInput,
    TouchableOpacity, View
} from 'react-native';
import api from './_lib/api';
import { COURSE_OPTIONS } from './_lib/cursos';
import { saveUserSession } from './_lib/session';
import { isValidCpf, isValidEmail, isValidPhone, validatePassword } from './_lib/validation';

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

    const handleRegister = async () => {
        const missingFields: string[] = []
    if (!email) missingFields.push('Email')
    if (!cpf) missingFields.push('CPF')
    if (!rm) missingFields.push('RM')
    if (!nome) missingFields.push('Nome')
    if (!telefone) missingFields.push('Telefone')
    if (!curso) missingFields.push('Curso')
    if (!senha) missingFields.push('Senha')
    if (!confirmarSenha) missingFields.push('Confirmar senha')

    if (missingFields.length > 0) {
            Alert.alert('Erro', `Preencha os campos: ${missingFields.join(', ')}`)
            return
        }

        if (!isValidEmail(email)) {
            Alert.alert('Erro', 'Informe um email válido')
            return
        }

        if (!isValidCpf(cpf)) {
            Alert.alert('Erro', 'Informe um CPF válido com 11 dígitos')
            return
        }

        if (!isValidPhone(telefone)) {
            Alert.alert('Erro', 'Informe um telefone válido com pelo menos 10 dígitos')
            return
        }

        const passwordValidation = validatePassword(senha)
        if (!passwordValidation.valid) {
            Alert.alert('Erro', `A senha deve conter ${passwordValidation.errors.join(', ')}`)
            return
        }

        if (senha !== confirmarSenha) {
            Alert.alert('Erro', 'A senha e a confirmação devem ser iguais')
            return
        }

        try {
            const result = await api.register({ email, password: senha, name: nome, rm, curso, telNumero: telefone })
            const user = result?.user ?? result
            if (user?.id) {
                await saveUserSession({
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    rm: user.rm,
                    curso: user.curso,
                    telNumero: user.telNumero,
                    funcao: user.funcao,
                })
            }
            Alert.alert('Sucesso', 'Cadastro realizado com sucesso!')
            router.push('/concluido')
        } catch (err: any) {
            Alert.alert('Erro', err?.message || 'Erro ao cadastrar')
        }
    }

    const [mostrarSenha, setMostrarSenha] = useState(false)

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

                        <MaterialCommunityIcons
                            name="account"
                            size={22}
                            color="#000000"
                        />
                    </View>

                    <View style={style.inputArea}>
                        <TextInput
                            style={style.input}
                            placeholder="CPF"
                            value={cpf}
                            onChangeText={setCpf}
                        ></TextInput>

                        <MaterialCommunityIcons
                            name="account"
                            size={22}
                            color="#000000"
                        />
                    </View>

                    <View style={style.inputArea}>
                        <TextInput
                            style={style.input}
                            placeholder="RM"
                            value={rm}
                            onChangeText={setRm}
                        ></TextInput>

                        <MaterialCommunityIcons
                            name="account"
                            size={22}
                            color="#000000"
                        />
                    </View>

                    <View style={style.inputArea}>
                        <TextInput
                            style={style.input}
                            placeholder="Nome Completo"
                            value={nome}
                            onChangeText={setNome}
                        ></TextInput>

                        <MaterialCommunityIcons
                            name="account"
                            size={22}
                            color="#000000"
                        />
                    </View>

                    <View style={style.inputArea}>
                        <TextInput
                            style={style.input}
                            placeholder="Telefone"
                            value={telefone}
                            onChangeText={setTelefone}
                        ></TextInput>

                        <MaterialCommunityIcons
                            name="account"
                            size={22}
                            color="#000000"
                        />
                    </View>

                    <View style={style.inputGroup}>
                        <Text style={style.courseLabel}>Curso</Text>
                        <View style={style.courseList}>
                            {COURSE_OPTIONS.map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={[
                                        style.courseOption,
                                        curso === option && style.courseOptionSelected,
                                    ]}
                                    onPress={() => setCurso(option)}
                                >
                                    <Text style={[
                                        style.courseOptionText,
                                        curso === option && style.courseOptionTextSelected,
                                    ]}>
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
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
                            value={confirmarSenha}
                            onChangeText={setConfirmarSenha}
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
                        onPress={handleRegister}
                    >
                        <Text style={style.textoBotao}>Cadastrar</Text>
                    </TouchableOpacity>

                    <View style={style.loginContainer}>

                        <Text>Já possui o cadastro? </Text>
                        <Link href={"/"}><Text style={style.textoLogin}>Logar</Text></Link>

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
        paddingTop: 30,
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
        marginTop: 30,
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
    inputGroup: {
        width: '100%',
        marginBottom: 10,
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
    courseLabel: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 8,
    },
    courseList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 15,
    },
    courseOption: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        marginRight: 10,
        marginBottom: 10,
    },
    courseOptionSelected: {
        backgroundColor: '#f43170',
        borderColor: '#f43170',
    },
    courseOptionText: {
        color: '#333',
        fontSize: 13,
    },
    courseOptionTextSelected: {
        color: '#fff',
        fontWeight: '700',
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
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15,
        gap: 4,
    },
    textoLogin: {
        color: "#e01a5f",
        fontWeight: "bold",

    },
    logo: {
        width: 160,
        height: 50,
    },


});