import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const loginScreen = () => {

  return (
    <View style = {styles.container}   >
    
      <Text style={styles.titulo}>Banco de Tiempo</Text>
      <input type="text" placeholder="Enter text here" />
      <TouchableOpacity
        style={styles.buton}
       onPress={()=>router.push('./notes')}
      >
        <Text style={{color:'white', fontSize:18,}}>Miua</Text>
      </TouchableOpacity>
    </View>
  );

}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
