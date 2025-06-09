import React, { useState, useEffect, useCallback } from 'react'; // Added useState, useEffect, useCallback
import { StyleSheet, ScrollView, TextInput, Platform, FlatList } from 'react-native'; // Added FlatList
import FontAwesome from '@expo/vector-icons/FontAwesome'; // Importar FontAwesome
import { Text, View } from '@/components/Themed';
import { useTheme } from '@/contexts/ThemeContext'; // Import useTheme
import Colors from '@/constants/Colors'; // Import Colors
import ItemCard, { Item } from '@/components/ItemCard'; // Import ItemCard and Item interface
import { useRouter } from 'expo-router'; // Import useRouter for navigation

// import EditScreenInfo from '@/components/EditScreenInfo'; // Import não utilizado

const NEW_MOCK_ITEMS: Item[] = [
  { id: '1', name: 'Lingote de Perolânio', description: 'Descrição para Lingote de Perolânio', hasRecipes: true },
  { id: '2', name: 'Espada de Perolânio', description: 'Descrição para Espada de Perolânio', hasRecipes: true },
  { id: '3', name: 'Picareta de Perolânio', description: 'Descrição para Picareta de Perolânio', hasRecipes: true },
  { id: '4', name: 'Capacete de Perolânio', description: 'Descrição para Capacete de Perolânio', hasRecipes: true },
  { id: '5', name: 'Fragmento de Eco Calibrado', description: 'Descrição para Fragmento de Eco Calibrado', hasRecipes: true },
  { id: '6', name: 'Peitoral de Perolânio', description: 'Descrição para Peitoral de Perolânio', hasRecipes: true },
  { id: '7', name: 'Calças de Perolânio', description: 'Descrição para Calças de Perolânio', hasRecipes: true },
  { id: '8', name: 'Botas de Perolânio', description: 'Descrição para Botas de Perolânio', hasRecipes: true },
  { id: '9', name: 'Machado de Perolânio', description: 'Descrição para Machado de Perolânio', hasRecipes: true },
  { id: '10', name: 'Enxada de Perolânio', description: 'Descrição para Enxada de Perolânio', hasRecipes: true },
  { id: '11', name: 'Pá de Perolânio', description: 'Descrição para Pá de Perolânio', hasRecipes: true },
  { id: '12', name: 'Espada de Perolânio Reforçada', description: 'Descrição para Espada de Perolânio Reforçada', hasRecipes: true },
  { id: '13', name: 'Picareta de Perolânio Reforçada', description: 'Descrição para Picareta de Perolânio Reforçada', hasRecipes: true },
  { id: '14', name: 'Capacete de Perolânio Reforçado', description: 'Descrição para Capacete de Perolânio Reforçado', hasRecipes: true },
  { id: '15', name: 'Peitoral de Perolânio Reforçado', description: 'Descrição para Peitoral de Perolânio Reforçado', hasRecipes: true },
  { id: '16', name: 'Calças de Perolânio Reforçadas', description: 'Descrição para Calças de Perolânio Reforçadas', hasRecipes: true },
  { id: '17', name: 'Botas de Perolânio Reforçadas', description: 'Descrição para Botas de Perolânio Reforçadas', hasRecipes: true },
  { id: '18', name: 'Machado de Perolânio Reforçado', description: 'Descrição para Machado de Perolânio Reforçado', hasRecipes: true },
  { id: '19', name: 'Enxada de Perolânio Reforçada', description: 'Descrição para Enxada de Perolânio Reforçada', hasRecipes: true },
  { id: '20', name: 'Pá de Perolânio Reforçada', description: 'Descrição para Pá de Perolânio Reforçada', hasRecipes: true },
  { id: '21', name: 'Perolânio Bruto', description: 'Descrição para Perolânio Bruto', hasRecipes: false },
  { id: '22', name: 'Molde de Ferraria para Melhoria de Perolânio', description: 'Descrição para Molde de Ferraria para Melhoria de Perolânio', hasRecipes: false },
  { id: '23', name: 'Molde de Ferraria para Melhoria de Perolânio Reforçado', description: 'Descrição para Molde de Ferraria para Melhoria de Perolânio Reforçado', hasRecipes: false },
  { id: '24', name: 'Bloco Perolado', description: 'Descrição para Bloco Perolado', hasRecipes: false },
  { id: '25', name: 'Bloco de Perolânio', description: 'Descrição para Bloco de Perolânio', hasRecipes: false },
];

export default function ItemsScreen() { // Renamed from TabTwoScreen for clarity
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<Item[]>(NEW_MOCK_ITEMS);
  const router = useRouter(); // Initialize router

  const themedTextColor = theme === 'dark' ? Colors.dark.text : Colors.light.text;
  const themedPlaceholderColor = theme === 'dark' ? Colors.dark.placeholderText : Colors.light.placeholderText;
  const searchBarBackgroundColor = theme === 'dark' ? Colors.dark.placeholderBackground : Colors.light.placeholderBackground;
  const searchBarBorderColor = theme === 'dark' ? '#3A3A3C' : '#D1D1D6';

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

  const handleItemPress = useCallback((item: Item) => {
    router.push(`/itens/${item.id}`);
  }, [router]);

  const renderItem = useCallback(({ item }: { item: Item }) => (
    <ItemCard
      item={item}
      onItemPress={handleItemPress} // Pass the memoized handler
    />
  ), [handleItemPress]); // renderItem is memoized and depends on handleItemPress

  // Component for the FlatList header
  const renderListHeader = () => (
    <View style={styles.headerContainer}> 
      <Text style={[styles.title, { color: theme === 'dark' ? '#4CAF50' : Colors.light.tint }]}>Itens do Mod Perolânio</Text>
      <Text style={[styles.subtitle, { color: themedTextColor }]}>
        Descubra todos os itens e blocos únicos introduzidos pelo Mod Perolânio. Clique em um item para ver mais detalhes e receitas de criação.
      </Text>
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
    </View>
  );

  return (
    <View style={styles.pageContainer}>
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderListHeader} // Add the header component here
        style={styles.listStyle}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={<Text style={{color: themedTextColor, marginTop: 20}}>Nenhum item encontrado para a sua pesquisa.</Text>}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={11}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: { 
    flex: 1,
    // alignItems: 'center', // No longer needed here as FlatList manages its content alignment
  },
  headerContainer: { // This style is now used by the ListHeaderComponent
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28, // Increased size
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10, // Reduced margin
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25, // Increased margin
    lineHeight: 22,
    paddingHorizontal: 10, // Ensure it doesn't get too wide on larger screens if centered
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10, // Adjusted padding for different platforms
    width: '100%', // Take full width of the container
    maxWidth: 600, // Max width for larger screens, adjust as needed
    marginBottom: 20, // Space before the list starts
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: '100%', // Ensure TextInput fills the vertical space of container
  },
  listStyle: {
    flex: 1, // Ensure FlatList takes available space
    width: '100%', // Ensure FlatList takes full width
  },
  listContentContainer: {
    paddingHorizontal: 20, // Horizontal padding for the list items
    paddingBottom: 20, // Padding at the bottom of the list
    alignItems: 'center', // Center cards if list width is more than card width (for single column)
  },
});
