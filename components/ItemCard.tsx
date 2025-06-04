import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, View } from '@/components/Themed';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';

export interface Item {
  id: string;
  name: string;
  description: string;
  imageUri?: string; // Optional image URI
}

interface ItemCardProps {
  item: Item;
  onPress?: () => void;
}

export default function ItemCard({ item, onPress }: ItemCardProps) {
  const { theme } = useTheme();

  const cardBackgroundColor = theme === 'dark' ? '#2C2C2E' : '#FFFFFF';
  const textColor = theme === 'dark' ? Colors.dark.text : Colors.light.text;
  const descriptionColor = theme === 'dark' ? '#A0A0A5' : '#666666';
  const buttonBackgroundColor = theme === 'dark' ? '#1C1C1E' : '#F0F0F0';
  const buttonTextColor = textColor;
  const buttonBorderColor = theme === 'dark' ? '#3A3A3C' : '#D1D1D6';

  return (
    <View style={[styles.card, { backgroundColor: cardBackgroundColor }]}>
      <View style={styles.imagePlaceholder}>
        {item.imageUri ? (
          <Image source={{ uri: item.imageUri }} style={styles.itemImage} />
        ) : (
          <Text style={{ color: descriptionColor }}>Image</Text> // Simple placeholder text
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.itemName, { color: textColor }]}>{item.name}</Text>
        <Text style={[styles.itemDescription, { color: descriptionColor }]}>
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
          onPress={onPress}
        >
          <Text style={[styles.detailsButtonText, { color: buttonTextColor }]}>View Details</Text>
          <FontAwesome name="arrow-right" size={16} color={buttonTextColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    marginBottom: 20,
    width: '100%', // Card takes full width of its container in FlatList column
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible', // Fix for Android shadow with borderRadius
  },
  imagePlaceholder: {
    height: 200, // Fixed height for the image area
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
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    marginBottom: 15,
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