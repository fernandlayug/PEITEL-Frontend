import React, { useState } from "react";
import { View, Text, Alert, Button, TextInput } from "react-native";
import axios from "axios";
import styles from "./styles";

export default function UpdateUser(){
const[userId, setUserId] = useState('');
const[firstName, setFirstName] = useState('');
const[updatedUser, setUpdatedUser] = useState('');


const handleUpdateUser = () => {
  if (!userId || !firstName){
    Alert.alert('Validation', "Please enter user ID the firstname.");
    return;
  }
  axios.patch('https://dummyjson.com/users/${userId}', 
  {firstName,
   })
  .then((response)=> {
    Alert.alert('Success', 'User #${userId} updated!');
    console.log('Response from you BACKEND: ', response.data);

    setUpdatedUser(response.data)
    setUserId('');
    setFirstName('');
  })

.catch((error) => {
  console.error(error);
  Alert.alert('Error', "Failed to update user");
});
};

return (
  <View style={styles.container}>
  <Text>Update User</Text>

  <TextInput style={styles.input}
  placeholder="please enter user ID"
  value={userId}
  onChangeText={setUserId}
  keyboardType="numeric"/>

    <TextInput style={styles.input}
  placeholder="Enter your firstname"
  value={firstName}
  onChangeText={setFirstName}/>
  
  <Button title="Update User" onPress={handleUpdateUser}/>
  {updatedUser && (
    <View>
    <Text>User Updated</Text>
    <Text>ID: {updatedUser.id}</Text>
    <Text>ID: {updatedUser.firstName}</Text>
    </View>
  )}
  
  </View>
)

}