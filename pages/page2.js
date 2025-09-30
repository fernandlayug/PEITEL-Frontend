// import React from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';

// export default function Page2({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to Page 2 🎉</Text>
//       <Button title="Go back to Page 1" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 22,
//     marginBottom: 20,
//   },
// });


import React from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import axios from "axios";

export default function Page2({ route, navigation }) {
  const { formData } = route.params;

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/registration/api/register/",
        formData
      );
      Alert.alert("Success", "User registered successfully!");
      console.log(response.data);
      navigation.goBack(); // go back to Page1 after submit
    } catch (error) {
      console.error(error.response?.data || error.message);
      Alert.alert("Error", JSON.stringify(error.response?.data || "Something went wrong"));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review Your Details</Text>

      <Text>First Name: {formData.first_name}</Text>
      <Text>Last Name: {formData.last_name}</Text>
      <Text>Email: {formData.email}</Text>
      <Text>Password: {formData.password}</Text>
      <Text>Gender: {formData.gender}</Text>

      <View style={{ marginTop: 20 }}>
        <Button title="Submit" onPress={handleSubmit} />
      </View>

      <View style={{ marginTop: 10 }}>
        <Button title="Go back to Edit" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold",
  },
});
