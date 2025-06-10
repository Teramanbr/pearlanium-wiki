import React, { memo } from 'react';
// Static image imports
type ItemImageMap = {
  [key: string]: any; // Explicit index signature
};

const itemImages: ItemImageMap = {
  'lingote-de-perolânio': require('../assets/images/items/lingote-de-perolânio.png'),
  'espada-de-perolânio': require('../assets/images/items/espada-de-perolânio.png'),
  'picareta-de-perolânio': require('../assets/images/items/picareta-de-perolânio.png'),
  'capacete-de-perolânio': require('../assets/images/items/capacete-de-perolânio.png'),
  'fragmento-de-eco-calibrado': require('../assets/images/items/fragmento-de-eco-calibrado.png'),
  'peitoral-de-perolânio': require('../assets/images/items/peitoral-de-perolânio.png'),
  'calças-de-perolânio': require('../assets/images/items/calças-de-perolânio.png'),
  'botas-de-perolânio': require('../assets/images/items/botas-de-perolânio.png'),
  'machado-de-perolânio': require('../assets/images/items/machado-de-perolânio.png'),
  'enxada-de-perolânio': require('../assets/images/items/enxada-de-perolânio.png'),
  'pá-de-perolânio': require('../assets/images/items/pá-de-perolânio.png'),
  'espada-de-perolânio-reforçada': require('../assets/images/items/espada-de-perolânio-reforçada.png'),
  'picareta-de-perolânio-reforçada': require('../assets/images/items/picareta-de-perolânio-reforçada.png'),
  'capacete-de-perolânio-reforçado': require('../assets/images/items/capacete-de-perolânio-reforçado.png'),
  'peitoral-de-perolânio-reforçado': require('../assets/images/items/peitoral-de-perolânio-reforçado.png'),
  'calças-de-perolânio-reforçadas': require('../assets/images/items/calças-de-perolânio-reforçadas.png'),
  'botas-de-perolânio-reforçadas': require('../assets/images/items/botas-de-perolânio-reforçadas.png'),
  'machado-de-perolânio-reforçado': require('../assets/images/items/machado-de-perolânio-reforçado.png'),
  'enxada-de-perolânio-reforçada': require('../assets/images/items/enxada-de-perolânio-reforçada.png'),
  'pá-de-perolânio-reforçada': require('../assets/images/items/pá-de-perolânio-reforçada.png'),
  'perolânio-bruto': require('../assets/images/items/perolânio-bruto.png'),
  'molde-de-ferraria-para-melhoria-de-perolânio': require('../assets/images/items/molde-de-ferraria-para-melhoria-de-perolânio.png'),
  'molde-de-ferraria-para-melhoria-de-perolânio-reforçado': require('../assets/images/items/molde-de-ferraria-para-melhoria-de-perolânio-reforçado.png'),
  'bloco-perolado': require('../assets/images/items/bloco-perolado.png'),
  'bloco-de-perolânio': require('../assets/images/items/bloco-de-perolânio.png')
};
import { StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, View } from '@/components/Themed';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';

export interface Item {
  id: string;
  name: string;
  description: string;
  hasRecipes: boolean; // New property to conditionally show recipes
  imageName?: string; // Optional local image name
}

interface ItemCardProps {
  item: Item;
  onItemPress?: (item: Item) => void;
  style?: object;
}

function ItemCard({ item, onItemPress, style }: ItemCardProps) {
  const { theme } = useTheme();

  const cardBackgroundColor = theme === 'dark' ? '#2C2C2E' : '#FFFFFF';
  const textColor = theme === 'dark' ? Colors.dark.text : Colors.light.text;
  const descriptionColor = theme === 'dark' ? '#A0A0A5' : '#666666';
  const buttonBackgroundColor = theme === 'dark' ? '#1C1C1E' : '#F0F0F0';
  const buttonTextColor = textColor;
  const buttonBorderColor = theme === 'dark' ? '#3A3A3C' : '#D1D1D6';

  return (
    <View style={[styles.card, { backgroundColor: cardBackgroundColor }, style]}>
      <View style={styles.imagePlaceholder}>
        {item.imageName ? (
          <Image 
            source={item.imageName ? itemImages[item.imageName] : null} 
            style={styles.itemImage}
            onError={(e) => console.log('Failed to load image:', e.nativeEvent.error)}
          />
        ) : (
          <Text style={{ color: descriptionColor }}>Image</Text> // Simple placeholder text
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.itemName, { color: textColor }]} numberOfLines={2} ellipsizeMode="tail">{item.name}</Text>
        <Text style={[styles.itemDescription, { color: descriptionColor }]} numberOfLines={3} ellipsizeMode="tail">
          {item.description}
        </Text>
        <TouchableOpacity 
          style={[
            styles.detailsButton,
            { 
              backgroundColor: buttonBackgroundColor,
              borderColor: buttonBorderColor 
            }
          ]} 
          onPress={onItemPress ? () => onItemPress(item) : undefined}
        >
          <Text style={[styles.detailsButtonText, { color: buttonTextColor }]}>View Details</Text>
          <FontAwesome name="arrow-right" size={16} color={buttonTextColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default memo(ItemCard);

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible', // Fix for Android shadow with borderRadius
    flexDirection: 'column', // Ensure content flows top to bottom
  },
  imagePlaceholder: {
    height: 180, // Adjusted height for the image area
    backgroundColor: '#444', // Darker placeholder background
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  infoContainer: {
    padding: 15,
    flex: 1, // Allow infoContainer to fill remaining space
    justifyContent: 'space-between', // Distribute space between name/desc and button
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    marginBottom: 10, // Adjusted margin
    lineHeight: 20,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
  },
  detailsButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
