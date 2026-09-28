import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '../theme';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export function Screen({ children, style }: Props) {
  const theme = useTheme();
  return <View style={[styles.container, { backgroundColor: theme.background }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});