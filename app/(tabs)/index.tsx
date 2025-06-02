import { StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'; // Adicionado Image e TouchableOpacity

import { useRouter } from 'expo-router'; // Importar useRouter
import FontAwesome from '@expo/vector-icons/FontAwesome'; // Importar FontAwesome
// import EditScreenInfo from '@/components/EditScreenInfo'; // Import não utilizado
import { Text, View } from '@/components/Themed';

// Substitua pelo caminho real do seu ícone
const modIcon = require('@/assets/images/icon.png'); // Exemplo, crie esta imagem ou use uma existente

export default function TabOneScreen() {
  const router = useRouter(); // Hook para navegação
  const tags = ["Vanilla++", "Progressão", "Hardcore", "Pós-fim", "Equipamentos", "Exploração"]; // Tags de exemplo

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.title}>Bem-vindo à wiki do Mod Perolânio!</Text>
      </View>

      <View style={styles.contentWrapper}>
        <Image source={modIcon} style={styles.modIcon} />
        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.subtitle}>Explore um novo universo de possibilidades com o Mod Pearlanium, adicionando incríveis itens, blocos e mecânicas ao seu mundo Minecraft.</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.button, styles.exploreButton]} onPress={() => router.push('/two')}>
            <FontAwesome name="cube" size={18} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Explorar Itens</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.contributeButton]} onPress={() => console.log('Contribuir Pressionado')}>
            <FontAwesome name="pencil" size={18} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Contribuir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const accentColor = '#4CAF50'; // Cor principal de destaque do app

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center', // Removido para alinhar ao topo
    // paddingTop: 30, // Removido, o banner ocupará o topo
    // paddingHorizontal: 24, // Removido daqui para o banner ocupar toda a largura
  },
  scrollView: {
    flex: 1,
  },
  banner: {
    width: '100%',
    height: 180, // Ajuste a altura conforme necessário
    backgroundColor: accentColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Espaço abaixo do banner
    padding: 20, // Padding interno para o texto do banner
  },
  contentWrapper: {
    width: '100%', // Garante que o wrapper ocupe a largura para aplicar o padding corretamente
    alignItems: 'center', // Centraliza o ícone e o subtítulo dentro deste wrapper
    paddingHorizontal: 24, // Padding horizontal para o conteúdo abaixo do banner
  },
  title: {
    fontSize: 26, // Título mais proeminente
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff', // Cor do texto do título para contraste com o banner verde
    // marginBottom: 16, // Removido, o banner gerencia o espaçamento superior
  },
  modIcon: {
    width: 100, // Tamanho do ícone
    height: 100, // Tamanho do ícone
    borderRadius: 20, // Cantos arredondados (ajuste para o quão redondo você quer)
    marginTop: -60, // Move o ícone para cima (25px sobre o banner + 20px da margem inferior do banner)
    marginBottom: 20, // Espaço entre o ícone e as tags
    // Opcional: adicione uma borda se desejar
    // borderWidth: 2,
    // borderColor: '#ddd', // Cor da borda
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  tagsContainer: {
    flexDirection: 'row', // Alinha as tags horizontalmente
    flexWrap: 'wrap', // Permite que as tags quebrem para a próxima linha
    justifyContent: 'center', // Centraliza as tags no container
    alignItems: 'center',
    marginBottom: 20, // Espaço entre as tags e o subtítulo
    // O marginTop é implicitamente criado pelo marginBottom do modIcon
  },
  tag: {
    backgroundColor: accentColor,
    borderRadius: 15, // Para um visual de "pílula"
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4, // Espaçamento entre as tags
  },
  tagText: {
    color: '#fff', // Texto branco para contraste
    fontSize: 12,    fontWeight: '600', // Semi-bold para destaque
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26, // Melhorando a legibilidade com maior altura de linha
    // marginBottom: 20, // Espaço para os botões será dado pelo marginTop do buttonsContainer
  },
  buttonsContainer: {
    marginTop: 30, // Espaço acima dos botões
    width: '100%', // Para os botões ocuparem a largura do contentWrapper
    alignItems: 'center', // Centraliza os botões se eles não tiverem width 100%
  },
  button: {
    width: '90%', // Largura dos botões
    paddingVertical: 15,
    paddingHorizontal: 15, // Ajustado para acomodar ícone
    borderRadius: 8, // Mais quadrado
    flexDirection: 'row', // Alinha ícone e texto horizontalmente
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15, // Espaço entre os botões
    elevation: 2, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  exploreButton: {
    backgroundColor: accentColor,
  },
  contributeButton: {
    backgroundColor: '#FF7001', // Laranja
  },
  buttonText: {
    color: '#fff', // Texto branco para todos os botões
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginRight: 10, // Espaço entre o ícone e o texto
  }
});
