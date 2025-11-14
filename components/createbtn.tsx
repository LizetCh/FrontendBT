// components/createbtn.tsx
import { colors, gradientDirections, gradients } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

// Define la interfaz con propiedades opcionales
interface GradientButtonProps {
  onPress: () => void | Promise<void>;
  title: string;
  gradient?: string[];
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const GradientButton = ({ 
  onPress, 
  title, 
  gradient = gradients.primary,
  style,
  textStyle
}: GradientButtonProps) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <LinearGradient
      colors={gradient as any} // ← Agrega "as any" para evitar el error de tipos
      start={gradientDirections.horizontal.start}
      end={gradientDirections.horizontal.end}
      style={styles.button}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});