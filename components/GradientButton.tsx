
import { colors, gradientDirections, gradients } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface GradientButtonProps {
  onPress: () => void | Promise<void>;
  title: string;
  gradient?: string[];
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}
interface WhiteGradientButtonProps {
  onPress: () => void | Promise<void>;
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

interface SolidButtonProps {
  onPress: () => void | Promise<void>;
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export const GradientButton = ({ 
  onPress, 
  title, 
  gradient = gradients.primary,
  style,
  textStyle,
  disabled = false,
}: GradientButtonProps) => (
  <TouchableOpacity onPress={onPress} style={style} disabled={disabled}>
    <LinearGradient
      colors={gradient as any} 
      start={gradientDirections.diagonal.start}
      end={gradientDirections.diagonal.end}
      style={[styles.button, style, disabled && styles.disabled]}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </LinearGradient>
  </TouchableOpacity>
);
export const WhiteGradientButton = ({
  onPress,
  title,
  style,
  textStyle,
  disabled = false,
}: SolidButtonProps) => (
  <TouchableOpacity onPress={onPress} disabled={disabled}>
    <LinearGradient
      colors={['#FFFFFF', '#F5F5F7']} // blanco → lightest
      start={gradientDirections.diagonal.start}
      end={gradientDirections.diagonal.end}
      style={[styles.whiteButton, style, disabled && styles.disabled]}
    >
      <Text style={[styles.whiteText, textStyle]}>{title}</Text>
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
  whiteButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0', // borde sutil para destacar sobre fondo blanco
  },
  whiteText: {
    color: '#7A00C6', // morado elegante
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.7,
  },
});
