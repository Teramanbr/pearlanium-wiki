import React, { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';

// Static image imports
type ItemImageMap = {
  [key: string]: any;
};

const itemImages: ItemImageMap = {
  'lingote-de-perolânio': require('@/assets/images/items/lingote-de-perolânio.png'),
  'espada-de-perolânio': require('@/assets/images/items/espada-de-perolânio.png'),
  'picareta-de-perolânio': require('@/assets/images/items/picareta-de-perolânio.png'),
  'capacete-de-perolânio': require('@/assets/images/items/capacete-de-perolânio.png'),
  'fragmento-de-eco-calibrado': require('@/assets/images/items/fragmento-de-eco-calibrado.png'),
  'peitoral-de-perolânio': require('@/assets/images/items/peitoral-de-perolânio.png'),
  'calças-de-perolânio': require('@/assets/images/items/calças-de-perolânio.png'),
  'botas-de-perolânio': require('@/assets/images/items/botas-de-perolânio.png'),
  'machado-de-perolânio': require('@/assets/images/items/machado-de-perolânio.png'),
  'enxada-de-perolânio': require('@/assets/images/items/enxada-de-perolânio.png'),
  'pá-de-perolânio': require('@/assets/images/items/pá-de-perolânio.png'),
  'espada-de-perolânio-reforçada': require('@/assets/images/items/espada-de-perolânio-reforçada.png'),
  'picareta-de-perolânio-reforçada': require('@/assets/images/items/picareta-de-perolânio-reforçada.png'),
  'capacete-de-perolânio-reforçado': require('@/assets/images/items/capacete-de-perolânio-reforçado.png'),
  'peitoral-de-perolânio-reforçado': require('@/assets/images/items/peitoral-de-perolânio-reforçado.png'),
  'calças-de-perolânio-reforçadas': require('@/assets/images/items/calças-de-perolânio-reforçadas.png'),
  'botas-de-perolânio-reforçadas': require('@/assets/images/items/botas-de-perolânio-reforçadas.png'),
  'machado-de-perolânio-reforçado': require('@/assets/images/items/machado-de-perolânio-reforçado.png'),
  'enxada-de-perolânio-reforçada': require('@/assets/images/items/enxada-de-perolânio-reforçada.png'),
  'pá-de-perolânio-reforçada': require('@/assets/images/items/pá-de-perolânio-reforçada.png'),
  'perolânio-bruto': require('@/assets/images/items/perolânio-bruto.png'),
  'molde-de-ferraria-para-melhoria-de-perolânio': require('@/assets/images/items/molde-de-ferraria-para-melhoria-de-perolânio.png'),
  'molde-de-ferraria-para-melhoria-de-perolânio-reforçado': require('@/assets/images/items/molde-de-ferraria-para-melhoria-de-perolânio-reforçado.png'),
  'bloco-perolado': require('@/assets/images/items/bloco-perolado.png'),
  'bloco-de-perolânio': require('@/assets/images/items/bloco-de-perolânio.png')
};
import { Item } from '@/components/ItemCard';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';
import { getComments, addComment } from '@/firebase';
import { useAuth } from '@/contexts/AuthContext';

const NEW_MOCK_ITEMS: Item[] = [
  { id: '1', name: 'Lingote de Perolânio', description: 'Lingote feito de pérolas comprimidas pela pressão da Endstone, criando um material tão duro quanto titânio. As pérolas que o formam perderam suas propriedades de teletransporte.', imageName: 'lingote-de-perolânio' },
  { id: '2', name: 'Espada de Perolânio', description: 'Espada forjada com Perolânio, material extremamente resistente criado a partir de pérolas comprimidas sob pressão da Endstone.', imageName: 'espada-de-perolânio' },
  { id: '3', name: 'Picareta de Perolânio', description: 'Picareta durável feita de Perolânio, material resultante da compressão de pérolas que se tornou extremamente resistente.', imageName: 'picareta-de-perolânio' },
  { id: '4', name: 'Capacete de Perolânio', description: 'Capacete resistente feito de Perolânio, oferecendo proteção graças à dureza titânica deste material de pérolas comprimidas.', imageName: 'capacete-de-perolânio' },
  { id: '5', name: 'Fragmento de Eco Calibrado', description: 'Fragmento especial que emite ressonâncias peculiares, possivelmente relacionado às origens do Perolânio.', imageName: 'fragmento-de-eco-calibrado' },
  { id: '6', name: 'Peitoral de Perolânio', description: 'Armadura peitoral feita de Perolânio, material de pérolas comprimidas que oferece proteção excepcional.', imageName: 'peitoral-de-perolânio' },
  { id: '7', name: 'Calças de Perolânio', description: 'Calças de proteção feitas de Perolânio, material durável criado pela compressão de pérolas sob a Endstone.', imageName: 'calças-de-perolânio' },
  { id: '8', name: 'Botas de Perolânio', description: 'Botas resistentes de Perolânio, material que perdeu propriedades mágicas mas ganhou dureza extrema.', imageName: 'botas-de-perolânio' },
  { id: '9', name: 'Machado de Perolânio', description: 'Machado robusto feito de Perolânio, material resultante da transformação de pérolas sob pressão extrema.', imageName: 'machado-de-perolânio' },
  { id: '10', name: 'Enxada de Perolânio', description: 'Enxada durável de Perolânio, material que mantém um brilho residual de suas origens como pérolas.', imageName: 'enxada-de-perolânio' },
  { id: '11', name: 'Pá de Perolânio', description: 'Pá resistente feita de Perolânio, material que já foi pérolas mas agora possui dureza incomparável.', imageName: 'pá-de-perolânio' },
  { id: '12', name: 'Espada de Perolânio Reforçada', description: 'Versão reforçada da espada de Perolânio, com lâmina ainda mais resistente deste material transformado.', imageName: 'espada-de-perolânio-reforçada' },
  { id: '13', name: 'Picareta de Perolânio Reforçada', description: 'Picareta de Perolânio com tratamento especial para maior durabilidade e eficiência.', imageName: 'picareta-de-perolânio-reforçada' },
  { id: '14', name: 'Capacete de Perolânio Reforçado', description: 'Capacete de proteção avançada feito com técnicas especiais de forja do Perolânio.', imageName: 'capacete-de-perolânio-reforçado' },
  { id: '15', name: 'Peitoral de Perolânio Reforçado', description: 'Armadura peitoral reforçada de Perolânio, oferecendo proteção máxima deste material transformado.', imageName: 'peitoral-de-perolânio-reforçado' },
  { id: '16', name: 'Calças de Perolânio Reforçadas', description: 'Calças de proteção reforçadas feitas com técnicas avançadas de trabalho com Perolânio.', imageName: 'calças-de-perolânio-reforçadas' },
  { id: '17', name: 'Botas de Perolânio Reforçadas', description: 'Botas de Perolânio com reforços especiais para maior proteção e durabilidade.', imageName: 'botas-de-perolânio-reforçadas' },
  { id: '18', name: 'Machado de Perolânio Reforçado', description: 'Machado de Perolânio com lâmina tratada termicamente para extremo corte e resistência.', imageName: 'machado-de-perolânio-reforçado' },
  { id: '19', name: 'Enxada de Perolânio Reforçada', description: 'Enxada de Perolânio com cabo e lâmina reforçados para trabalho pesado prolongado.', imageName: 'enxada-de-perolânio-reforçada' },
  { id: '20', name: 'Pá de Perolânio Reforçada', description: 'Pá de Perolânio com tratamento especial para resistir aos trabalhos mais exigentes.', imageName: 'pá-de-perolânio-reforçada' },
  { id: '21', name: 'Perolânio Bruto', description: 'Matéria-prima bruta do Perolânio, mostrando vestígios de suas origens como pérolas antes da compressão.', imageName: 'perolânio-bruto' },
  { id: '22', name: 'Molde de Ferraria para Melhoria de Perolânio', description: 'Molde especial para trabalhar e melhorar equipamentos de Perolânio básico.', imageName: 'molde-de-ferraria-para-melhoria-de-perolânio' },
  { id: '23', name: 'Molde de Ferraria para Melhoria de Perolânio Reforçado', description: 'Molde avançado para criação de equipamentos de Perolânio Reforçado. Obtido ao derrotar o Warden.', imageName: 'molde-de-ferraria-para-melhoria-de-perolânio-reforçado' },
  { id: '24', name: 'Minério Perolado', description: 'O minério principal desse mod, tão duro quando obsidiana, resiste a explosões e ocorre naturalmente ao decorrer dos anos.', imageName: 'bloco-perolado' },
  { id: '25', name: 'Bloco de Perolânio', description: 'Bloco de construção feito de Perolânio, combinando beleza residual com extrema resistência.', imageName: 'bloco-de-perolânio' },
];

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  const item = NEW_MOCK_ITEMS.find((i) => i.id === id);
  const themedTextColor = theme === 'dark' ? Colors.dark.text : Colors.light.text;
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    if (item) {
      fetchComments();
    }
  }, [item]);

  const fetchComments = async () => {
    if (item) {
      const fetchedComments = await getComments(item.id);
      setComments(fetchedComments);
    }
  };

  const handleAddComment = async () => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (comment.trim() && item) {
      await addComment(item.id, user.uid, user.displayName || 'Anonymous', comment);
      setComment('');
      fetchComments();
    }
  };

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
    commentsContainer: {
      marginTop: 24,
    },
    commentsTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 12,
    },
    commentItem: {
      marginBottom: 8,
      padding: 8,
      borderRadius: 4,
      backgroundColor: theme === 'dark' ? Colors.dark.card : Colors.light.card,
    },
    commentUser: {
      fontWeight: 'bold',
      marginBottom: 4,
    },
    commentInputContainer: {
      flexDirection: 'row',
      marginTop: 12,
      marginBottom: 20,
    },
    commentInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: theme === 'dark' ? '#555' : '#ccc',
      borderRadius: 4,
      paddingHorizontal: 8,
      marginRight: 8,
      color: themedTextColor,
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
    <FlatList
      style={[styles.container, { backgroundColor: theme === 'dark' ? Colors.dark.background : Colors.light.background }]}
      ListHeaderComponent={
        <>
          <View style={styles.card}>
            {/* Item image */}
            <View style={styles.imagePlaceholder}>
              <Image 
                source={item.imageName ? itemImages[item.imageName] : null} 
                style={{width: '100%', height: '100%'}}
                resizeMode="contain"
              />
            </View>
            
            <Text style={[styles.title, { color: themedTextColor }]}>{item.name}</Text>
            <Text style={[styles.description, { color: themedTextColor }]}>{item.description}</Text>
            
            {/* Metadata section */}
            <View style={styles.metadataContainer}>
              <View style={styles.metadataRow}>
                <Text style={[styles.metadataLabel, { color: themedTextColor }]}>Tipo:</Text>
                <Text style={[styles.metadataValue, { color: themedTextColor }]}>Material</Text>
              </View>
              <View style={styles.metadataRow}>
                <Text style={[styles.metadataLabel, { color: themedTextColor }]}>Raridade:</Text>
                <Text style={[styles.metadataValue, { color: themedTextColor }]}>Comum</Text>
              </View>
            </View>
          </View>

          {/* Comments Section */}
          <View style={styles.commentsContainer}>
            <Text style={[styles.commentsTitle, { color: themedTextColor }]}>Comentários</Text>
            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Adicione um comentário..."
                placeholderTextColor={theme === 'dark' ? '#999' : '#666'}
                value={comment}
                onChangeText={setComment}
              />
              <TouchableOpacity style={styles.button} onPress={handleAddComment}>
                <Text style={styles.buttonText}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      }
      data={comments}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.commentItem}>
          <Text style={[styles.commentUser, { color: themedTextColor }]}>{item.userName}</Text>
          <Text style={{ color: themedTextColor }}>{item.text}</Text>
        </View>
      )}
    />
  );
}
