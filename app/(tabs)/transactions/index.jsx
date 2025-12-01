import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../../../api/axiosInstance";
import TransactionCard from "../../../components/transactions/TransactionCard";
import { colors } from "../../../constants/theme";

export default function TransactionsScreen() {
  const [pendingTransactions, setPendingTransactions] = useState([]);
  const [historyTransactions, setHistoryTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("authToken");
      const currentUserId = await AsyncStorage.getItem("authUserId");

      if (!token || !currentUserId) {
        setPendingTransactions([]);
        setHistoryTransactions([]);
        return;
      }

      const res = await api.get("/transactions/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const allTransactions = res.data;

      /*console.log("=== USER TRANSACTIONS DEBUG ===");
      console.log("currentUserId:", currentUserId);
      console.log("all transactions:", all.length);*/

      // Filtrar transacciones pendientes para este usuario
      const pendingTransactionsList = allTransactions.filter((transaction) =>
        transaction.status_transaction === "pending" &&
        (transaction.client_id === currentUserId || transaction.supplier_id === currentUserId)
      );

      // Filtrar historial
      const historyTransactionsList = allTransactions.filter((transaction) =>
        ["completed", "cancelled"].includes(transaction.status_transaction)
      );

      setPendingTransactions(pendingTransactionsList);
      setHistoryTransactions(historyTransactionsList);
    } catch (error) {
      console.log("Error obteniendo transacciones:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color={colors.primary} />
        </TouchableOpacity>

        <Text style={styles.titulo}>Mis transacciones</Text>
        <View style={styles.separator} />

        {loading ? (
          <Text style={styles.loadingText}>Cargando transacciones...</Text>
        ) : (
          <ScrollView>
            <Text style={styles.sectionTitle}>Pendientes</Text>

            {pendingTransactions.length === 0 ? (
              <Text style={styles.emptyText}>No hay transacciones pendientes</Text>
            ) : (
              pendingTransactions.map((tx) => (
                <TransactionCard
                  key={tx._id}
                  transaction={tx}
                  isPending
                  onAction={fetchTransactions}
                />
              ))
            )}

            <Text style={styles.sectionTitle}>Historial</Text>
            {historyTransactions.length === 0 ? (
              <Text style={styles.emptyText}>No hay transacciones finalizadas</Text>
            ) : (
              historyTransactions.map((tx) => (
                <TransactionCard key={tx._id} transaction={tx} />
              ))
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 16, 
    backgroundColor: colors.background 
  },
  backButton: { 
    position: "absolute", 
    left: 16, 
    top: 10, 
    zIndex: 10 
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 16,
    color: colors.primary,
    textAlign: "center",
    marginTop: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#00000015",
    marginBottom: 0,
    borderRadius: 0.5,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: colors.primary,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: colors.dark,
  },
  emptyText: { fontSize: 16, color: "#777", marginBottom: 10 },
});
