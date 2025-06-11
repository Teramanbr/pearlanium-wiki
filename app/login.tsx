import React, { useState } from 'react';
import { StyleSheet, TextInput, Alert, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword, resetPassword } from '@/firebase';
import { Text, View } from '@/components/Themed';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const themedTextColor = theme === 'dark' ? Colors.dark.text : Colors.light.text;
  const themedPlaceholderColor = theme === 'dark' ? '#888' : '#BBB';
  const inputBackgroundColor = theme === 'dark' ? '#1C1C1E' : '#EFEFF0';
  const inputBorderColor = theme === 'dark' ? '#3A3A3C' : '#D1D1D6';
  const customButtonColor = '#FF7001';
  const buttonTextColor = '#FFFFFF';

  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, insira seu email para redefinir a senha.');
      return;
    }
    resetPassword(email)
      .then(() => {
        Alert.alert('Sucesso', 'Um email de redefinição de senha foi enviado para ' + email);
      })
      .catch((error) => {
        Alert.alert('Erro', error.message);
      });
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha o email e a senha.');
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(email, password);
      router.replace('/profile');
    } catch (error: any) {
      let errorMessage = 'Ocorreu um erro ao fazer login';
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email inválido';
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'Esta conta foi desativada';
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Email ou senha incorretos';
      }
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: themedTextColor }]}>Login</Text>
      <TextInput
        style={[
          styles.input,
          { 
            color: themedTextColor,
            backgroundColor: inputBackgroundColor,
            borderColor: inputBorderColor,
          }
        ]}
        placeholder="Email ou Nome de Usuário"
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
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: customButtonColor }]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={buttonTextColor} />
        ) : (
          <>
            <FontAwesome name="sign-in" size={20} color={buttonTextColor} style={styles.buttonIcon} />
            <Text style={[styles.buttonText, { color: buttonTextColor }]}>Entrar</Text>
          </>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
        <Text style={[styles.signUpText, { color: customButtonColor }]}>
          Não tem uma conta? <Text style={styles.signUpLink}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordButton}>
        <Text style={[styles.forgotPasswordText, { color: themedTextColor }]}>
          Esqueceu sua senha?
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
  signUpButton: {
    marginTop: 20,
  },
  signUpText: {
    fontSize: 14,
    textAlign: 'center',
  },
  signUpLink: {
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    marginTop: 15,
  },
  forgotPasswordText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
