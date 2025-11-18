import { reviewsData } from "@/constants/reviewsData";
import { colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";


const ServiceInfoItem = ({ service }) => {

  // si no hay servicio, mostrar mensaje de error
  if (!service) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Servicio no encontrado</Text>
      </View>
    );
  }

  //default values
  const {
    title = "",
    description = "",
    category = [],
    hours = "",
    location = "",
    contact = "No disponible",
    providerName = "Usuario",
    providerRating = 0,
    providerBio = "Sin biografía",
    providerSkills = [],
    id
    } = service;



    const serviceReviews = reviewsData
    .filter(r => r.serviceId === id)
    .slice(0, 5);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>{title}</Text>

    {/*Categorias listadas*/}
      <View style={styles.categoryContainer}>
        {category.map((cat, index) => (
          <Text key={index} style={styles.categoryChip}>
            {cat}
          </Text>
        ))}
      </View>
    {/*Descripción del servicio*/}
      <Text style={styles.description}>
        {description}
      </Text>

      <View style={styles.separator} />

      {/*Sección de información*/}
      <View style={styles.sectionContainer}>

        <View style={styles.row}>
          <Ionicons name="time-outline" size={28} color="black" />
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Horas requeridas</Text>
            <Text style={styles.infoValue}>{hours} hrs</Text>
          </View>
        </View>
    {/*Ubicación del servicio*/}
        <View style={styles.row}>
          <Ionicons name="location-outline" size={28} color="black" />
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Ubicación</Text>
            <Text style={styles.infoValue}>{location}</Text>
          </View>
        </View>
    {/*Contecto*/}
        <View style={styles.row}>
          <Ionicons name="call-outline" size={28} color="black" />
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Contacto</Text>
            <Text style={styles.infoValue}>{contact}</Text>
          </View>
        </View>
      </View>

      <View style={styles.separator} />

      {/*Tarjeta del proveedor*/}
      <View style={styles.providerCard}>
        <Text style={styles.providerName}>{providerName}</Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={20} color="#FFD700" />
          <Text style={styles.ratingText}>{providerRating}</Text>
        </View>
      </View>


      <Text style={styles.sectionTitle}>Biografía</Text>
      <Text style={styles.bioText}>{providerBio}</Text>


      <View style={styles.separator} />


      <Text style={styles.sectionTitle}>Habilidades</Text>
      <View style={styles.skillsContainer}>
        {providerSkills.map((skill, index) => (
            <Text key={index} style={styles.skillChip}>
            {skill}
            </Text>
        ))}
        </View>

        <View style={styles.separator} />


    
    {/*Sección de reviews*/}
      <Text style={styles.sectionTitle}>Reseñas</Text>
      {/*Si no hay reseñas*/}
        {serviceReviews.length === 0 ? (
        <View style={styles.noReviewsCard}>
            <Ionicons name="chatbubble-ellipses-outline" size={24} color="#888" />
            <Text style={styles.noReviewsText}>Aún no hay reseñas para este usuario</Text>
        </View>
        ) : (
        serviceReviews.map(review => (
            <View key={review.id} style={styles.reviewCard}>
            <Text style={styles.reviewerName}>{review.reviewer}</Text>
            <View style={styles.ratingRow}>
                {Array.from({ length: review.rating }).map((_, i) => (
                <Ionicons key={i} name="star" size={16} color="#FFD700" />
                ))}
            </View>
            <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
        ))
        )}


    </View>
  );
};

export default ServiceInfoItem;


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.darkest,
    marginBottom: 10,
    marginTop: 16,
  },

  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },

  categoryChip: {
    fontSize: 14,
    backgroundColor: colors.yellow,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    color: colors.buttonText,
  },

  description: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 12,
    lineHeight: 22,
  },

  separator: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.05)",
    marginVertical: 20,
  },

  sectionContainer: {
    gap: 22,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  infoBlock: {
    flexDirection: "column",
  },

  infoLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.darkest,
  },

  infoValue: {
    color: colors.primary,
    marginTop: 2,
    fontSize: 15,
    fontWeight: "600",
  },

  providerCard: {
    backgroundColor: colors.lightest,
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },

  providerName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: colors.darkest,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  ratingText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
    color: colors.darkest,
  },

  bioText: {
    fontSize: 15,
    color: colors.text,
    marginTop: 8,
    lineHeight: 22,
    marginBottom: 16,
  },

  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },

  skillChip: {
    fontSize: 14,
    backgroundColor: colors.dark,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    color: colors.lightest,
  },

  reviewCard: {
    backgroundColor: colors.lightest,
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    marginTop: 16,
  },

  reviewerName: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.darkest,
    marginBottom: 4,
  },

  reviewComment: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },

  noReviewsCard: {
    backgroundColor: colors.lightest,
    padding: 14,
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },

  noReviewsText: {
    fontSize: 14,
    color: colors.text,
  },

});
