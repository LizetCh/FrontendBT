import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/theme";
import UserReviewsList from "../reviews/UserReviewsList";
import UserServicesList from "../services/UserServicesList";

export default function ProfileTabs({ userId, onServicePress }) {
  const [activeTab, setActiveTab] = useState("services");

  return (
    <View style={styles.container}>
      
      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "services" && styles.activeTab]}
          onPress={() => setActiveTab("services")}
        >
          <Text style={[styles.tabText, activeTab === "services" && styles.activeText]}>
            Servicios
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === "reviews" && styles.activeTab]}
          onPress={() => setActiveTab("reviews")}
        >
          <Text style={[styles.tabText, activeTab === "reviews" && styles.activeText]}>
            Reseñas
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contenido */}
      <View style={{ flex: 1, marginTop: 12 }}>
        {activeTab === "services" ? (
          <UserServicesList userId={userId} onServicePress={onServicePress} />
        ) : (
          <UserReviewsList userId={userId} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  tabBar: {
    flexDirection: "row",
    backgroundColor: colors.lightest,
    borderRadius: 25,
    padding: 6,
    marginTop: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: colors.darkest,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.dark,
  },
  activeText: {
    color: "#FFFFFF",
  },
});
