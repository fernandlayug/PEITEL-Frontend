// pages/EditUserPage.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";

export default function EditUserPage({ route, navigation }) {
  // Get user data passed from UserListPage
  const { user } = route.params;

  // Initialize editable fields
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [gender, setGender] = useState(user.gender);

  const handleUpdate = () => {
    if (!firstName || !lastName || !email) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    axios
      .put(`https://peitelbackend.onrender.com/registration/api/users/${user.id}/`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        gender: gender,
      })
      .then(() => {
        Alert.alert("Success", "User updated successfully!");
        navigation.goBack(); // Return to the list
        // navigation.navigate("UserListPage", { updated: true });
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error", "Failed to update user.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit User</Text>

      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
      />

      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        value={gender}
        onChangeText={setGender}
        placeholder="Gender"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  saveButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "#6c757d",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
