import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/theme";

export default function UserRating({ avg = 0, count = 0 }) {
  const MAX_STARS = 5;
  const filledStars = Math.floor(avg);
  const hasHalfStar = avg - filledStars >= 0.5;

  const emptyStars =
    MAX_STARS - filledStars - (hasHalfStar ? 1 : 0);

  return (
    <View style={styles.container}>
      {/* Estrellas llenas */}
      {Array.from({ length: filledStars }).map((_, i) => (
        <Ionicons key={`full-${i}`} name="star" size={24} color="#FACC15" />
      ))}

      {/* Media estrella */}
      {hasHalfStar && (
        <Ionicons name="star-half" size={24} color="#FACC15" />
      )}

      {/* Estrellas vacías */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Ionicons key={`empty-${i}`} name="star-outline" size={24} color="#FACC15" />
      ))}

      {/* Valor numérico */}
      <Text style={styles.text}>
        {avg.toFixed(1)} ({count})
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 0
  },
  text: {
    fontSize: 16,
    marginLeft: 8,
    color: colors.dark
  }
});
