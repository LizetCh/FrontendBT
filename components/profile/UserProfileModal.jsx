import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../../api/axiosInstance";
import { colors } from "../../constants/theme";

import ProfileTabs from "./ProfileTabs";
import UserInfo from "./UserInfo";
import UserRating from "./UserRating";

export default function UserProfileModal({ visible, onClose, userId }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // FETCH = Solicitud HTTP al backend para obtener datos del usuario
  const fetchProfile = async () => {
    try {
      const res = await api.get(`/users/${userId}`);
      setProfile(res.data.user);
    } catch (error) {
      console.log("Error cargando perfil de usuario:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible && userId) {
      setLoading(true);
      fetchProfile();
    }
  }, [visible, userId]);

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.modalContainer}>

          {/* ❌ Botón de cierre fijo con área táctil amplia */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close-outline" size={34} color={colors.primary} />
          </TouchableOpacity>

          {loading && (
            <Text style={styles.loadingText}>Cargando perfil...</Text>
          )}

          {!loading && profile && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >

              {/* FOTO DE PERFIL */}
              <View style={styles.avatarWrapper}>
                <Image
                  source={{
                    uri:
                      profile.profile_image_url ||
                      "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
                  }}
                  style={styles.avatar}
                />
              </View>

              {/* NOMBRE */}
              <Text style={styles.userName}>{profile.name}</Text>

              {/* ESTRELLAS Y PROMEDIO */}
              <View style={{ marginTop: 6 }}>
                <UserRating
                  avg={profile.rating_avg}
                  count={profile.rating_count}
                />
              </View>

              {/* BIO + SKILLS */}
              <UserInfo bio={profile.bio} skills={profile.skills} />

              {/* TABS */}
              <View style={{ marginTop: 10 }}>
                <ProfileTabs userId={profile._id} />
              </View>

            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  modalContainer: {
    flex: 1,
    paddingHorizontal: 22,
    backgroundColor: colors.background,
  },

  /** 🔥 X fija arriba, siempre clickeable */
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    padding: 12,      // gran área táctil
    zIndex: 9999,     // siempre al frente
  },

  loadingText: {
    marginTop: 50,
    textAlign: "center",
    fontSize: 18,
    color: colors.primary,
  },

  /** Espacio extra para que la X no se empalme */
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 50,
  },

  avatarWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: colors.primary,
  },

  userName: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "700",
    marginTop: 6,
    marginBottom: 2,
    color: colors.darkest,
  },
});
