import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { auth, logout } from '@/firebase';

export default function ProfileScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const user = auth.currentUser;

  const themedTextColor = theme === 'dark' ? Colors.dark.text : Colors.light.text;
  const buttonColor = '#FF7001';
  const buttonTextColor = '#FFFFFF';
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(
    user?.email ? user.email.split('@')[0] : 'Usuário'
  );
  const joinDate = user?.metadata.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('pt-BR')
    : 'Data desconhecida';

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/login');
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao fazer logout');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <FontAwesome 
          name="user-circle" 
          size={80} 
          color={themedTextColor} 
          style={styles.profileIcon}
        />
        {isEditing ? (
          <TextInput
            style={[styles.input, { color: themedTextColor }]}
            value={username}
            onChangeText={setUsername}
            autoFocus
          />
        ) : (
          <Text style={[styles.title, { color: themedTextColor }]}>
            {username}
          </Text>
        )}
        <Text style={[styles.joinDate, { color: themedTextColor }]}>
          Membro desde: {joinDate}
        </Text>
        <TouchableOpacity
          onPress={() => setIsEditing(!isEditing)}
          style={styles.editButton}
        >
          <FontAwesome
            name={isEditing ? 'save' : 'pencil'}
            size={20}
            color={themedTextColor}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: buttonColor }]}
        onPress={handleLogout}
      >
        <FontAwesome name="sign-out" size={20} color={buttonTextColor} style={styles.buttonIcon} />
        <Text style={[styles.buttonText, { color: buttonTextColor }]}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    padding: 5,
  },
  joinDate: {
    fontSize: 14,
    marginBottom: 20,
    opacity: 0.8,
  },
  editButton: {
    padding: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 40,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  profileIcon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
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
});
