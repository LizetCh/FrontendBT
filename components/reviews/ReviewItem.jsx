
import { colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { api } from "../../api/axiosInstance";
const ReviewItem = ({ review }) => {

  
  const [userAvatar, setUserAvatar] = useState(null);

  //valores default
  
  
  const {
    owner_name = "Usuario",
    rating = 0,
    comment = "",
  } = review;

  const fetchUserAvatar = async () => {
    try {
      const res = await api.get(`/users/${review.user_id}`);
      setUserAvatar(res.data.user.profile_image_url || null);
    } catch (error) {
      console.log("Error loading avatar:", error);
    }
  };

  useEffect(() => {
    fetchUserAvatar();
  }, []);

  if (!review) {
    return null;
  }

  return (
    <View style={styles.reviewCard}>
      <View style={{flexDirection: "row", gap:8, alignItems: "center", justifyContent: "space-between", marginBottom: 8}}>

        <View style={{flexDirection: "row", alignItems: "center", gap: 8}}>
          <View style={styles.userImageContainer}>
          {/*default user image*/}
          <Image 
          source={userAvatar ? { uri: userAvatar } : require('@/assets/images/user-default-img.jpg')}  style={styles.userImage}/>
        </View>
          <Text style={styles.reviewerName}>{owner_name}</Text>
          
        </View>

        <View style={styles.ratingRow}>
          {Array.from({ length: rating }).map((_, i) => (
            <Ionicons key={i} name="star" size={16} color="#FFD700" />
          ))} 
            <Text style={{marginLeft: 4, color: colors.primary}}>{rating}</Text>
        </View>
        
        
      </View>
      
      <Text style={styles.reviewComment}>{comment}</Text>
    </View>
  );
}
export default ReviewItem;

const styles = StyleSheet.create({
  reviewCard: {
    backgroundColor: colors.lightest,
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },

  reviewerName: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.darkest,
    marginBottom: 4,
  },

  userImageContainer: {
      width: 30,
      height: 30,
      borderRadius: 20,
      overflow: 'hidden',
      marginBottom: 4,
    },
  userImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  reviewComment: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    paddingHorizontal: 4,
  },
  ratingRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
});
