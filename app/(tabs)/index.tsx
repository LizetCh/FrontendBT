import { colors } from '@/constants/theme';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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

          <TouchableOpacity  style={styles.loginButton} onPress={() => router.push('./services') } >
          <Text>Iniciar sesión</Text>
        </TouchableOpacity>

          
        </View>
      </ScrollView>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: '#503FA6',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#040405ff',
    marginBottom: 8,
    fontFamily: 'Arial',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonDisabled: {
    backgroundColor: '#99c9ff',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  
})