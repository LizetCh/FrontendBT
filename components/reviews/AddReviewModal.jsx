import { colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Modal, TextInput, View } from "react-native";
import { api } from "../../api/axiosInstance";
import { GradientButton, HollowButton } from "../GradientButton";

const AddReviewModal = ({ serviceId, visible, onClose }) => {
  
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  

  const handleSubmitReview = async () => {
    //revisar que todos los campos estén llenos antes de enviar
    if (reviewRating === 0 || reviewText.trim().length === 0) {
      alert("Por favor agrega una calificación y un comentario.");
      return;
    }



    const newReview = {
      service_id: serviceId,
      rating: reviewRating,
      comment: reviewText.trim(),
    };

    console.log("Nueva reseña a enviar:", newReview);

    try {


      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        alert('No se encontró el token de autenticación. Por favor, inicia sesión de nuevo.');
        //mandar a login
        router.push('/login');
        return;
      }

      //hacer POST
      await api.post(
        '/reviews/new',
        newReview,
        {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        }
      );

      

      alert("¡Tu reseña ha sido enviada con éxito!");

      //limipiar campos y cerrar modal
      setReviewRating(0);
      setReviewText('');

      onClose();


    } catch (error) {
      console.log("Error al enviar la reseña:", error.message);
      alert("Hubo un error al enviar tu reseña. Por favor intenta de nuevo.");
    }
  }

  return (
    <Modal 
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
      {/*estrellas*/}
      <View style={styles.starsRow}>
        {[1,2,3,4,5].map((star) => (
          <Ionicons 
            key={star}
            name={star <= reviewRating ? "star" : "star-outline"}
            size={28}
            color="#FFD700"
            onPress={() => setReviewRating(star)}
          />
        ))}
      </View>

    
      {/*input*/}
      <TextInput
        placeholder="Escribe tu reseña..."
        value={reviewText}
        onChangeText={setReviewText}
        style={styles.reviewInput}
        placeholderTextColor={colors.light}
        multiline
      />

      <View style={styles.buttonsContainer}>
    

       <HollowButton
        title="Cancelar"
        style={styles.button}
        onPress={() => {
          onClose();
          setReviewRating(0);
          setReviewText('');
        }}
       />

       <GradientButton 
        title="Enviar reseña"
        style={styles.button}
        onPress={() => {
          if (reviewRating === 0 || reviewText.trim().length === 0) {
            alert("Por favor agrega una calificación y un comentario.");
            return;
          }

          handleSubmitReview();

        }}
       />

      </View>

  </View>
  </View>
  
  

</Modal>
  )
}

export default AddReviewModal;

const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 16,
  },
  modalContent: {
    width: "100%",
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  
  starsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  
  reviewInput: {
    backgroundColor: colors.lightest,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.light,
    padding: 12,
    height: 100,
    textAlignVertical: "top",
    fontSize: 14,
    color: colors.text,
  },

  buttonsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
  }
}