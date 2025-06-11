import React, { useState } from 'react';
import { StyleSheet, TextInput, Alert, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword, updateUserProfile } from '@/firebase';
import { Text, View } from '@/components/Themed';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router'; // Import useRouter for navigation

export default function SignUpScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const themedTextColor = theme === 'dark' ? Colors.dark.text : Colors.light.text;
  const themedPlaceholderColor = theme === 'dark' ? '#888' : '#BBB';
  const inputBackgroundColor = theme === 'dark' ? '#1C1C1E' : '#EFEFF0';
  const inputBorderColor = theme === 'dark' ? '#3A3A3C' : '#D1D1D6';
  const buttonColor = '#FF7001'; 
  const buttonTextColor = '#FFFFFF';

  const handleSignUp = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(email, password);
      if (userCredential.user) {
        await updateUserProfile(userCredential.user, { displayName: username });
      }
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      router.replace('/login');
    } catch (error: any) {
      let errorMessage = 'Ocorreu um erro ao criar a conta';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Este email já está em uso';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email inválido';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'A senha deve ter pelo menos 6 caracteres';
      }
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: themedTextColor }]}>Criar Conta</Text>
      <TextInput
        style={[
          styles.input,
          { 
            color: themedTextColor,
            backgroundColor: inputBackgroundColor,
            borderColor: inputBorderColor,
          }
        ]}
        placeholder="Nome de usuário"
        placeholderTextColor={themedPlaceholderColor}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={[
          styles.input,
          { 
            color: themedTextColor,
            backgroundColor: inputBackgroundColor,
            borderColor: inputBorderColor,
          }
        ]}
        placeholder="Email"
        placeholderTextColor={themedPlaceholderColor}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={[
          styles.input,
          {
            color: themedTextColor,
            backgroundColor: inputBackgroundColor,
            borderColor: inputBorderColor,
          }
        ]}
        placeholder="Senha"
        placeholderTextColor={themedPlaceholderColor}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={[
          styles.input,
          {
            color: themedTextColor,
            backgroundColor: inputBackgroundColor,
            borderColor: inputBorderColor,
          }
        ]}
        placeholder="Confirmar Senha"
        placeholderTextColor={themedPlaceholderColor}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: buttonColor }]} 
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={buttonTextColor} />
        ) : (
          <>
            <FontAwesome name="user-plus" size={20} color={buttonTextColor} style={styles.buttonIcon} />
            <Text style={[styles.buttonText, { color: buttonTextColor }]}>Cadastrar</Text>
          </>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/login')} style={styles.signInButton}>
        <Text style={[styles.signInText, { color: buttonColor }]}>
          Já tem uma conta? <Text style={styles.signInLink}>Faça Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    maxWidth: 400,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInButton: {
    marginTop: 20,
  },
  signInText: {
    fontSize: 14,
    textAlign: 'center',
  },
  signInLink: {
    fontWeight: 'bold',
  },
});
