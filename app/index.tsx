import { colors } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { api } from '../api/axiosInstance';
import { GradientButton, WhiteGradientButton } from '../components/GradientButton';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert('Error', 'Por favor complete todos los campos')
    return
  }

  if (!email.includes('@')) {
    Alert.alert('Error', 'Por favor ingresa un email válido')
    return
  }

  setIsLoading(true);



  try {
    const response = await api.post('users/login',{
      email, password,
    });

    const data = response.data;
    if(!data.token){
      Alert.alert('Error','El servidor no regresó un token');
      setIsLoading(false);
      return;
    }

    //Guardar el token para usarlo

    await AsyncStorage.setItem('authToken', data.token);

    Alert.alert ('Bienvenido', 'Inicio de sisón exitoso',[
      {text:'Continuar',
        onPress: () =>{
          router.push('./services');
        },
      },
    ]);
    } catch (error: any)
    {
      console.log ('Error en el login', error?.response?.data || error.message);

      const msgBackend = 
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        'Ocurrio un error durante el incio de sesión';

        Alert.alert('Error',msgBackend);
    }
    finally{
      setIsLoading(false);
    }
  };


const handleGoToRegister = () => {
  router.push('./register')
}

const handleGoToRecoverPassword = () => {
  router.push('./recoverPassword');
}

  return (
    <ScrollView 
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={styles.subtitle}>Bienvenid@ de nuevo</Text>
        <Text style={styles.title}>Banco de Tiempo</Text>
        
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
          <TouchableOpacity
            onPress={handleGoToRecoverPassword}
            disabled={isLoading}
            style={styles.forgotWrapper}
          >
            <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>

        <GradientButton 
          title={isLoading ? "Iniciando sesión..." : "Iniciar Sesión"} 
          onPress={handleLogin}
          style={{ marginBottom: 8 }}
        />

            <View style={styles.createWrapper}>
          <Text style={styles.createPrompt}>¿Aún no tienes una cuenta?</Text>
        </View>
        <WhiteGradientButton 
          title={isLoading ? "Creando cuenta..." : "Crear Cuenta"} 
          onPress={handleGoToRegister}
          style={{ marginBottom: 16 }}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  createWrapper: {
    marginTop: 1,
    alignItems: 'center',
  },
  forgotWrapper: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotText: {
    fontSize: 13,
    color: colors.yellow,
    fontWeight: '500',
  },
  createPrompt: {
    fontSize: 14,
    color: colors.dark,
    marginBottom: 5,
  },
  create:{
    backgroundColor: colors.light,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  createText:{
  color: colors.dark,
  fontSize: 16,
    fontWeight: '600',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: colors.lightest,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 800,
    color: colors.dark, 
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 18,
    color: colors.primary, 
    marginBottom: 12,
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
    marginBottom: 100,
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
    backgroundColor: '#87878729',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
  },
})
