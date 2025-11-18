import ServiceInfoItem from "@/components/services/ServiceInfoItem";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../constants/theme';

const ServiceInfo = () => {
  const { service } = useLocalSearchParams();
  const parsedService = JSON.parse(service);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

      <View style={styles.container}>

        <Text style={styles.titulo}>Información del servicio</Text>
        <View style={styles.separator} />

        <ScrollView>
          <ServiceInfoItem service={parsedService} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ServiceInfo;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.text,
  },
  separator: {
    height: 1,
    backgroundColor: "#00000015",
    marginBottom: 0,
    borderRadius: 0.5
  }
});
