import ServicesList from '@/components/services/ServicesList';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api } from '../../../api/axiosInstance';
import AddServiceModal from '../../../components/services/AddServiceModal';
import { colors } from '../../../constants/theme';


const ServiceScreen = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [services, setServices] = useState([])

  //fetch services
  const fetchServices = async () => {
      try {
        const res = await api.get("/services");
        setServices(res.data);
        console.log("Servicios obtenidos:", res.data);
      } catch (error) {
        console.log("Hubo un error al obtener los servicios:", error.message);
      }
  };

  //obtener servicios desde el backend
  useEffect(() => {
      fetchServices();
  }, []);
  

  //filtrar servicios segun la búsqueda
  const filteredServices = services.filter(service => {
    const query = searchQuery.toLowerCase();
    return (
      service.title.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query) ||
      //seacrh in categories array if service has categories
      (service.categories && service.categories.some(item => item.toLowerCase().includes(query))) ||
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
          onAddService={fetchServices}
        />



        {/*Mensaje de carga de servicios si hay servicios, desaparece cuando se cargan*/}
        {services.length === 0 && (
          <Text style={{textAlign: 'center'}}>Cargando servicios...</Text>
        )}

        {/*Lista de servicios filtrados*/}
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