
//modal del formulario para agregar un nuevo servicio
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { api } from '../../api/axiosInstance';
import { colors } from '../../constants/theme';
import { GradientButton } from '../GradientButton';

const AddServiceModal = ({ visible, onClose, onAddService }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoriesString, setCategoriesString] = useState('');
  const [location, setLocation] = useState('');
  const [hours, setHours] = useState('');
  const [contact, setContact] = useState('');

  const handleAddService = async () => {
    //revisar que todos los campos estén llenos
    if (!title || !description || !categoriesString || !location || !hours || !contact) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    //revisar que las horas sean un número válido
    const hoursNumber = parseFloat(hours);
    if (isNaN(hoursNumber) || hoursNumber <= 0) {
      alert('Por favor, ingresa un número válido de horas.');
      return;
    }


    const newService = {
      title: title.trim(),
      description: description.trim(),
      categories: categoriesString.trim(),
      location: location.trim(),
      hours: Number(hoursNumber),
      contact: contact.trim(),
    };

    try {
      //imprimir newService en consola
      console.log('Nuevo servicio a agregar:', newService);

      //obtner jwt
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        alert('No se encontró el token de autenticación. Por favor, inicia sesión de nuevo.');
        //mandar a login
        router.push('/login');
        return;
      }


      //hacer POST
      await api.post(
        '/services/crear',
        newService,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert('Servicio agregado exitosamente');


      //limpiar campos y cerrar modal
      setTitle('');
      setDescription('');
      setCategoriesString('');
      setLocation('');
      setHours('');
      setContact('');
      onClose();

      //refresh list
      onAddService();

    } catch (error) {
      console.log('Error al agregar el servicio:', error);
      alert('Hubo un error al agregar el servicio. Por favor, intenta de nuevo.');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Agregar Nuevo Servicio</Text>
          <Text>Título del Servicio</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Clases de Yoga"
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
          />
          <Text>Descripción</Text>
          <TextInput
            style={[styles.input, { height: 80}]}
            placeholder="Describe tu servicio. 
Ej. Clases de yoga para principiantes..."

            placeholderTextColor="#999"
            value={description}
            multiline={true}
            onChangeText={setDescription}
          />
          <Text>Categoría (Separar por comas)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Educación, Tecnología"
            placeholderTextColor="#999"
            //string separado por comas
            value={categoriesString}
            onChangeText={setCategoriesString}
          />
          <Text>Ubicación</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Mérida, Yucatán"
            placeholderTextColor="#999"
            value={location}
            onChangeText={setLocation}
          />
          <Text>Horas</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. 3.5"
            placeholderTextColor="#999"
            value={hours}
            onChangeText={setHours}
          />
          <Text>Contacto</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. 9991312131 / @usuarioRedSocial"
            placeholderTextColor="#999"
            value={contact}
            onChangeText={setContact}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              onPress={onClose}
              style={styles.cancelButton}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>

            <GradientButton
              title="Agregar Servicio"
              onPress={handleAddService}

            />
            
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    marginTop: 4
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12
  },
  buttonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 12,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddServiceModal;