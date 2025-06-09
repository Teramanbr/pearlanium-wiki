import React from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Item } from '@/components/ItemCard';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';

// Mock items (should be replaced with a real data source in production)
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

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();
  const item = NEW_MOCK_ITEMS.find((i) => i.id === id);
  const themedTextColor = theme === 'dark' ? Colors.dark.text : Colors.light.text;

  // Create styles inside component to access theme
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: 'transparent',
    },
    card: {
      backgroundColor: theme === 'dark' ? Colors.dark.card : Colors.light.card,
      borderRadius: 8,
      padding: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    imagePlaceholder: {
      height: 200,
      backgroundColor: theme === 'dark' ? Colors.dark.placeholderBackground : Colors.light.placeholderBackground,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    imagePlaceholderText: {
      color: theme === 'dark' ? Colors.dark.placeholderText : Colors.light.placeholderText,
      fontSize: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 12,
      textAlign: 'center',
    },
    description: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 24,
      lineHeight: 24,
    },
    metadataContainer: {
      marginBottom: 24,
    },
    metadataRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
      paddingHorizontal: 8,
    },
    metadataLabel: {
      fontWeight: '600',
      fontSize: 14,
    },
    metadataValue: {
      fontSize: 14,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      backgroundColor: Colors.pearlOrange,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      flex: 1,
      marginHorizontal: 8,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={{ color: themedTextColor }}>Item não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? Colors.dark.background : Colors.light.background }]}>
      <View style={styles.card}>
        {/* Image placeholder */}
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>Item Image</Text>
        </View>
        
        <Text style={[styles.title, { color: themedTextColor }]}>{item.name}</Text>
        <Text style={[styles.description, { color: themedTextColor }]}>{item.description}</Text>
        
        {/* Metadata section */}
        <View style={styles.metadataContainer}>
          <View style={styles.metadataRow}>
            <Text style={[styles.metadataLabel, { color: themedTextColor }]}>Type:</Text>
            <Text style={[styles.metadataValue, { color: themedTextColor }]}>Material</Text>
          </View>
          <View style={styles.metadataRow}>
            <Text style={[styles.metadataLabel, { color: themedTextColor }]}>Rarity:</Text>
            <Text style={[styles.metadataValue, { color: themedTextColor }]}>Common</Text>
          </View>
        </View>
        
        {/* Action button - conditionally shown */}
        {item.hasRecipes && (
          <View style={styles.actions}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View Recipes</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
