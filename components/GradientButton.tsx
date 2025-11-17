
import { colors, gradientDirections, gradients } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

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
      colors={gradient as any} 
      start={gradientDirections.diagonal.start}
      end={gradientDirections.diagonal.end}
      style={[styles.button, style]}
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
    color: colors.buttonText,
    fontSize: 16,
    fontWeight: '600',
  },
});