import ServicesList from '@/components/services/ServicesList'
import { useState } from 'react'
import { View } from 'react-native'

const ServiceScreen = () => {

  const [services, setServices] = useState([
    { id: 1, title: 'Clases de guitarra', description: 'Aprende a tocar la guitarra', category: 'Música', hours: 3, contact: '989898989', location: 'Merida, Yuc' }
  ])





  return (
    <View>
      <ServicesList services={services}/>

    </View>
  )

}

export default ServiceScreen





