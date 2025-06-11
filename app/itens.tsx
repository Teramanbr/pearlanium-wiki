import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, TextInput, Platform, FlatList, Dimensions, Animated, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, View as ThemedView } from '@/components/Themed';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';
import ItemCard, { Item } from '@/components/ItemCard';
import { useRouter } from 'expo-router';

  const NEW_MOCK_ITEMS: Item[] = [
    { id: '1', name: 'Lingote de Perolânio', description: 'Lingote feito de pérolas comprimidas pela pressão da Endstone, criando um material tão duro quanto titânio que perdeu suas propriedades de teletransporte.', hasRecipes: true, imageName: 'lingote-de-perolânio' },
    { id: '2', name: 'Espada de Perolânio', description: 'Espada forjada com Perolânio, material extremamente resistente criado a partir de pérolas comprimidas sob pressão da Endstone.', hasRecipes: true, imageName: 'espada-de-perolânio' },
    { id: '3', name: 'Picareta de Perolânio', description: 'Picareta durável feita de Perolânio, material resultante da compressão de pérolas que se tornou extremamente resistente.', hasRecipes: true, imageName: 'picareta-de-perolânio' },
    { id: '4', name: 'Capacete de Perolânio', description: 'Capacete resistente feito de Perolânio, oferecendo proteção graças à dureza titânica deste material de pérolas comprimidas.', hasRecipes: true, imageName: 'capacete-de-perolânio' },
    { id: '5', name: 'Fragmento de Eco Calibrado', description: 'Fragmento especial que emite ressonâncias peculiares, possivelmente relacionado às origens do Perolânio.', hasRecipes: true, imageName: 'fragmento-de-eco-calibrado' },
    { id: '6', name: 'Peitoral de Perolânio', description: 'Armadura peitoral feita de Perolânio, material de pérolas comprimidas que oferece proteção excepcional.', hasRecipes: true, imageName: 'peitoral-de-perolânio' },
    { id: '7', name: 'Calças de Perolânio', description: 'Calças de proteção feitas de Perolânio, material durável criado pela compressão de pérolas sob a Endstone.', hasRecipes: true, imageName: 'calças-de-perolânio' },
    { id: '8', name: 'Botas de Perolânio', description: 'Botas resistentes de Perolânio, material que perdeu propriedades mágicas mas ganhou dureza extrema.', hasRecipes: true, imageName: 'botas-de-perolânio' },
    { id: '9', name: 'Machado de Perolânio', description: 'Machado robusto feito de Perolânio, material resultante da transformação de pérolas sob pressão extrema.', hasRecipes: true, imageName: 'machado-de-perolânio' },
    { id: '10', name: 'Enxada de Perolânio', description: 'Enxada durável de Perolânio, material que mantém um brilho residual de suas origens como pérolas.', hasRecipes: true, imageName: 'enxada-de-perolânio' },
    { id: '11', name: 'Pá de Perolânio', description: 'Pá resistente feita de Perolânio, material que já foi pérolas mas agora possui dureza incomparável.', hasRecipes: true, imageName: 'pá-de-perolânio' },
    { id: '12', name: 'Espada de Perolânio Reforçada', description: 'Versão reforçada da espada de Perolânio, com lâmina ainda mais resistente deste material transformado.', hasRecipes: true, imageName: 'espada-de-perolânio-reforçada' },
    { id: '13', name: 'Picareta de Perolânio Reforçada', description: 'Picareta de Perolânio com tratamento especial para maior durabilidade e eficiência.', hasRecipes: true, imageName: 'picareta-de-perolânio-reforçada' },
    { id: '14', name: 'Capacete de Perolânio Reforçado', description: 'Capacete de proteção avançada feito com técnicas especiais de forja do Perolânio.', hasRecipes: true, imageName: 'capacete-de-perolânio-reforçado' },
    { id: '15', name: 'Peitoral de Perolânio Reforçado', description: 'Armadura peitoral reforçada de Perolânio, oferecendo proteção máxima deste material transformado.', hasRecipes: true, imageName: 'peitoral-de-perolânio-reforçado' },
    { id: '16', name: 'Calças de Perolânio Reforçadas', description: 'Calças de proteção reforçadas feitas com técnicas avançadas de trabalho com Perolânio.', hasRecipes: true, imageName: 'calças-de-perolânio-reforçadas' },
    { id: '17', name: 'Botas de Perolânio Reforçadas', description: 'Botas de Perolânio com reforços especiais para maior proteção e durabilidade.', hasRecipes: true, imageName: 'botas-de-perolânio-reforçadas' },
    { id: '18', name: 'Machado de Perolânio Reforçado', description: 'Machado de Perolânio com lâmina tratada termicamente para extremo corte e resistência.', hasRecipes: true, imageName: 'machado-de-perolânio-reforçado' },
    { id: '19', name: 'Enxada de Perolânio Reforçada', description: 'Enxada de Perolânio com cabo e lâmina reforçados para trabalho pesado prolongado.', hasRecipes: true, imageName: 'enxada-de-perolânio-reforçada' },
    { id: '20', name: 'Pá de Perolânio Reforçada', description: 'Pá de Perolânio com tratamento especial para resistir aos trabalhos mais exigentes.', hasRecipes: true, imageName: 'pá-de-perolânio-reforçada' },
    { id: '21', name: 'Perolânio Bruto', description: 'Matéria-prima bruta do Perolânio, mostrando vestígios de suas origens como pérolas antes da compressão.', hasRecipes: false, imageName: 'perolânio-bruto' },
    { id: '22', name: 'Molde de Ferraria para Melhoria de Perolânio', description: 'Molde especial para trabalhar e melhorar equipamentos de Perolânio básico.', hasRecipes: false, imageName: 'molde-de-ferraria-para-melhoria-de-perolânio' },
    { id: '23', name: 'Molde de Ferraria para Melhoria de Perolânio Reforçado', description: 'Molde avançado para criação de equipamentos de Perolânio Reforçado.', hasRecipes: false, imageName: 'molde-de-ferraria-para-melhoria-de-perolânio-reforçado' },
    { id: '24', name: 'Bloco Perolado', description: 'Bloco decorativo que mantém o brilho característico das pérolas originais do Perolânio.', hasRecipes: false, imageName: 'bloco-perolado' },
    { id: '25', name: 'Bloco de Perolânio', description: 'Bloco de construção feito de Perolânio, combinando belleza residual com extrema resistência.', hasRecipes: false, imageName: 'bloco-de-perolânio' },
  ];

export default function ItemsScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<Item[]>(NEW_MOCK_ITEMS);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const scrollY = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  // Theme colors
  const themedTextColor = theme === 'dark' ? Colors.dark.text : Colors.light.text;
  const themedPlaceholderColor = theme === 'dark' ? Colors.dark.placeholderText : Colors.light.placeholderText;
  const searchBarBackgroundColor = theme === 'dark' ? Colors.dark.placeholderBackground : Colors.light.placeholderBackground;
  const searchBarBorderColor = theme === 'dark' ? '#3A3A3C' : '#D1D1D6';

  // Search functionality
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenWidth(window.width);
    });
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredItems(NEW_MOCK_ITEMS);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const newFilteredItems = NEW_MOCK_ITEMS.filter(
        item =>
          item.name.toLowerCase().includes(lowercasedQuery) ||
          item.description.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredItems(newFilteredItems);
    }
  }, [searchQuery]);

  // Header animation values
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [180, 70], // Slightly increased collapsed height
    extrapolate: 'clamp'
  });

  const titleOpacity = scrollY.interpolate({
    inputRange: [0, 40, 80],
    outputRange: [1, 0.5, 0], // Smoother fade out
    extrapolate: 'clamp'
  });

  const subtitleOpacity = scrollY.interpolate({
    inputRange: [0, 30, 60],
    outputRange: [1, 0.3, 0], // Faster fade out than title
    extrapolate: 'clamp'
  });

  // ... (keep existing useEffect hooks and other logic)

  const cardWidth = 300;
  const padding = 20;
  const gap = 16;
  const numColumns = Math.max(1, Math.floor((screenWidth - padding * 2) / (cardWidth + gap)));
  const adjustedCardWidth = ((screenWidth - padding * 2 - (gap * (numColumns - 1))) / numColumns);

  const handleItemPress = useCallback((item: Item) => {
    router.push(`/itens/${item.id}`);
  }, [router]);

  const renderItem = useCallback(({ item }: { item: Item }) => (
    <View style={{ 
      width: adjustedCardWidth, 
      marginBottom: gap,
      marginLeft: gap / 3,
      marginRight: gap / 2,
      minWidth: cardWidth
    }}>
      <ItemCard item={item} onItemPress={handleItemPress} style={{ width: '100%' }} />
    </View>
  ), [handleItemPress, adjustedCardWidth]);

  const renderHeader = () => (
    <Animated.View style={[styles.headerContainer, { 
      height: headerHeight,
      paddingTop: 5, // Reduced top padding
      paddingBottom: 5,
      justifyContent: 'flex-end' // Align content to bottom
    }]}>
      <Animated.View style={{ opacity: titleOpacity }}>
        <Text style={[styles.title, { color: '#4CAF50' }]}>
          Itens do Mod Perolânio
        </Text>
      </Animated.View>
      <Animated.View style={{ opacity: subtitleOpacity }}>
        <Text style={[styles.subtitle, { color: themedTextColor }]}>
          Descubra todos os itens e blocos únicos introduzidos pelo Mod Perolânio.
        </Text>
      </Animated.View>
      <View style={[
        styles.searchBarContainer,
        { 
          backgroundColor: searchBarBackgroundColor,
          borderColor: searchBarBorderColor,
        }
      ]}>
        <FontAwesome name="search" size={20} color={themedPlaceholderColor} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: themedTextColor }]}
          placeholder="Pesquisar itens..."
          placeholderTextColor={themedPlaceholderColor}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
    </Animated.View>
  );

  return (
    <ThemedView style={styles.pageContainer}>
      {renderHeader()}
      <FlatList
        key={`grid-${numColumns}-${screenWidth}`}
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={<Text style={{color: themedTextColor, marginTop: 20}}>Nenhum item encontrado para a sua pesquisa.</Text>}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={11}
        numColumns={numColumns}
        keyboardShouldPersistTaps="handled"
        style={styles.listStyle}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  pageContainer: { 
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    overflow: 'hidden'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    width: '90%',
    maxWidth: 600,
    minWidth: 250,
    marginBottom: 10,
    alignSelf: 'center',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  listStyle: {
    flex: 1,
    width: '100%',
  },
  listContentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 16,
    justifyContent: 'center',
  },
});
