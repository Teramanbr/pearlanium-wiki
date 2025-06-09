import React from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Item } from '@/components/ItemCard';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';

// Mock items (should be replaced with a real data source in production)
const NEW_MOCK_ITEMS: Item[] = [
  { id: '1', name: 'Lingote de Perolânio', description: 'Descrição para Lingote de Perolânio' },
  { id: '2', name: 'Espada de Perolânio', description: 'Descrição para Espada de Perolânio' },
  { id: '3', name: 'Picareta de Perolânio', description: 'Descrição para Picareta de Perolânio' },
  { id: '4', name: 'Capacete de Perolânio', description: 'Descrição para Capacete de Perolânio' },
  { id: '5', name: 'Fragmento de Eco Calibrado', description: 'Descrição para Fragmento de Eco Calibrado' },
  { id: '6', name: 'Peitoral de Perolânio', description: 'Descrição para Peitoral de Perolânio' },
  { id: '7', name: 'Calças de Perolânio', description: 'Descrição para Calças de Perolânio' },
  { id: '8', name: 'Botas de Perolânio', description: 'Descrição para Botas de Perolânio' },
  { id: '9', name: 'Machado de Perolânio', description: 'Descrição para Machado de Perolânio' },
  { id: '10', name: 'Enxada de Perolânio', description: 'Descrição para Enxada de Perolânio' },
  { id: '11', name: 'Pá de Perolânio', description: 'Descrição para Pá de Perolânio' },
  { id: '12', name: 'Espada de Perolânio Reforçada', description: 'Descrição para Espada de Perolânio Reforçada' },
  { id: '13', name: 'Picareta de Perolânio Reforçada', description: 'Descrição para Picareta de Perolânio Reforçada' },
  { id: '14', name: 'Capacete de Perolânio Reforçado', description: 'Descrição para Capacete de Perolânio Reforçado' },
  { id: '15', name: 'Peitoral de Perolânio Reforçado', description: 'Descrição para Peitoral de Perolânio Reforçado' },
  { id: '16', name: 'Calças de Perolânio Reforçadas', description: 'Descrição para Calças de Perolânio Reforçadas' },
  { id: '17', name: 'Botas de Perolânio Reforçadas', description: 'Descrição para Botas de Perolânio Reforçadas' },
  { id: '18', name: 'Machado de Perolânio Reforçado', description: 'Descrição para Machado de Perolânio Reforçado' },
  { id: '19', name: 'Enxada de Perolânio Reforçada', description: 'Descrição para Enxada de Perolânio Reforçada' },
  { id: '20', name: 'Pá de Perolânio Reforçada', description: 'Descrição para Pá de Perolânio Reforçada' },
  { id: '21', name: 'Perolânio Bruto', description: 'Descrição para Perolânio Bruto' },
  { id: '22', name: 'Molde de Ferraria para Melhoria de Perolânio', description: 'Descrição para Molde de Ferraria para Melhoria de Perolânio' },
  { id: '23', name: 'Molde de Ferraria para Melhoria de Perolânio Reforçado', description: 'Descrição para Molde de Ferraria para Melhoria de Perolânio Reforçado' },
  { id: '24', name: 'Bloco Perolado', description: 'Descrição para Bloco Perolado' },
  { id: '25', name: 'Bloco de Perolânio', description: 'Descrição para Bloco de Perolânio' },
];

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();
  const item = NEW_MOCK_ITEMS.find((i) => i.id === id);
  const themedTextColor = theme === 'dark' ? Colors.dark.text : Colors.light.text;

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={{ color: themedTextColor }}>Item não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: themedTextColor }]}>{item.name}</Text>
      <Text style={[styles.description, { color: themedTextColor }]}>{item.description}</Text>
      {/* Adicione mais detalhes ou receitas aqui */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});
