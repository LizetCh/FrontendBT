import ServicesList from '@/components/services/ServicesList';
import { useRouter } from 'expo-router'; // Asegúrate de tener expo-router instalado
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ServiceScreen = () => {
  const router = useRouter()

  const [services, setServices] = useState([
    { id: 1, title: 'Clases de guitarra', description: 'Aprende a tocar la guitarra', category: 'Música', hours: 3, contact: '989898989', location: 'Merida, Yuc' },
    { id: 2, title: 'Clases de cocina', description: 'Aprende a cocinar platillos deliciosos', category: 'Cocina', hours: 2, contact: '979797979', location: 'Merida, Yuc' },
    { id: 3, title: 'Clases de yoga', description: 'Mejora tu bienestar físico y mental', category: 'Salud', hours: 1.5, contact: '969696969', location: 'Merida, Yuc' },
    { id: 4, title: 'Clases de fotografía', description: 'Captura momentos inolvidables', category: 'Arte', hours: 4, contact: '959595959', location: 'Merida, Yuc' },
    { id: 5, title: 'Clases de programación', description: 'Aprende a programar desde cero', category: 'Tecnología', hours: 5, contact: '949494949', location: 'Merida, Yuc' }
  ])

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Banco de Tiempo</Text>
      
      <TextInput 
        style={styles.input}
        placeholder="Buscar servicios..." 
      />
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('./notes')}
      >
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      <ServicesList services={services}/>
    </View>
  )
}

export default ServiceScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffffff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  button: {
    backgroundColor: 'colors.dark',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
})