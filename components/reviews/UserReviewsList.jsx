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

  // Obtiene todos los servicios del usuario y las reseñas asociadas
  const fetchUserReviews = async () => {
    try {
      //console.log("User ID en perfil:", userId);

      // Obtener servicios creados por este usuario
      const servicesRes = await api.get(`/services/user/${userId}`);
      const services = servicesRes.data || [];

      // Validar realmente servicios del usuario (blindaje contra backend roto)
      const ownedServices = services.filter(
        (svc) => String(svc.owner) === String(userId)
      );

      //console.log("Servicios reales del usuario:", ownedServices.length);

      let collected = [];

      // Obtener reseñas por cada servicio real
      for (const service of ownedServices) {
        try {
          const reviewsRes = await api.get(`/reviews/service/${service._id}`);
          const rawReviews = reviewsRes.data.reviews || reviewsRes.data;

          const normalized = rawReviews.map((r) => ({
            _id: r._id,
            rating: r.rating,
            comment: r.comment,
            owner_name: r.owner_name ?? "Usuario",
            user_id: r.user_id ?? r.reviewer_id ?? null, // soporte flexible
          }));

          // Recolectar reseñas:
          // - que no sean hechas por el mismo usuario
          // - que no se dupliquen
          normalized.forEach((rev) => {
            const isOwnReview = String(rev.user_id) === String(userId);
            const exists = collected.some((c) => c._id === rev._id);

            if (!isOwnReview && !exists) {
              collected.push(rev);
            }
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

  // Ejecuta consulta cuando cambia el usuario
  useEffect(() => {
    if (userId) fetchUserReviews();
  }, [userId]);

  // Estado de carga
  if (loading) {
    return <Text style={styles.text}>Cargando reseñas...</Text>;
  }

  // Si no hay reseñas
  if (reviews.length === 0) {
    return <Text style={styles.text}>Sin reseñas aún</Text>;
  }

  // Render
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
