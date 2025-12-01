import { colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import { GradientButton } from '../GradientButton';


const ServiceItem = ({service}) => {
  const router = useRouter();  
  return (
    <View style={styles.container}>
      {/*header contains categories and location*/}
      <View style={styles.headerItem}> 
        
        {/*render de varias categorías*/}
        <View style={{flexDirection: 'row', gap: 6}}>
          {/*get categories if not undefined*/}
          {service.categories && service.categories.map((item, index) => (
            <Text key={index} style={styles.category}>{item}</Text>
          ))}
        </View>
       
        <Text style={styles.infoValue}>📍 {service.location}</Text>
        
      </View>
      
      {/*title and hours*/}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{service.title}</Text>
        <Text style={styles.title}> {service.hours} hrs</Text>
      </View>

      {/*user info*/}
        <View style={styles.userInfoContainer}>
          <View style={styles.userImageContainer}>
            {/*default user image*/}
            <Image source={require('@/assets/images/user-default-img.jpg')}  style={styles.userImage}/>
          </View>
          <Text style={styles.userName}>{service.owner_name}</Text>
        </View>
      
      {/*trim description to 15 words*/}
      <Text style={styles.description}>{
        service.description.split(" ").length > 15 ? service.description.split(" ").slice(0, 15).join(" ") + " ..." : service.description}
      </Text>
      <GradientButton onPress={() => router.push({
        pathname: "/services/serviceInfo",
        params: { service: JSON.stringify(service) }
      })}
        title="Ver más"
        textStyle={styles.buttonText}

      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 24,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 0.4,
    borderColor: '#a6a6a6ff',
    gap: 10
  },
    headerItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    userInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 0
    },
    userName: {
      fontSize: 14,
      fontWeight: '500',
      color: '#333'
    },
    userImageContainer: {
      width: 20,
      height: 20,
      borderRadius: 20,
      overflow: 'hidden',
      marginBottom: 0,
    },
  userImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  category: {
    fontSize: 12,
    backgroundColor: colors.yellow,
    color: colors.buttonText,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    letterSpacing: -0.3,
    maxWidth: '75%'
  },
  description: {
    fontSize: 14,
    color: '#6B6B6B',
    marginBottom: 12
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600'
  },
});

export default ServiceItem