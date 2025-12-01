// Usada únicamente en Mi Perfil — Lista de reseñas que otros usuarios hicieron
// sobre servicios que pertenecen a este usuario
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
      // Obtener TODOS los servicios (porque backend NO filtra por user)
      const servicesRes = await api.get(`/services/user/${userId}`);
      const services = servicesRes.data || [];

      // Filtrar solo servicios que realmente son del usuario
      const myServices = services.filter(
        (svc) => String(svc.owner_id) === String(userId)
      );

      let collected = [];

      // Obtener reseñas de cada servicio del usuario actual
      for (const service of myServices) {
        try {
          const reviewsRes = await api.get(`/reviews/service/${service._id}`);
          const rawReviews = reviewsRes.data.reviews || reviewsRes.data;

          rawReviews.forEach((r) => {
            const review = {
              _id: r._id,
              rating: r.rating,
              comment: r.comment,
              owner_name: r.owner_name ?? "Usuario",
              reviewer_id: r.user_id ?? null,
            };

            const isOwnReview = String(review.reviewer_id) === String(userId);
            const exists = collected.some((c) => c._id === review._id);

            if (!isOwnReview && !exists) collected.push(review);
          });
        } catch (err) {
          console.log("Error obteniendo reseñas:", err.message);
        }
      }

      setReviews(collected);
    } catch (error) {
      console.log("Error global al obtener reseñas:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchUserReviews();
  }, [userId]);

  if (loading) return <Text style={styles.text}>Cargando reseñas...</Text>;

  if (reviews.length === 0)
    return <Text style={styles.text}>Sin reseñas aún</Text>;

  return (
    <View style={{ marginTop: 10 }}>
      {reviews.map((review) => (
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
