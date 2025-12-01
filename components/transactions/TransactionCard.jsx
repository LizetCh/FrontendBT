import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { api } from "../../api/axiosInstance";
import { colors } from "../../constants/theme";

export default function TransactionCard({ transaction, isPending, onAction }) {
  const [serviceName, setServiceName] = useState("Servicio");
  const [clientName, setClientName] = useState("Cargando...");
  const [clientAvatar, setClientAvatar] = useState(null);

  /** Obtener servicio **/
  const fetchService = async () => {
    try {
      const res = await api.get("/services/");
      const found = res.data.find(s => s._id === transaction.service_id);
      setServiceName(found ? found.title : "Servicio desconocido");
    } catch (error) {
      console.log("Error obteniendo servicio:", error.message);
      setServiceName("Servicio desconocido");
    }
  };

  /** Obtener cliente **/
  const fetchClient = async () => {
    try {
      const res = await api.get(`/users/${transaction.client_id}`);
      setClientName(res.data.user.name);
      setClientAvatar(res.data.user.profile_image_url || null);
    } catch (error) {
      console.log("Error obteniendo cliente:", error.message);
      setClientName("Usuario desconocido");
      setClientAvatar(null);
    }
  };

  useEffect(() => {
    fetchService();
    fetchClient();
  }, []);

  /** Aceptar / Rechazar **/
  const updateTransaction = async (status) => {
    try {
      await api.put(`/transactions/${transaction._id}`, { status_client: status });
      if (onAction) onAction();
    } catch (error) {
      console.log("Error actualizando transacción:", error.message);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>{serviceName}</Text>

      {/* Informaciòn de la persona */}
      <View style={styles.userInfoContainer}>

        {/* Foto de perfil */}
        {clientAvatar ? (
          <Image source={{ uri: clientAvatar }} style={styles.avatar} />
        ) : (
          <Ionicons name="person-circle-outline" size={32} color={colors.primary} />
        )}

        <Text style={styles.userName}>{clientName}</Text>
      </View>

      {/* Info card*/}
      <View style={styles.infoCard}>
        
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={20} color={colors.primary} />
          <Text style={styles.infoText}>{transaction.hours} hrs</Text>
        </View>

        <Text>|</Text>

        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={20} color={colors.primary} />
          <Text style={styles.infoText}>
            {transaction.created_at.split("T")[0]}
          </Text>
        </View>
      </View>

      {/* Botones o estado */}
      {isPending ? (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.reject]}
            onPress={() => updateTransaction("rejected")}
          >
            <Ionicons name="close-circle-outline" size={22} color="white" />
            <Text style={styles.btnText}>Rechazar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.accept]}
            onPress={() => updateTransaction("accepted")}
          >
            <Ionicons name="checkmark-circle-outline" size={22} color="white" />
            <Text style={styles.btnText}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={[
            styles.statusBadge,
            transaction.status_transaction === "completed"
              ? styles.completed
              : styles.cancelled,
          ]}
        >
          <Text style={styles.statusText}>
            {transaction.status_transaction === "completed"
              ? "Transacción completada"
              : "Transacción cancelada"}
          </Text>
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    marginBottom: 14,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.darkest,
    marginBottom: 8,
  },

  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },

  avatar: { 
    width: 32,
    height: 32,
    borderRadius: 16,
  },

  userName: {
    fontSize: 16,
    color: colors.darkest,
    fontWeight: "600",
  },

  infoCard: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.light,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
    gap: 12,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  infoText: {
    fontSize: 14,
    color: colors.darkest,
    fontWeight: "600",
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 6,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },

  btnText: {
    color: "white",
    fontSize: 15,
    marginLeft: 6,
    fontWeight: "600",
  },

  accept: { backgroundColor: "#28a745" },
  reject: { backgroundColor: "#dc3545" },

  statusBadge: {
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },

  statusText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },

  completed: { backgroundColor: "#28a745" },
  cancelled: { backgroundColor: "#dc3545" },
});
