import { colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput, View } from "react-native";
import { GradientButton, HollowButton } from "../GradientButton";

const AddReviewModal = () => {
  
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");



  return (
    <View style={styles.addReviewModal}>

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
        multiline
      />

      <View style={styles.buttonsContainer}>
    

       <HollowButton
        title="Cancelar"
        style={styles.button}
        onPress={() => {
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

          //falta conectar con el back para enviar reseña


          setReviewRating(0);
          setReviewText('');
        }}
       />

  </View>
  
  

</View>
  )
}

export default AddReviewModal;

const styles = {
  addReviewModal: {
    backgroundColor: colors.lightest,
    padding: 16,
    borderRadius: 14,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
    gap: 12,
  },
  
  starsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  
  reviewInput: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",
    padding: 12,
    height: 100,
    textAlignVertical: "top",
    fontSize: 14,
    color: colors.darkest,
  },

  buttonsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
  }
}