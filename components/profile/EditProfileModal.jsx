import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Image, Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { api } from "../../api/axiosInstance";
import { colors } from "../../constants/theme";

const CLOUD_NAME = "diftcqmcr";
const UPLOAD_PRESET = "DispositivosMov_ProfilePics";

export default function EditProfileModal({ visible, onClose, profile, onUpdated }) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  /*Reinicia los datos del modal */
  useEffect(() => {
    if (visible && profile) {
      setName(profile.name || "");
      setBio(profile.bio || "");
      setSkills(Array.isArray(profile.skills) ? profile.skills.join(", ") : "");
      setImagePreview(profile.profile_image_url || null);
    }
  }, [visible]);

  /* Se sube la imagen a clodinary */
  const uploadToCloudinary = async (uri) => {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", { uri, type: "image/jpeg", name: "profile.jpg" });
      formData.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setUploading(false);
      return data.secure_url;
    } catch (error) {
      setUploading(false);
      alert("Error subiendo imagen");
    }
  };

  /*Obtiene foto de la galeria*/
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const url = await uploadToCloudinary(result.assets[0].uri);
      if (url) setImagePreview(url);
    }
  };

  /*Toma foto con la camara*/
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const url = await uploadToCloudinary(result.assets[0].uri);
      if (url) setImagePreview(url);
    }
  };

  /*Update backend*/
  const handleUpdate = async () => {
    if (!name.trim()) return alert("El nombre no puede estar vacío");

    const token = await AsyncStorage.getItem("authToken");

    try {
      const res = await api.put(
        "/users/update",
        {
          name,
          bio,
          skills: skills.split(",").map((s) => s.trim()),
          profile_image_url: imagePreview,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onUpdated(res.data.user);
      onClose();
    } catch (error) {
      alert("Error al actualizar: " + error.message);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <View style={styles.modal}>

            <Text style={styles.title}>Editar Perfil</Text>

            {/* FOTO */}
            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: imagePreview || profile?.profile_image_url }}
                style={styles.avatar}
              />
              <Text style={styles.changePhotoText}>Cambiar foto</Text>

              <View style={styles.photoButtons}>
                <TouchableOpacity style={styles.photoBtn} onPress={takePhoto}>
                  <Text style={styles.photoBtnText}>📷 Cámara</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.photoBtn} onPress={pickImage}>
                  <Text style={styles.photoBtnText}>🖼️ Galería</Text>
                </TouchableOpacity>
              </View>
            </View>


            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="Escribe tu nombre"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Biografía</Text>
            <TextInput
              style={[styles.input, { height: 70 }]}
              multiline
              placeholder="Cuéntanos sobre ti"
              value={bio}
              onChangeText={setBio}
            />

            <Text style={styles.label}>Skills (separadas por comas)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: carpintería, guitarra, plomería"
              value={skills}
              onChangeText={setSkills}
            />

            <TouchableOpacity style={styles.saveBtn} onPress={handleUpdate} disabled={uploading}>
              <Text style={styles.saveText}>
                {uploading ? "Subiendo imagen..." : "Guardar cambios"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose}>
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
    marginHorizontal: 20,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    maxHeight: "90%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  avatarWrapper: {
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 115,
    height: 115,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  changePhotoText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.primary,
    fontWeight: "600",
  },
  photoButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  photoBtn: {
    backgroundColor: colors.lightest,
    padding: 8,
    borderRadius: 8,
  },
  photoBtnText: { color: colors.dark },
  label: { marginTop: 10, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginTop: 4,
  },
  saveBtn: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
  },
  saveText: { textAlign: "center", color: "white", fontWeight: "600" },
  cancelText: {
    textAlign: "center",
    marginTop: 12,
    color: colors.primary,
    fontWeight: "600",
  },
});
