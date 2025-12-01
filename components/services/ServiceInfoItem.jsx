import { colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { api } from "../../api/axiosInstance";
import { GradientButton } from "../GradientButton";
import AddReviewModal from "../reviews/AddReviewModal";
import ReviewsList from "../reviews/ReviewsList";


const ServiceInfoItem =  ({ service }) => {

  //estado para el modal de agregar reseña
  const [isAddReviewModalVisible, setAddReviewModalVisible] = useState(false);
  const [reviews, setReviews] = useState([]);

  
  const fetchReviews = async () => {
    try {
      const res = await api.get(`/reviews/service/${service._id}`);
      setReviews(res.data);
      console.log("Reseñas obtenidas:", res.data);
    } catch (error) {
      console.log("Hubo un error al obtener las reseñas:", error.message);
    }
  };

  useEffect(() => {
    fetchReviews();
  });

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
    categories = [],
    hours = "",
    location = "",
    contact = "No disponible",
    owner_name = "Usuario",
    providerRating = 0,
    id
    } = service;

    

    


    

  return (
    <View style={styles.container}>

     {/*Categorias listadas*/}
      <View style={styles.categoriesContainer}>
        {categories.map((cat, index) => (
          <Text key={index} style={styles.categoryChip}>
            {cat}
          </Text>
        ))}
      </View>

      {/*Título del servicio*/}
      <Text style={styles.title}>{title}</Text>

      {/*Información del proveedor*/}
      <View style={styles.userInfoContainer} >
        <View style={styles.userImageContainer}>
          {/*default user image*/}
          <Image source={require('@/assets/images/user-default-img.jpg')}  style={styles.userImage}/> 
        </View>
      <Text>{owner_name}</Text>
      <View style={styles.ratingRow}>
          <Ionicons name="star" size={20} color="#FFD700" />
          <Text style={styles.ratingText}>{providerRating}</Text>
        </View>
      </View>

      {/* Información del servicio */}
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={20} color={colors.primary} />
          <Text style={styles.infoText}>{contact}</Text>
        </View>

        <Text>|</Text>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={20} color={colors.primary} />
          <Text style={styles.infoText}>{location}</Text>
        </View>

        <Text>|</Text>

        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={20} color={colors.primary} />
          <Text style={styles.infoText}>{hours} hrs</Text>
        </View>
      </View>


      {/*Descripción del servicio*/}
      <Text style={styles.descriptionCard}>
        {description}
      </Text>

      <GradientButton 
        onPress={() => {}}
        title='Crear transacción'
      />

      <View style={styles.separator} />

      <AddReviewModal 
        serviceId={service._id}
        visible={isAddReviewModalVisible}
        //refrescar reseñas al cerrar, usando fetchReviews
        onClose={() => {
          setAddReviewModalVisible(false);
          fetchReviews();
        }}
      />

    
      {/*Sección de reviews*/}
      <View style={styles.reviewsHeader}>
        <Text style={styles.sectionTitle}>Reseñas</Text>
        {/*Escribir reseña con icono*/}
        <TouchableOpacity style={styles.writeReviewContainer}
          onPress={() => {
            //abrir modal para agregar reseña
            setAddReviewModalVisible(true);
            
          }}
        >
          <Ionicons name="create-outline" size={24} color={colors.primary} />
          <Text style={styles.writeReviewText}>Escribir reseña</Text>
        </TouchableOpacity>
      </View>


      {/*Si no hay reseñas*/}
      {reviews.length === 0 ? (
        <View style={styles.noReviewsCard}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#888" />
          <Text style={styles.noReviewsText}>Aún no hay reseñas para este usuario</Text>
        </View>
      ) : (
        <ReviewsList reviews={reviews} />
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
  },

  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
    marginTop: 6,
  },

  categoryChip: {
    fontSize: 14,
    backgroundColor: colors.yellow,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    color: colors.buttonText,
  },

  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
    justifyContent: "flex-start",
  },
  userImageContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden'
  },
  userImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  infoContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "space-around",
    
  },

infoCard: {
  padding: 16,
  borderRadius: 16,
  borderWidth: 1,
  borderColor: colors.light,
  gap: 14,
  flexDirection: "row",
  marginBottom: 10,
  //avoid overflow
    flexWrap: "wrap",
},

infoRow: {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
},

infoText: {
  fontSize: 15,
  color: colors.darkest,
  fontWeight: "600",
},

separatorLine: {
  height: 1,
  backgroundColor: "rgba(0,0,0,0.06)",
},


  descriptionCard: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 12,
    lineHeight: 22,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
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

  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 12,
  },

  writeReviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  
  writeReviewText: {
    fontSize: 16,
    color: colors.primary
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.darkest,
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





