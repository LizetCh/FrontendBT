import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { api } from "../../api/axiosInstance";
import { colors } from "../../constants/theme";

export default function TransactionCard({ transaction, isPending, onAction }) {
  const [serviceName, setServiceName] = useState("Servicio");
  const [clientName, setClientName] = useState("Cargando...");

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
    } catch (error) {
      console.log("Error obteniendo cliente:", error.message);
      setClientName("Usuario desconocido");
    }
  };

  useEffect(() => {
    fetchService();
    fetchClient();
  }, []);

  /** Acción aceptar/rechazar **/
  const updateTransaction = async (status) => {
    try {
      await api.put(`/transactions/${transaction._id}`, { status_client: status });
      if (onAction) onAction(); 
    } catch (error) {
      console.log("Error actualizando transacción:", error.message);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.serviceName}>{serviceName}</Text>
      <Text style={styles.clientText}>Solicitado por: {clientName}</Text>
      <Text style={styles.hours}>⏱ {transaction.hours} horas</Text>
      <Text style={styles.hours}>Fecha: {transaction.created_at.split("T")[0]}</Text>

      {/* Estado final */}
      {!isPending && (
        <Text
          style={[
            styles.status,
            transaction.status_transaction === "completed"
              ? styles.completed
              : styles.cancelled,
          ]}
        >
          {transaction.status_transaction === "completed"
            ? "Transacción completada"
            : "Transacción cancelada"}
        </Text>
      )}

      {/* Botones SOLO si es transacción pendiente del cliente */}
      {isPending && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, styles.reject]}
            onPress={() => updateTransaction("rejected")}
          >
            <Ionicons name="close-circle-outline" size={20} color="white" />
            <Text style={styles.btnText}>Rechazar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.accept]}
            onPress={() => updateTransaction("accepted")}
          >
            <Ionicons name="checkmark-circle-outline" size={20} color="white" />
            <Text style={styles.btnText}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: "#00000010",
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 4,
  },
  clientText: {
    fontSize: 15,
    color: "#333",
    marginBottom: 4,
  },
  hours: {
    fontSize: 14,
    color: "#777",
    marginBottom: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  btnText: {
    color: "white",
    fontSize: 15,
    marginLeft: 6,
    fontWeight: "600",
  },
  accept: {
    backgroundColor: "#28a745",
  },
  reject: {
    backgroundColor: "#dc3545",
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
    paddingVertical: 6,
    borderRadius: 8,
  },
  completed: {
    color: "white",
    backgroundColor: "#28a745",
  },
  cancelled: {
    color: "white",
    backgroundColor: "#dc3545",
  },
});
