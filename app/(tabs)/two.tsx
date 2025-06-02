import { StyleSheet, ScrollView } from 'react-native'; // Adicionado ScrollView

// import EditScreenInfo from '@/components/EditScreenInfo'; // Import não utilizado
import { Text, View } from '@/components/Themed';

export default function TabTwoScreen() {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Itens do Mod</Text>
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      <Text style={styles.contentText}>Conteúdo sobre os itens do mod será exibido aqui.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Centraliza o título
    // justifyContent: 'center', // Removido para permitir que o conteúdo flua do topo
    paddingTop: 30, // Espaçamento no topo
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, // Espaçamento abaixo do título
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  contentText: {
    fontSize: 16,
    textAlign: 'center', // Pode ser 'left' quando for uma lista de itens
    lineHeight: 24,
  }
});
