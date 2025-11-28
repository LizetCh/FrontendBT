import { colors } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { api } from '../api/axiosInstance';
import { GradientButton } from '../components/GradientButton';


export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const[loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (loading) {
      return;
    }
    if (!name || !email || !password || !confirmPassword){
      Alert.alert('Error','Todos los campos son obligatorios');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
    try{
      setLoading(true);

      const response = await api.post('users/create',{
        name, email, password
      });
      const data = response.data;

      if (!data.token){
        Alert.alert ('Error', 'No se recibió token del servidor');
        return;
      }
      //Guardar JWT 
      await AsyncStorage.setItem('authToken', data.token);

      Alert.alert('Cuenta creada', 'Tu cuenta ha sido creada correctamente',[
        {
          text:'Continuar',
          onPress: () => {
            router.replace('/')
          },
        },
      ]);
    } catch (error:any){
      console.log('Error en registro', error?.response?.data ||error.message );

      const msgBackend =
        error?.response?.data?.error || 'No se pudo crear la cuenta';
        Alert.alert('Error', msgBackend);
    }finally{
      setLoading(false);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>{'< Atrás'}</Text>
      </TouchableOpacity>
      <View style={styles.card}>
        <Text style={styles.title}>Crear cuenta</Text>
        <Text style={styles.subtitle}>
          Ingresa tus datos correctamente
        </Text>

        <TextInput
          placeholder="Nombre completo"
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholderTextColor="#9a9a9a"
        />
          <TextInput
          placeholder="Correo electrónico"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#9a9a9a"
        />

        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#9a9a9a"
        />

        {/* CONFIRMAR CONTRASEÑA */}
        <TextInput
          placeholder="Confirmar contraseña"
          secureTextEntry
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor="#9a9a9a"
        />

        <GradientButton
          title={loading ? 'Creando cuenta...' : 'Crear cuenta'}
          onPress={handleRegister}
          style={{ marginTop: 10, marginBottom: 16 }}
          disabled={loading}
        />
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
    color: colors.darkest,
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
    fontSize: 28,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
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
    fontSize: 15,
    color: colors.dark,
  },
});
