import React from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavDefaultTheme,
  DarkTheme as NavDarkTheme,
  Theme as NavTheme,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { useTheme } from '../theme';
import { useI18n } from '../i18n';
import TransactionsScreen from '../screens/TransactionsScreen';
import DebtsScreen from '../screens/DebtsScreen';
import ReportsScreen from '../screens/ReportsScreen';
import SettingsScreen from '../screens/SettingsScreen';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

const Tab = createBottomTabNavigator();

export function RootNavigator() {
  const theme = useTheme();
  const t = useI18n().t;

  const navTheme: NavTheme = {
    ...(theme.mode === 'dark' || theme.mode === 'high-contrast' ? NavDarkTheme : NavDefaultTheme),
    colors: {
      ...(theme.mode === 'dark' || theme.mode === 'high-contrast' ? NavDarkTheme : NavDefaultTheme).colors,
      primary: theme.gold,
      background: theme.background,
      card: theme.surface,
      text: theme.text,
      border: theme.line,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          headerStyle: { backgroundColor: theme.surface },
          headerTintColor: theme.text,
          tabBarActiveTintColor: theme.gold,
          tabBarInactiveTintColor: theme.tabInactive,
          tabBarStyle: { backgroundColor: theme.surface, borderTopColor: theme.line },
          tabBarIcon: ({ color, size }) => {
            const icons: Record<string, IconName> = {
              Transactions: 'book-open-page-variant',
              Debts: 'hand-coin',
              Reports: 'chart-box',
              Settings: 'cog',
            };
            return (
              <MaterialCommunityIcons name={icons[route.name] ?? 'help-circle'} size={size} color={color} />
            );
          },
        })}
      >
        <Tab.Screen name="Transactions" component={TransactionsScreen} options={{ title: t.transactions }} />
        <Tab.Screen name="Debts" component={DebtsScreen} options={{ title: t.debts }} />
        <Tab.Screen name="Reports" component={ReportsScreen} options={{ title: t.reports }} />
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: t.settings }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}