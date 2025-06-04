import React, { useState, useEffect } from 'react'; // Added useState, useEffect
import { StyleSheet, ScrollView, TextInput, Platform, FlatList } from 'react-native'; // Added FlatList
import FontAwesome from '@expo/vector-icons/FontAwesome'; // Importar FontAwesome
import { Text, View } from '@/components/Themed';
import { useTheme } from '@/contexts/ThemeContext'; // Import useTheme
import Colors from '@/constants/Colors'; // Import Colors
import ItemCard, { Item } from '@/components/ItemCard'; // Import ItemCard and Item interface

// import EditScreenInfo from '@/components/EditScreenInfo'; // Import não utilizado

const NEW_MOCK_ITEMS: Item[] = [
  { id: '1', name: 'Pearlanium Ingot', description: 'Description for Pearlanium Ingot' },
  { id: '2', name: 'Pearlanium Sword', description: 'Description for Pearlanium Sword' },
  { id: '3', name: 'Pearlanium Pickaxe', description: 'Description for Pearlanium Pickaxe' },
  { id: '4', name: 'Pearlanium Helmet', description: 'Description for Pearlanium Helmet' },
  { id: '5', name: 'Calibrated Echo Shard', description: 'Description for Calibrated Echo Shard' },
  { id: '6', name: 'Pearlanium Chestplate', description: 'Description for Pearlanium Chestplate' },
  { id: '7', name: 'Pearlanium Leggings', description: 'Description for Pearlanium Leggings' },
  { id: '8', name: 'Pearlanium Boots', description: 'Description for Pearlanium Boots' },
  { id: '9', name: 'Pearlanium Axe', description: 'Description for Pearlanium Axe' },
  { id: '10', name: 'Pearlanium Hoe', description: 'Description for Pearlanium Hoe' },
  { id: '11', name: 'Pearlanium Shovel', description: 'Description for Pearlanium Shovel' },
  { id: '12', name: 'Reinforced Pearlanium Sword', description: 'Description for Reinforced Pearlanium Sword' },
  { id: '13', name: 'Reinforced Pearlanium Pickaxe', description: 'Description for Reinforced Pearlanium Pickaxe' },
  { id: '14', name: 'Reinforced Pearlanium Helmet', description: 'Description for Reinforced Pearlanium Helmet' },
  { id: '15', name: 'Reinforced Pearlanium Chestplate', description: 'Description for Reinforced Pearlanium Chestplate' },
  { id: '16', name: 'Reinforced Pearlanium Leggings', description: 'Description for Reinforced Pearlanium Leggings' },
  { id: '17', name: 'Reinforced Pearlanium Boots', description: 'Description for Reinforced Pearlanium Boots' },
  { id: '18', name: 'Reinforced Pearlanium Axe', description: 'Description for Reinforced Pearlanium Axe' },
  { id: '19', name: 'Reinforced Pearlanium Hoe', description: 'Description for Reinforced Pearlanium Hoe' },
  { id: '20', name: 'Reinforced Pearlanium Shovel', description: 'Description for Reinforced Pearlanium Shovel' },
  { id: '21', name: 'Brute Pearlanium', description: 'Description for Brute Pearlanium' },
  { id: '22', name: 'Pearlanium Upgrade Smithing Template', description: 'Description for Pearlanium Upgrade Smithing Template' },
  { id: '23', name: 'Reinforced Pearlanium Upgrade Smithing Template', description: 'Description for Reinforced Pearlanium Upgrade Smithing Template' },
  { id: '24', name: 'Pearled Block', description: 'Description for Pearled Block' },
  { id: '25', name: 'Pearlanium Block', description: 'Description for Pearlanium Block' },
];

export default function ItemsScreen() { // Renamed from TabTwoScreen for clarity
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<Item[]>(NEW_MOCK_ITEMS);

  const themedTextColor = theme === 'dark' ? Colors.dark.text : Colors.light.text;
  const themedPlaceholderColor = theme === 'dark' ? '#888' : '#BBB';
  const searchBarBackgroundColor = theme === 'dark' ? '#1C1C1E' : '#EFEFF0'; // Darker/lighter grays
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

  const renderItem = ({ item }: { item: Item }) => (
    <ItemCard 
      item={item} 
      onPress={() => console.log('View Details for:', item.name)} // Placeholder action
    />
  );

  return (
    // Changed from ScrollView to View as FlatList handles scrolling
    <View style={styles.pageContainer}> 
      <View style={styles.headerContainer}> 
        <Text style={[styles.title, { color: theme === 'dark' ? '#4CAF50' : Colors.light.tint }]}>Pearlanium Mod Items</Text>
        <Text style={[styles.subtitle, { color: themedTextColor }]}>
          Discover all the unique items and blocks introduced by the Pearlanium Mod. Click on an item to see more details and crafting recipes.
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
            placeholder="Search items..."
            placeholderTextColor={themedPlaceholderColor}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.listStyle}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={<Text style={{color: themedTextColor, marginTop: 20}}>No items found matching your search.</Text>}
        // numColumns={2} // Example for a 2-column grid, enable if desired
        // columnWrapperStyle={styles.row} // Required for numColumns > 1
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: { // New container for the whole page
    flex: 1,
    // alignItems: 'center', // Removed, FlatList will take width
  },
  headerContainer: { // Container for title, subtitle, search bar
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: 20,
    // paddingBottom: 0, // Let marginBottom of searchBar handle space
  },
  // container: { // Original ScrollView container, replaced by headerContainer & list specific styles
  //   alignItems: 'center',
  //   paddingTop: 30,
  //   paddingHorizontal: 20,
  //   paddingBottom: 20, 
  // },
  // scrollView: { // Replaced by FlatList
  //   flex: 1,
  // },
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
  // itemsListContainer: { // Replaced by FlatList
  //   width: '100%',
  //   alignItems: 'center',
  // },
  // row: { // Example for numColumns > 1
  //   flex: 1,
  //   justifyContent: "space-around",
  // }
});
