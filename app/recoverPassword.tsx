import { colors } from '@/constants/theme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { api } from '../api/axiosInstance';
import { GradientButton } from '../components/GradientButton';

export default function RecoverPasswordScreen() {
  const [email, setEmail] = useState('');
  const [recoveryCode, setRecoveryCode] = useState(''); // 👈 sigue existiendo, pero oculto
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1); // paso 1: solo correo, paso 2: nueva contraseña

  //  pedir token /users/forgot-password
  const handleGoToStep2 = async () => {
    if (!email) {
      Alert.alert('Error', 'Por favor ingresa tu correo');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Ingresa un email válido');
      return;
    }

    try {
      setIsLoading(true);

      const res = await api.post('users/forgot-password', { email });

      const generatedToken = res.data?.reset_token;

      if (generatedToken) {
        setRecoveryCode(generatedToken);
      }

      Alert.alert(
        'Código generado',
        'Se ha generado un código de recuperación. Puedes continuar para cambiar tu contraseña.'
      );

      setStep(2);
    } catch (error: any) {
      console.log('forgot-password error:', error?.response?.data || error);
      const msg =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        'No se pudo generar el código de recuperación';
      Alert.alert('Error', msg);
    } finally {
      setIsLoading(false);
    }
  };

  // posterior al token se puede crear la contraseña
  const handleRecoverPassword = async () => {
    if (!email || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Ingresa un email válido');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (!recoveryCode) {
      Alert.alert(
        'Error',
        'No se encontró un código de recuperación. Vuelve a solicitar el código.'
      );
      return;
    }

    try {
      setIsLoading(true);

      const res = await api.post('users/recover-password', {
        email,
        token: recoveryCode.trim(),
        new_password: newPassword,
      });

      Alert.alert(
        'Éxito',
        res.data?.message || 'Contraseña actualizada correctamente',
        [
          {
            text: 'Ir al inicio de sesión',
            onPress: () => router.replace('/'),
          },
        ]
      );
    } catch (error: any) {
      console.log('recover-password error:', error?.response?.data || error);
      const msg =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        'No se pudo actualizar la contraseña';
      Alert.alert('Error', msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>{'< Atrás'}</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>Cambiar contraseña</Text>

        {step === 1 && (
          <>
            <Text style={styles.subtitle}>
              Ingresa el correo asociado a tu cuenta para generar un código de
              recuperación.
            </Text>

            <TextInput
              placeholder="Correo electrónico"
              placeholderTextColor="#9a9a9a"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <GradientButton
              title={isLoading ? 'Generando código...' : 'Continuar'}
              onPress={handleGoToStep2}
              style={{ marginTop: 10 }}
            />
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.subtitle}>
              Ahora escribe tu nueva contraseña.
            </Text>

            <TextInput
              placeholder="Correo electrónico"
              placeholderTextColor="#9a9a9a"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />


            <TextInput
              placeholder="Nueva contraseña"
              placeholderTextColor="#9a9a9a"
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              value={newPassword}
              onChangeText={setNewPassword}
            />

            <TextInput
              placeholder="Confirmar nueva contraseña"
              placeholderTextColor="#9a9a9a"
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <GradientButton
              title={isLoading ? 'Actualizando...' : 'Actualizar contraseña'}
              onPress={handleRecoverPassword}
              style={{ marginTop: 10 }}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 30,
    backgroundColor: colors.lightest,
    justifyContent: 'flex-start',
    paddingTop: 120,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    padding: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 14,
    backgroundColor: '#f8f8f8',
    fontSize: 16,
    color: colors.dark,
  },
});
