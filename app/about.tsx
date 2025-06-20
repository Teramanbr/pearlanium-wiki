import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

// import EditScreenInfo from '@/components/EditScreenInfo'; // Import não utilizado
import { Text, View } from '@/components/Themed';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre Este Aplicativo</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.infoText}>Este aplicativo é um trabalho de faculdade.</Text>

      {/* Use uma barra de status clara no iOS para compensar o espaço preto acima do modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
  }
});
