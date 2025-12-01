//Este es para la sección de Mi perfil
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { api } from "../../api/axiosInstance";
import { colors } from '../../constants/theme';
import ServiceItem from "../services/ServiceItem";

export default function UserServicesList({ userId, onServicePress }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserServices = async () => {
    try {
      const res = await api.get(`/services`);
      const filtered = res.data.filter(service => service.owner_id === userId);
      setServices(filtered);
    } catch (error) {
      console.log("Error al obtener servicios del usuario:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserServices();
  }, [userId]);

  if (loading) {
    return <Text style={styles.text}>Cargando servicios...</Text>;
  }

  if (!loading && services.length === 0) {
    return (
      <Text style={styles.text}>
        No tienes servicios publicados.
      </Text>
    );
  }

  return (
    <View style={{ marginTop: 10 }}>
      {services.map(service => (
        <ServiceItem
          key={service._id}
          service={service}
          onPress={onServicePress}  // ⬅️ ESTA ES LA CORRECCIÓN
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginTop: 15,
    fontSize: 16,
    color: colors.primary,
    fontWeight: "500"
  }
});
