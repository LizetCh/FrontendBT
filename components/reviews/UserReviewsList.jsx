//Usada unicamente en Mi Perfil
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { api } from "../../api/axiosInstance";
import { colors } from "../../constants/theme";
import ReviewCard from "./ReviewItem";

export default function UserReviewsList({ userId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserReviews = async () => {
    try {
      const servicesRes = await api.get(`/services/user/${userId}`);
      const services = servicesRes.data;

      let collected = [];

      for (const service of services) {
        try {
          const reviewsRes = await api.get(`/reviews/service/${service._id}`);
          const rawReviews = reviewsRes.data.reviews || reviewsRes.data;

          
          const normalizedReviews = rawReviews.map(r => ({
            _id: r._id,
            owner_name: r.owner_name ?? "Usuario",
            rating: r.rating,
            comment: r.comment,
          }));

          // Evita mostrar reseñas hechas por él mismo
          collected = [
            ...collected, 
            ...normalizedReviews.filter(r => r.user_id !== userId)
          ];

        } catch (error) {
          console.log("Error obteniendo reseñas de servicio:", error.message);
        }
      }

      setReviews(collected);
    } catch (error) {
      console.log("Error al obtener reseñas:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUserReviews(); }, [userId]);

  if (loading) {
    return <Text style={styles.text}>Cargando reseñas...</Text>;
  }

  if (reviews.length === 0) {
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
