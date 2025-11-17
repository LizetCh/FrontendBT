import ServicesList from '@/components/services/ServicesList';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddServiceModal from '../../../components/services/AddServiceModal';
import { colors } from '../../../constants/theme';


const ServiceScreen = () => {
  const router = useRouter()

  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [services, setServices] = useState([
    { id: 1, title: 'Clases de guitarra', description: 'Aprende a tocar la guitarra', category: 'Música', hours: 3, contact: '989898989', location: 'Merida, Yuc' },
    { id: 2, title: 'Clases de cocina', description: 'Aprende a cocinar platillos deliciosos', category: 'Cocina', hours: 2, contact: '979797979', location: 'Merida, Yuc' },
    { id: 3, title: 'Clases de yoga', description: 'Mejora tu bienestar físico y mental', category: 'Salud', hours: 1.5, contact: '969696969', location: 'Merida, Yuc' },
    { id: 4, title: 'Clases de fotografía', description: 'Captura momentos inolvidables', category: 'Arte', hours: 4, contact: '959595959', location: 'Merida, Yuc' },
    { id: 5, title: 'Clases de programación', description: 'Aprende a programar desde cero', category: 'Tecnología', hours: 5, contact: '949494949', location: 'Merida, Yuc' }
  ])

  //filtrar servicios segun la búsqueda
  const filteredServices = services.filter(service => {
    const query = searchQuery.toLowerCase();
    return (
      service.title.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query) ||
      service.category.toLowerCase().includes(query) ||
      service.location.toLowerCase().includes(query)
    );
  });

  //función para mostrar el modal de agregar servicio
  const showAddServiceModal = () => {
      setModalVisible(true);
  };

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

      <View style={styles.container}>
        <Text style={styles.titulo}>Banco de Tiempo</Text>


        {/*barra para n¿buscar*/}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar servicios..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.light}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.light} />
            </TouchableOpacity>
          )}
        </View>
        
        {/*modal para agregar un nuevo servicio */}
        <AddServiceModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAddService={(newService) => {
            setServices([...services, { id: services.length + 1, ...newService }]);
          }}
        />




        <ServicesList services={filteredServices}/>

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
  
  //Diseño de la barra de búsqueda
   searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: colors.lightest,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 10,
    marginLeft: 8,
    color: colors.light
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    padding: 0,
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