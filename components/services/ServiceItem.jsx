import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const ServiceItem = ({service}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{service.title}</Text>
      <Text style={styles.description}>{service.description}</Text>
      <Text style={styles.info}>Categoría: {service.category}</Text>
      <Text style={styles.info}>Horas: {service.hours}</Text>
      <Text style={styles.info}>Contacto: {service.contact}</Text>
      <Text style={styles.info}>Ubicación: {service.location}</Text>

      <TouchableOpacity style={styles.button} onPress={''}>
        <Text style={styles.buttonText}>Ver más</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 0
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    color: '#555',
    marginBottom: 12
  },
  info: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
  },

  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    padding: 10,
    fontWeight: 500
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }

})

export default ServiceItem