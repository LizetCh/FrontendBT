import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const ServiceItem = ({service}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerItem}>
        <Text style={styles.category}>{service.category}</Text>
        <Text style={styles.infoValue}>📍 {service.location}</Text>
        
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{service.title}</Text>
        <Text style={styles.title}> {service.hours} hrs</Text>

      </View>
      
      <Text style={styles.description}>{service.description}</Text>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Ver más</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  headerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  category: {
    fontSize: 14,
    backgroundColor: '#007AFF',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  description: {
    fontSize: 15,
    color: '#6B6B6B',
    marginBottom: 20,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
  }
})

export default ServiceItem