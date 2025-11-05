// pages/UserListPage.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert, Button
} from "react-native";
import axios from "axios";


export default function UserListPage({navigation}) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axios.get("http://127.0.0.1:8000/registration/api/users/") // Django endpoint
  //     .then((res) => {
  //       setUsers(res.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       setLoading(false);
  //     });
  // }, []);

  

// useEffect(() => {
//   fetchUsers(); // just call the reusable function
// }, []);

useEffect(() => {
  fetchUsers(); // just call the reusable function

  // Add this small block to refresh when coming back from Edit page
  const unsubscribe = navigation.addListener("focus", () => {
    fetchUsers();
  });

  return unsubscribe; // Clean up the listener when leaving
}, [navigation]);



const fetchUsers = () => {
  axios
    .get("https://peitelbackend.onrender.com/registration/api/users/")
    .then((res) => {
      setUsers(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
};

 const handleDelete = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this user?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            axios
              .delete(`https://peitelbackend.onrender.com/registration/api/users/${id}/`)
              .then(() => {
                Alert.alert("Success", "User deleted successfully");
                fetchUsers(); // refresh list
              })
              .catch((err) => {
                console.error(err);
                Alert.alert("Error", "Failed to delete user");
              });
          },
        },
      ]
    );
  };

  const handleEdit = (user) => {
    // Navigate to an Edit page, passing the user data
    // Requires you to have something like navigation.navigate('EditUserPage', { user })
    navigation.navigate("EditUser", { user });
  };



  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading users...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registered Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>
              {item.first_name} {item.last_name}
            </Text>
            <Text>Email: {item.email}</Text>
            <Text>Gender: {item.gender}</Text>
                    <View style={styles.buttonContainer}>
              {/* <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={() => handleEdit(item)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity> */}

              <Button
                  title="Edit"
                  color="#4CAF50" // green example color
                  onPress={() => handleEdit(item)}
                />

                <Button
                  title="Delete"
                  color="#F44336" // red example color
                  onPress={() => handleDelete(item.id)}
                />

            </View>
          </View>
        )}
      />
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
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
    buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: "#007bff",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
