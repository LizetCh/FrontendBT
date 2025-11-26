
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
interface WhiteGradientButtonProps {
  onPress: () => void | Promise<void>;
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

interface SolidButtonProps {
  onPress: () => void | Promise<void>;
  title: string;
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
export const WhiteGradientButton = ({
  onPress,
  title,
  style,
  textStyle
}: SolidButtonProps) => (
  <TouchableOpacity onPress={onPress}>
    <LinearGradient
      colors={['#FFFFFF', '#F5F5F7']} // blanco → lightest
      start={gradientDirections.diagonal.start}
      end={gradientDirections.diagonal.end}
      style={[styles.whiteButton, style]}
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

});