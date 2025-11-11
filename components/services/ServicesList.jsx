import ServiceItem from '@/components/services/ServiceItem'
import { FlatList, View } from 'react-native'

const ServicesList = ({services}) => {
  return (
    <View>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <ServiceItem service={item} />
        )}
      />
    </View>
  )
}


export default ServicesList