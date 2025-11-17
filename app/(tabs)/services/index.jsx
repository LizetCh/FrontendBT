import ServicesList from '@/components/services/ServicesList';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddServiceModal from '../../../components/services/AddServiceModal';
import { colors } from '../../../constants/theme';


const ServiceScreen = () => {
  const router = useRouter()

  const [modalVisible, setModalVisible] = useState(false);

  const [services, setServices] = useState([
    { id: 1, title: 'Clases de guitarra', description: 'Aprende a tocar la guitarra', category: 'Música', hours: 3, contact: '989898989', location: 'Merida, Yuc' },
    { id: 2, title: 'Clases de cocina', description: 'Aprende a cocinar platillos deliciosos', category: 'Cocina', hours: 2, contact: '979797979', location: 'Merida, Yuc' },
    { id: 3, title: 'Clases de yoga', description: 'Mejora tu bienestar físico y mental', category: 'Salud', hours: 1.5, contact: '969696969', location: 'Merida, Yuc' },
    { id: 4, title: 'Clases de fotografía', description: 'Captura momentos inolvidables', category: 'Arte', hours: 4, contact: '959595959', location: 'Merida, Yuc' },
    { id: 5, title: 'Clases de programación', description: 'Aprende a programar desde cero', category: 'Tecnología', hours: 5, contact: '949494949', location: 'Merida, Yuc' }
  ])

  //función para mostrar el modal de agregar servicio
  const showAddServiceModal = () => {
      setModalVisible(true);
  };

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

      <View style={styles.container}>
        <Text style={styles.titulo}>Banco de Tiempo</Text>
        
        {/*modal para agregar un nuevo servicio */}
        <AddServiceModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAddService={(newService) => {
            setServices([...services, { id: services.length + 1, ...newService }]);
          }}
        />




        <ServicesList services={services}/>

        <TouchableOpacity style={styles.addButton} onPress={() => showAddServiceModal()}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

export default ServiceScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333'

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
  buttonText: {
    color: 'white',
    fontSize: 32
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.yellow,
    height: 70,
    width: 70,
    borderRadius: 40
  }
})