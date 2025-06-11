import { StyleSheet, ScrollView, Image, TouchableOpacity, Platform, Dimensions, useWindowDimensions } from 'react-native'; // Adicionado Image, TouchableOpacity, Platform e Dimensions

import { useRouter } from 'expo-router'; // Importar useRouter
import FontAwesome from '@expo/vector-icons/FontAwesome'; // Importar FontAwesome
// import EditScreenInfo from '@/components/EditScreenInfo'; // Import não utilizado
import { Text, View } from '@/components/Themed';
import { useTheme } from '@/contexts/ThemeContext'; // Import useTheme from our context
import Colors from '@/constants/Colors'; // Import Colors

// Substitua pelo caminho real do seu ícone
const modIcon = require('@/assets/images/icon.png'); // Exemplo, crie esta imagem ou use uma existente

export default function TabOneScreen() {
  const router = useRouter(); // Hook para navegação
  const tags = ["Vanilla++", "Progressão", "Hardcore", "Pós-fim", "Equipamentos", "Exploração"]; // Tags de exemplo
  const { theme } = useTheme(); // Use theme from our context
  const { width: screenWidth } = useWindowDimensions(); // Get reactive screen width
  const isTablet = screenWidth > 768; // Define reactive isTablet

  // Dynamic styles for cards based on color scheme
  const cardBackgroundColor = theme === 'dark' ? '#2C2C2E' : '#FFFFFF';
  const cardTitleColor = theme === 'dark' ? '#FFFFFF' : Colors.light.text;
  const cardDescriptionColor = theme === 'dark' ? '#A0A0A5' : '#666666';
  const themedTextColor = theme === 'dark' ? Colors.dark.text : Colors.light.text;
  const contributeButtonBorderColor = theme === 'dark' ? '#555' : '#BBB'; // Example border color
  const contributeButtonTextColor = themedTextColor;

  const dynamicCardStyles = StyleSheet.create({
    card: {
      backgroundColor: cardBackgroundColor,
      borderRadius: 15,
      padding: 20,
      width: isTablet ? '31%' : '90%', // Adjusted for 3 cards in a row within constrained width
      height: 220,
      marginBottom: 20,
      marginHorizontal: isTablet ? '1%' : 0, // Small horizontal margin for spacing
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      ...(Platform.OS === 'web' && {
        boxShadow: theme === 'dark' ? '0px 2px 2px rgba(0,0,0,0.1)' : '0px 2px 5px rgba(0,0,0,0.1)',
      }),
    },
    cardIcon: {
      marginBottom: 15,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: cardTitleColor,
      textAlign: 'center',
      marginBottom: 8,
    },
    cardDescription: {
      fontSize: 14,
      color: cardDescriptionColor,
      textAlign: 'center',
      lineHeight: 20,
    }
  });

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

        {/* Author and Version Info */}
        <View style={styles.modInfoContainer}>
          <View style={styles.modInfoItem}>
            <FontAwesome name="user" size={16} color="#FFA500" style={styles.modInfoIcon} />
            <Text style={styles.modInfoLabel}>Autor: </Text>
            <Text style={styles.modInfoValue}>Teraman_br</Text>
          </View>
          <View style={styles.modInfoItem}>
            <FontAwesome name="database" size={16} color="#FFA500" style={styles.modInfoIcon} />
            <Text style={styles.modInfoLabel}>Versão: </Text>
            <Text style={styles.modInfoValue}>1.0.0</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>Explore um novo universo de possibilidades com o Mod do Perolânio, adicionando incríveis itens, blocos e mecânicas ao seu mundo Minecraft.</Text>
        <View style={[styles.buttonsContainer, isTablet && styles.buttonsContainerTablet]}>
          <TouchableOpacity style={[styles.button, isTablet && styles.buttonTablet, styles.exploreButton]} onPress={() => router.push('/itens')}>
            <FontAwesome name="cube" size={18} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Explorar Itens</Text>
          </TouchableOpacity>
        </View>

        {/* New Cards Section */}
        <View style={[styles.cardsContainer, isTablet && styles.cardsContainerTablet]}>
          <View style={dynamicCardStyles.card} >
            <FontAwesome name="search" size={30} color="#FFA500" style={dynamicCardStyles.cardIcon} />
            <Text style={dynamicCardStyles.cardTitle}>Descobrir Itens & Blocos</Text>
            <Text style={dynamicCardStyles.cardDescription}>Navegue por todos os itens, blocos e recursos exclusivos do Mod Pearlanium.</Text>
          </View>

          <View style={dynamicCardStyles.card} >
            <FontAwesome name="book" size={30} color="#FFA500" style={dynamicCardStyles.cardIcon} />
            <Text style={dynamicCardStyles.cardTitle}>Informações Detalhadas</Text>
            <Text style={dynamicCardStyles.cardDescription}>Obtenha informações detalhadas sobre os recursos, blocos, itens e receitas de criação do Pearlanium Mod.</Text>
          </View>

          {/* New Community Driven Card */}
          <View style={dynamicCardStyles.card} >
            <FontAwesome name="pencil" size={30} color="#FFA500" style={dynamicCardStyles.cardIcon} />
            <Text style={dynamicCardStyles.cardTitle}>Feito pelo Desenvolvedor</Text>
            <Text style={dynamicCardStyles.cardDescription}>O próprio desenvolvedor do mod fez essa wiki, garantindo a acurácia das informações.</Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footerText}>© 2025 Vinícius Stanley. Todos os direitos reservados.</Text>

      </View>
    </ScrollView>
  );
}

const accentColor = '#4CAF50'; // Cor principal de destaque do app

const styles = StyleSheet.create({
  container: {
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
    maxWidth: 1140, // Added maxWidth for content constraining
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
  // Styles for Author and Version info
  modInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20, // Add some horizontal padding
    marginTop: 10, // Space below tags
    marginBottom: 20, // Space above subtitle
  },
  modInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modInfoIcon: {
    marginRight: 8,
  },
  modInfoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFA500', // Orange color for the label part
  },
  modInfoValue: {
    fontSize: 14,
    // Color will be set dynamically using cardDescriptionColor
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26, // Melhorando a legibilidade com maior altura de linha
    marginBottom: 20, // Added marginBottom to space it from buttons
  },
  buttonsContainer: {
    marginTop: 10, // Reduced marginTop for buttons
    width: '100%', // Para os botões ocuparem a largura do contentWrapper
    alignItems: 'center', // Centraliza os botões se eles não tiverem width 100%
  },
  buttonsContainerTablet: { // Styles for tablet buttons container
    flexDirection: 'row',
    justifyContent: 'center', // Changed to center for closer buttons
    // paddingHorizontal: 20, // Removed, contentWrapper handles outer padding
  },
  button: {
    width: '90%', // Largura dos botões
    paddingVertical: 12, // Slightly reduced padding
    paddingHorizontal: 20, // Adjusted padding
    borderRadius: 8, // Mais quadrado
    flexDirection: 'row', // Alinha ícone e texto horizontalmente
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15, // Espaço entre os botões
    // Android shadow
    elevation: 2,
    // iOS shadow (ignored by web if boxShadow is present and preferred)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    // Web shadow (to address deprecation warning)
    ...(Platform.OS === 'web' && {
      boxShadow: '0px 1px 1.41px rgba(0,0,0,0.2)',
    }),
  },
  buttonTablet: { // Styles for individual buttons on tablet
    width: 'auto', // Allow button to size to content + padding
    minWidth: 150, // Ensure a minimum decent width
    marginHorizontal: 10, // Spacing between buttons on tablet
  },
  exploreButton: {
    backgroundColor: '#FF7001', // Changed to orange
  },
  buttonText: {
    color: '#fff', // Ensure button text is white for all buttons by default
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginRight: 10, // Espaço entre o ícone e o texto
  },
  // Styles for New Cards
  cardsContainer: {
    marginTop: 30, // Increased space above cards
    width: '100%',
    alignItems: 'center',
    // paddingBottom: 20, // Add padding at the bottom of cards if footer is inside cardsContainer
  },
  cardsContainerTablet: { // Styles for tablet cards container
    flexDirection: 'row',
    justifyContent: 'center', // Center the group of cards
    flexWrap: 'wrap',
    // paddingHorizontal: 10, // Removed, contentWrapper handles outer padding
  },
  // Old card styles below are no longer used directly by the cards
  // card: {},
  // cardIcon: {},
  // cardTitle: {},
  // cardDescription: {},
  footerText: {
    marginTop: 30, // Space above the footer
    marginBottom: 40, // Increased space below the footer
    fontSize: 12,
    // color: '#888', // Removed to allow themed Text component to handle color
    textAlign: 'center',
  }
});
