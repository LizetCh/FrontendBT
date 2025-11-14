import { colors, gradients } from '@/constants/theme';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { GradientButton } from '../../components/createbtn';

export default function HomeScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor complete todos los campos')
      return
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Por favor ingresa un email válido')
      return
    }

    setIsLoading(true)

    try {
      setTimeout(() => {
        setIsLoading(false)
        Alert.alert('Éxito', `Bienvenido ${email}`)
      }, 1500)
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error durante el inicio de sesión')
      setIsLoading(false)
    }
  }

  const handleRegister = () => {
    Alert.alert('Registro', 'Ir a pantalla de registro')
    // navigation.navigate('Register')
  }

  return (
    <ScrollView 
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={styles.title}>Banco de Tiempo</Text>
        <Text style={styles.subtitle}>Inicia sesión en tu cuenta</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="correo@ejemplo.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            editable={!isLoading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password"
            editable={!isLoading}
          />
        </View>

        {/* Botón de Login con gradiente */}
        <GradientButton 
          title={isLoading ? "Iniciando sesión..." : "Iniciar Sesión"} 
          onPress={() => router.push('./services')}
          gradient={gradients.primary}
          style={{ marginBottom: 16 }}
        />

        {/* Botón de Registro */}
        <GradientButton 
          title="Registrarse" 
          onPress={handleRegister}
          gradient={gradients.soft}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: colors.darkest,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.lightest, // Cambiado para que se vea sobre fondo oscuro
    marginBottom: 8,
    fontFamily: 'Arial',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 16,
    color: colors.light, // Cambiado para que se vea
  },
  form: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
  },
})