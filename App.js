// import React from 'react'
// import {View, Text, Button, Image, ScrollView} from 'react-native'

// export default function App(){
//   return(
//     <View style={{padding: 20, background: '#f2f2f2', justifyContent:'center', alignItems:'center', flex:1}}>
//       <Image
//   source={{ uri: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d' }}
//   style={{ width: 120, height: 120, borderRadius: 8 }}
// />
// <Text>Hello World</Text>
//       <Button title="Tap me" onPress={() => alert('Button pressed!')} />

//     </View>
//   );
// }

import { View, Text, StyleSheet, Image, Button, ScrollView } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello BSIT Students!</Text>
      <Button title="Click Me" onPress={() => alert('Button Clicked!')} />
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d' }}
        style={{ width: 120, height: 120, borderRadius: 8, marginTop: 20 }}
      />
      <ScrollView style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 16, color: '#333' }}>
          This is a simple React Native application demonstrating basic components like View, Text, Button, and Image. 
          You can tap the button to see an alert, and the image is loaded from an external URL.
        </Text>
      </ScrollView>
      <Text style={{ marginTop: 20, fontSize: 18, color: '#333' }}>
        Enjoy coding with React Native!
      </Text>
      <Text style={{ marginTop: 10, fontSize: 16, color: '#555' }}>
        This app is designed to be simple and educational for BSIT students.
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: '#4ade80',   // green background
    justifyContent: 'center',     // center content vertically
    alignItems: 'center',         // center content horizontally
    borderRadius: 10,
    flex:1
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});