import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { api } from "../../api/axiosInstance";
import { colors } from "../../constants/theme";

export default function TransactionCard({ transaction, isPending, onAction }) {
  const [serviceName, setServiceName] = useState("Servicio");
  const [clientName, setClientName] = useState("Cargando...");
  const [clientAvatar, setClientAvatar] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  /** Obtener usuario actual **/
  useEffect(() => {
    AsyncStorage.getItem("authUserId").then((id) => setCurrentUser(id));
  }, []);

  const isClient = String(currentUser) === String(transaction.client_id);
  const isProvider = String(currentUser) === String(transaction.supplier_id);

  /** Obtener servicio **/
  const fetchService = async () => {
    try {
      const res = await api.get("/services/");
      const found = res.data.find((s) => s._id === transaction.service_id);
      setServiceName(found ? found.title : "Servicio desconocido");
    } catch (error) {
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
      setClientName("Usuario desconocido");
      setClientAvatar(null);
    }
  };

  useEffect(() => {
    fetchService();
    fetchClient();
  }, []);

  /** Espera por respuesta de los usuarios**/
  const waitingForSupplier =
    transaction.status_client !== "pending" && transaction.status_supplier === "pending";
  const waitingForClient =
    transaction.status_supplier !== "pending" && transaction.status_client === "pending";

  const showWaitingMessage =
    (isClient && waitingForSupplier)
      ? "Esperando respuesta del proveedor"
      : (isProvider && waitingForClient)
      ? "Esperando respuesta del cliente"
      : null;

  /** Aceptar / Rechazar **/
  const updateTransaction = async (status) => {
    try {
      const payload = isClient
        ? { status_client: status }
        : { status_supplier: status };

      const token = await AsyncStorage.getItem("authToken");
      await api.put(`/transactions/${transaction._id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (onAction) onAction();
    } catch (error) {
      console.log("Error actualizando transacción:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Nombre del servicio */}
      <Text style={styles.title}>{serviceName}</Text>

      {/* Info del cliente */}
      <View style={styles.userInfoContainer}>
        {clientAvatar ? (
          <Image source={{ uri: clientAvatar }} style={styles.avatar} />
        ) : (
          <Ionicons
            name="person-circle-outline"
            size={32}
            color={colors.primary}
          />
        )}
        <Text style={styles.userName}>{clientName}</Text>
      </View>

      {/* Info card */}
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

      {/* Botones / Mensaje / Estado */}
      {isPending ? (
        showWaitingMessage ? (
          <Text style={styles.waitingText}>{showWaitingMessage}</Text>
        ) : (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.reject]}
              onPress={() => updateTransaction("rejected")}
            >
              <Ionicons
                name="close-circle-outline"
                size={22}
                color="white"
              />
              <Text style={styles.btnText}>Rechazar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.accept]}
              onPress={() => updateTransaction("accepted")}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={22}
                color="white"
              />
              <Text style={styles.btnText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        )
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

  waitingText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 6,
    fontWeight: "700",
    color: colors.primary,
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
