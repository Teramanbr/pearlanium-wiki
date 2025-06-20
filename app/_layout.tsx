import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavThemeProvider,
} from '@react-navigation/native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useFonts } from 'expo-font';
import { Drawer } from 'expo-router/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Pressable, Text, StyleSheet, Platform } from 'react-native';

import { ThemeProviderComponent, useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { AuthProvider } from '@/contexts/AuthContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Custom Drawer Content Component
function CustomDrawerContent(props: any) {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const iconName = theme === 'dark' ? 'sun-o' : 'moon-o';
  const buttonText = theme === 'dark' ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro';

  // Determine text color based on theme for the custom button
  const themedTextColor = theme === 'dark' ? '#FFFFFF' : '#000000';

  const items = props.items || [];
  const filteredItems = items.filter((item: { key: string }) => 
    item.key !== 'login'
  );

  return (
    <DrawerContentScrollView {...props} style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
      <View style={{flex: 1}}>
        <DrawerItemList {...props} items={filteredItems} />
      </View>
      {/* Profile Button - only shown when logged in */}
      {user && (
        <DrawerItem
          label="Perfil"
          icon={({ color, size }) => (
            <FontAwesome name="user-circle" size={size} color={color} />
          )}
          onPress={() => props.navigation.navigate('profile')}
          labelStyle={[styles.customDrawerLabel, { color: themedTextColor }]}
          style={styles.customDrawerItem}
        />
      )}
      {!user && (
        <DrawerItem
          label="Login"
          icon={({ color, size }) => (
            <FontAwesome name="sign-in" size={size} color={color} />
          )}
          onPress={() => props.navigation.navigate('login')}
          labelStyle={[styles.customDrawerLabel, { color: themedTextColor }]}
          style={styles.customDrawerItem}
        />
      )}
      {/* Custom Theme Toggle Button at the bottom */}
      <DrawerItem
        label={buttonText}
        icon={({ color, size }) => (
          <FontAwesome name={iconName as any} size={size} color={color} />
        )}
        onPress={toggleTheme}
        labelStyle={[styles.customDrawerLabel, { color: themedTextColor }]}
        style={styles.customDrawerItem}
      />
    </DrawerContentScrollView>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProviderComponent>
        <AppContent />
      </ThemeProviderComponent>
    </AuthProvider>
  );
}

function AppContent() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const newActiveBgColor = '#FF7001'; // Solid orange for active background
  const newActiveTintColor = '#FFFFFF'; // White for active text/icon
  const inactiveColor = theme === 'dark' ? '#A0A0A0' : '#606060';
  const headerTextColor = theme === 'dark' ? '#FFFFFF' : '#000000';

  const gestureHandlerRootViewStyle = [
    { flex: 1 },
    Platform.OS === 'web' && styles.webOverflowHidden, // Apply overflow hidden for web
  ];

  return (
    <GestureHandlerRootView style={gestureHandlerRootViewStyle}>
      <NavThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
        <Drawer
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            drawerPosition: 'right',
            drawerActiveTintColor: newActiveTintColor, // Use new white color
            drawerInactiveTintColor: inactiveColor,
            drawerActiveBackgroundColor: newActiveBgColor, // Use new solid orange color
            headerTintColor: headerTextColor,
            drawerLabelStyle: {
              fontSize: 16, // Increased font size
            },
            drawerItemStyle: {
              paddingVertical: 5, // Increased vertical padding for item height
              borderRadius: 8,
            },
          }}>
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: 'Início',
              title: 'Início',
              drawerIcon: ({ size, color }) => (
                <FontAwesome name="home" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="itens"
            options={{
              drawerLabel: 'Itens',
              title: 'Itens',
              drawerIcon: ({ size, color }) => (
                <FontAwesome name="cube" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="login"
            options={{
              drawerItemStyle: { display: 'none' },
              title: 'Entrar',
            }}
          />
          <Drawer.Screen
            name="signup"
            options={{
              drawerItemStyle: { display: 'none' },
              title: 'Criar Conta',
            }}
          />
          <Drawer.Screen
            name="about"
            options={{
              drawerLabel: 'Sobre',
              title: 'Sobre',
              drawerIcon: ({ size, color }) => (
                <FontAwesome name="info-circle" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="profile"
            options={{
              drawerItemStyle: { display: 'none' },
              title: 'Perfil',
            }}
          />
          <Drawer.Screen
            name="itens/[id]"
            options={{
              drawerItemStyle: { display: 'none' },
              title: 'Detalhe do Item',
            }}
          />
          <Drawer.Screen
            name="+not-found"
            options={{
              drawerItemStyle: { display: 'none' },
              title: 'Ops!',
            }}
          />
        </Drawer>
      </NavThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  customDrawerItem: {
    // Styles for the container of the custom drawer item
    marginBottom: 10, // Add some margin at the bottom
  },
  customDrawerLabel: {
    // Styles for the label of the custom drawer item
    fontWeight: 'normal', // Default is bold for DrawerItem
    fontSize: 14,
  },
  webOverflowHidden: { // Style to hide overflow on web
    overflow: 'hidden',
  },
});
