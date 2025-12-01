import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/theme";

export default function UserInfo({ bio, skills = [] }) {
  return (
    <View style={styles.container}>

      {/* Bio*/}
      <Text style={styles.sectionTitle}>Acerca de mí</Text>
      <View style={styles.bioWrapper}>
        <Ionicons name="information-circle" size={22} color={colors.primary} />
        <Text style={styles.bioText}>{bio || "Sin biografía aún."}</Text>
      </View>

      {/*Habilidades */}
      <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Habilidades</Text>

      <View style={styles.skillsContainer}>
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <View key={index} style={styles.skillTag}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noSkills}>Sin habilidades definidas</Text>
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 6,
  },

  /** Biografía**/
  bioWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  bioText: {
    flex: 1,
    fontSize: 14,
    color: colors.dark,
    lineHeight: 20,
  },

  /** Hbailidades **/
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 8,
  },
  skillTag: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  skillText: {
    fontSize: 14,
    color: colors.lightest,
    fontWeight: "500",
  },
  noSkills: {
    fontSize: 14,
    color: colors.light,
  },
});
