import { colors } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Alert, Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { api } from "../../api/axiosInstance";

export default function CreateTransactionModal({
  visible,
  onClose,
  serviceId,
  serviceName,
  serviceLocation,
  providerName,
  clientName,
  clientId,      
  providerId   
}) {
  const [hours, setHours] = useState("");

  const createTransaction = async () => {
    try {
      /*console.log("Datos transaction");
      console.log("serviceId:", serviceId);
      console.log("clientId :", clientId);
      console.log("supplierId:", providerId);
      console.log("hours:", hours);*/

      // Validación para evitar transacción contigo mismo
      if (String(clientId) === String(providerId)) {
        Alert.alert(
          "Acción no permitida",
          "No puedes crear una transacción contigo mismo"
        );
        return;
      }

      const token = await AsyncStorage.getItem("authToken");

      if (!token) {
        console.log("No hay token almacenado, el usuario no está autenticado");
        return;
      }

      const payload = {
        service_id: serviceId,
        client_id: clientId,
        supplier_id: providerId, 
        hours: Number(hours)
      };

      const res = await api.post("/transactions/create", payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Transacción creada:", res.data);
      Alert.alert(
          "¡Transacción creada!",
          "Revisa Mis transacciones"
        );
      setHours("");
      onClose();

    } catch (error) {
      console.log(
        "Error creando transacción:",
        error.response?.data || error.message
      );
      Alert.alert(
          "¡Hubo un error!",
          "Ocurrió un error al crear la transacción"
        );
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.title}>Crear transacción</Text>

            <Text style={styles.label}>Servicio</Text>
            <TextInput style={styles.input} value={serviceName} editable={false} />

            <Text style={styles.label}>Proveedor</Text>
            <TextInput style={styles.input} value={providerName} editable={false} />

            <Text style={styles.label}>Cliente</Text>
            <TextInput style={styles.input} value={clientName} editable={false} />

            <Text style={styles.label}>Ubicación</Text>
            <TextInput style={styles.input} value={serviceLocation} editable={false} />

            <Text style={styles.label}>Horas a registrar</Text>
            <TextInput
              style={styles.input}
              value={hours}
              onChangeText={setHours}
              keyboardType="numeric"
              placeholder="Ej: 2"
            />

            <TouchableOpacity style={styles.createBtn} onPress={createTransaction}>
              <Text style={styles.btnText}>Crear transacción</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modal: {
    margin: 20,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
  },
  title: { 
    fontSize: 24, 
    fontWeight: "700", 
    color: colors.primary, 
    marginBottom: 16 
  },
  label: { 
    marginTop: 10, 
    fontWeight: "600", 
    color: colors.darkest 
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    padding: 10,
    borderRadius: 10,
    marginTop: 4,
  },
  createBtn: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 10,
    marginTop: 18,
  },
  btnText: { color: "white", textAlign: "center", fontWeight: "700" },
  cancelBtn: { marginTop: 10 },
  cancelText: { textAlign: "center", color: colors.primary },
});
