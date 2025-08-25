import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

export default function AddressScreen({ route, navigation, theme }) {
  const { alunoNome } = route.params || {};
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState(null);

  async function buscarEndereco() {
    if (cep.length !== 8) {
      Alert.alert("Erro", "Digite um CEP válido com 8 digitos");
      return;
    }
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        Alert.alert("Erro", "CEP não encontrado.");
      } else {
        setEndereco(data);
      }
    } catch (_error) {
      Alert.alert("Erro", "Não foi possível buscar o endereço.");
    }
  }

  async function salvarEndereco() {
    try {
      Alert.alert("Sucesso", `Endereço salvo para o aluno ${alunoNome}!`);
      navigation.goBack();
    } catch (_error) {
      Alert.alert("Erro", "Não foi possível salvar o endereço.");
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.label, { color: theme.text }]}>
        Cadastrar endereço para {alunoNome}
      </Text>

      {/* controle de preto para branco */}
      <TextInput
        style={[styles.input, { borderColor: theme.text, color: theme.text }]}
        placeholder="Digite o cep"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
        placeholderTextColor="#888"
      />

      <Button title="Buscar" onPress={buscarEndereco} color="#4CAF50" />
      {/* COntrole de preto para branco */}
      {endereco && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: theme.text }}>Rua:{endereco.logradouro}</Text>
          <Text style={{ color: theme.text }}>Bairro:{endereco.bairro}</Text>
          <Text style={{ color: theme.text }}>
            Cidade:{endereco.localidade}
          </Text>
          <Text style={{ color: theme.text }}>Estado:{endereco.uf}</Text>

          <View style={{ marginTop: 10 }}>
            <Button
              title="Salvar endereço"
              onPress={salvarEndereco}
              color="#2196f3"
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginBottom: 10 },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
});
