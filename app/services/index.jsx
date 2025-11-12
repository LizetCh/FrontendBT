import ServicesList from '@/components/services/ServicesList'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

const ServiceScreen = () => {

  const [services, setServices] = useState([
    { id: 1, title: 'Clases de guitarra', description: 'Aprende a tocar la guitarra', category: 'Música', hours: 3, contact: '989898989', location: 'Merida, Yuc' },
    { id: 2, title: 'Clases de cocina', description: 'Aprende a cocinar platillos deliciosos', category: 'Cocina', hours: 2, contact: '979797979', location: 'Merida, Yuc' },
    { id: 3, title: 'Clases de yoga', description: 'Mejora tu bienestar físico y mental', category: 'Salud', hours: 1.5, contact: '969696969', location: 'Merida, Yuc' },
    { id: 4, title: 'Clases de fotografía', description: 'Captura momentos inolvidables', category: 'Arte', hours: 4, contact: '959595959', location: 'Merida, Yuc' },
    { id: 5, title: 'Clases de programación', description: 'Aprende a programar desde cero', category: 'Tecnología', hours: 5, contact: '949494949', location: 'Merida, Yuc' }
  ])





  return (
    <View style={styles.container}>
      <ServicesList services={services}/>

    </View>
  )

}

export default ServiceScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },


})





