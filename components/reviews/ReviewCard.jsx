import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { api } from "../../api/axiosInstance";
import { colors } from "../../constants/theme";

export default function ReviewCard({ review }) {
  const [reviewerName, setReviewerName] = useState("Cargando...");

  const fetchUserName = async () => {
    try {
      const res = await api.get(`/users/${review.user_id}`);
      setReviewerName(res.data.user.name);
    } catch (error) {
      setReviewerName("Usuario desconocido");
      console.log("Error cargando usuario:", error.message);
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{reviewerName}</Text>

      <View style={styles.stars}>
        {Array.from({ length: review.rating }).map((_, i) => (
          <Ionicons key={i} name="star" size={18} color="#FFD700" />
        ))}
      </View>

      <Text style={styles.comment}>{review.comment}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.dark,
  },
  stars: {
    flexDirection: "row",
    marginVertical: 6,
  },
  comment: {
    fontSize: 14,
    color: "#444",
  }
});
