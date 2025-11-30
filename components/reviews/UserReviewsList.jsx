import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { api } from "../../api/axiosInstance";
import { colors } from "../../constants/theme";
import ReviewCard from "./ReviewCard";

export default function UserReviewsList({ userId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserReviews = async () => {
    try {
      // Obtiene solo servicios del usuario dueño del perfil
      const servicesRes = await api.get(`/services/user/${userId}`);
      const userServices = servicesRes.data;

      console.log("Servicios del usuario:", userServices);

      let userReceivedReviews = [];

      // Obtener reseñas de cada servicio
      for (const service of userServices) {
        try {
          const reviewsRes = await api.get(`/reviews/service/${service._id}`);
          const serviceReviews = reviewsRes.data.reviews || reviewsRes.data;

          // Filtrar solo reseñas dirigidas a este usuario dueÑo del servicio
          const filtered = serviceReviews.filter(
            r => r.user_id !== userId // evita reseñas que este usuario haya hecho él mismo
          );

          userReceivedReviews = [...userReceivedReviews, ...filtered];

        } catch (error) {
          console.log("Error obteniendo reseñas de servicio:", error.message);
        }
      }

      console.log("Reseñas finales:", userReceivedReviews);

      setReviews(userReceivedReviews);
    } catch (error) {
      console.log("Error al obtener reseñas:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserReviews();
  }, [userId]);

  if (loading) {
    return <Text style={styles.text}>Cargando reseñas...</Text>;
  }

  if (!loading && reviews.length === 0) {
    return <Text style={styles.text}>Sin reseñas aún</Text>;
  }

  return (
    <View style={{ marginTop: 10 }}>
      {reviews.map(review => (
        <ReviewCard key={review._id} review={review} />
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
    fontWeight: "500",
  },
});
