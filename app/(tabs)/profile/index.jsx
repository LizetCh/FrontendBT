import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api } from '../../../api/axiosInstance';
import EditProfileModal from "../../../components/profile/EditProfileModal";
import ProfileTabs from "../../../components/profile/ProfileTabs";
import UserInfo from "../../../components/profile/UserInfo";
import UserRating from "../../../components/profile/UserRating";
import { colors } from '../../../constants/theme';


const ProfileScreen = () => {

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

   //fetch profile
  const fetchProfileUser = async () => {
      try {
        const res = await api.get("/users");
        setProfileUser(res.data);
        console.log("Perfil obtenido:", res.data);
      } catch (error) {
        console.log("Hubo un error al obtener el perfil:", error.message);
      }
  };

  // Obtener perfil desde backend
  useEffect(() => {
    const checkOwner = async () => {
      const storedId = await AsyncStorage.getItem("authUserId");
      if (profile && storedId === profile._id) setIsOwner(true);
    };
    checkOwner();
  }, [profile]);

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        setLoading(false);
        return;
      }
      const res = await api.get("/users/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data.user);
    } catch (error) {
      console.log("Hubo un error al obtener el perfil:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProfile(); }, []);

  {/*Logout */}
  const handleLogout = async () => {
  try {
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("authUserId");
      router.replace("/"); 
    } catch (err) {
      alert("Error al cerrar sesión");
    }
  };



    return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>

        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color={colors.primary} />
        </TouchableOpacity>

        <Text style={styles.titulo}>Mi Perfil</Text>
        <View style={styles.separator} />

        {loading && (
          <Text style={styles.Text}>
            Cargando Perfil...
          </Text>
        )}


        {!loading && !profile && (
          <Text style={styles.Text}>
            No se encontró el perfil...
          </Text>
        )}

    
        <ScrollView showsVerticalScrollIndicator={false}>
        {/*Horas disponibles y cerrar sesiòn */}
        {profile && (
            <View style={styles.topRow}>
              <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.logoutText}>Cerrar sesión</Text>
              </TouchableOpacity>

              <Text style={styles.hoursValue}>{profile.hours_balance}h disponibles</Text>
            </View>
          )}
        
        {/*Foto de perfil */}
        {!loading && profile && (
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: profile.profile_image_url }}
              style={styles.avatar}
            />
          </View>
        
        )}

        {/*Nombre de usuario*/}
        {!loading && profile && (
          <Text style={styles.UserName}>
            {profile.name}
          </Text>
        )}

        {/*Estrellas y puntuación*/}
        {!loading && profile && (
          <UserRating
            avg={profile.rating_avg}
            count={profile.rating_count}
          />
        )}

        {/* Botón para editar */}
          {isOwner && (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setEditModalVisible(true)}
            >
              <Ionicons name="create-outline" size={22} color="white" />
              <Text style={styles.editButtonText}>Editar Perfil</Text>
            </TouchableOpacity>
          )}

        {/*Biografia y skills*/}
        {profile && (
          <>
            <UserInfo bio={profile.bio} skills={profile.skills} />
          </>
        )}


        {/*Tabs de servicios y reseñas*/}
        {profile && <ProfileTabs userId={profile._id} />}


        </ScrollView>
        

      </View>
      {isOwner && (
  <EditProfileModal
    visible={editModalVisible}
    onClose={() => setEditModalVisible(false)}
    profile={profile}
    onUpdated={(updatedUser) => setProfile(updatedUser)}
  />
)}
    </SafeAreaView>
  );

}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: 10,
    zIndex: 10,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.dark,
    textAlign:'center'

  },
  separator: {
    height: 1,
    backgroundColor: "#00000015",
    marginBottom: 0,
    borderRadius: 0.5
  },
  UserName:{
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.dark,
    textAlign:'center'
  },

  //Estilos de la foto de perfil
  avatarWrapper: {
  justifyContent: "center",
  alignItems: "center",
  marginTop: 5,
  marginBottom: 5,
},

avatar: {
  width: 140,
  height: 140,
  borderRadius: 70,
  borderWidth: 3,
  borderColor: colors.primary,
  backgroundColor: "#eee",
},
Text: {
  fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 6
},

editButton: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: colors.dark,
  padding: 12,
  borderRadius: 10,
  marginVertical: 14
},
editButtonText: {
  color: "white",
  fontSize: 16,
  marginLeft: 6,
  fontWeight: "600",

},
hoursWrapper: {
  alignItems: "flex-end",
  marginTop: 6,
  marginBottom: 5,
  paddingRight: 6,
},

hoursValue: {
  fontSize: 14,
  fontWeight: "500",
  color: colors.primary,
  opacity: 0.8,
},
topRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 6,
  marginBottom: 5,
  paddingHorizontal: 6,
},

logoutText: {
  color: "#b00020",
  opacity: 0.75,
  fontSize: 14,
  fontWeight: "500",
},



})