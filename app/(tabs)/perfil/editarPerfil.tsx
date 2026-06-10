import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import api from "../../_lib/api";
import { COURSE_OPTIONS } from "../../_lib/cursos";
import { getUserSession, saveUserSession } from "../../_lib/session";
import { useTheme } from '../../_lib/theme';
import { isValidEmail, isValidPhone } from "../../_lib/validation";

export default function EditarPerfil() {
    const router = useRouter();
    const { darkMode } = useTheme();

    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [celular, setCelular] = useState("");
    const [email, setEmail] = useState("");
    const [identidade, setIdentidade] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [genero, setGenero] = useState("Masculino");
    const [rm, setRM] = useState("");
    const [curso, setCurso] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        getUserSession()
            .then((user) => {
                if (!user) {
                    router.push('/');
                    return;
                }

                setUserId(user.id);
                const [first, ...rest] = user.name?.split(' ') ?? [''];
                setNome(first ?? '');
                setSobrenome(rest.join(' ') ?? '');
                setCelular(user.telNumero ?? '');
                setEmail(user.email ?? '');
                setRM(user.rm ?? '');
                setCurso(user.curso ?? '');
            })
            .catch((error) => {
                console.error(error);
                Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
            })
            .finally(() => setLoading(false));
    }, [router]);

    const handleSave = async () => {
        if (!userId) {
            router.push('/');
            return;
        }

        const name = [nome, sobrenome].filter(Boolean).join(' ').trim();

        if (!name) {
            Alert.alert('Erro', 'Informe seu nome completo.')
            return;
        }

        if (!email) {
            Alert.alert('Erro', 'Informe seu email.')
            return;
        }

        if (!isValidEmail(email)) {
            Alert.alert('Erro', 'Informe um email válido.')
            return;
        }

        if (celular && !isValidPhone(celular)) {
            Alert.alert('Erro', 'Informe um telefone válido com pelo menos 10 dígitos.')
            return;
        }
        if (!curso) {
            Alert.alert('Erro', 'Escolha o seu curso.')
            return
        }
        setSaving(true);

        try {
            await api.updateUser(userId, {
                name,
                email,
                rm,
                curso,
                telNumero: celular,
            });

            await saveUserSession({
                id: userId,
                email,
                name,
                rm,
                curso,
                telNumero: celular,
            });

            Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
            router.push('/(tabs)/perfil/perfil');
        } catch (error: any) {
            console.error(error);
            Alert.alert('Erro', error?.message || 'Falha ao atualizar perfil.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <View style={style.fundo}>
                <Text style={style.loadingText}>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={[style.fundo, darkMode && style.fundoDark]}>
            <View style={style.faixaRosaTopo} />
            <View style={style.bolaTopo} />
            <View style={style.bolaBaixo} />

            <TouchableOpacity style={style.botaoVoltar} onPress={() => router.push("/(tabs)/perfil/perfil")}>
                <Ionicons name="chevron-back" size={30} color="#fff" />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={style.scrollContainer} showsVerticalScrollIndicator={false}>

                <View style={[style.card, darkMode && style.cardDark]}>
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
                        <Text style={style.label}>RM</Text>
                        <TextInput style={style.input} value={rm} onChangeText={setRM} placeholder="RM" />
                    </View>

                    <View style={style.campoInteiro}>
                        <Text style={style.label}>Curso</Text>
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

                    <TouchableOpacity style={[style.saveButton, saving && style.saveButtonDisabled]} onPress={handleSave} disabled={saving}>
                        <Text style={style.saveButtonText}>{saving ? 'Salvando...' : 'Salvar alterações'}</Text>
                    </TouchableOpacity>

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
    cardDark: {
        backgroundColor: '#2c2c2c',
    },
    fundoDark: {
        backgroundColor: '#121212',
    },
    textDark: {
        color: '#f8f8f8',
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
    courseList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: 8,
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

    loadingText: {
        textAlign: 'center',
        marginTop: 40,
        color: '#444'
    },
    saveButton: {
        backgroundColor: "#e01a5f",
        borderRadius: 20,
        paddingVertical: 15,
        alignItems: "center",
        marginTop: 10,
    },
    saveButtonDisabled: {
        opacity: 0.6,
    },
    saveButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },


})