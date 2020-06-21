import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, StatusBar, SafeAreaView, FlatList, TouchableOpacity, View } from 'react-native';

import api from './services/api'

export default function App() {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        api.get('projects').then(res => {
            console.log(res.data)
            setProjects(res.data)
        })
    },[])

    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `New Project ${Date.now()}`,
            owner: 'Leo'
        })

        console.log(response)

        const project = response.data

        setProjects([...projects, project])
    }


  return (
    <>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={styles.container}>
        <FlatList
            data={projects}
            keyExtractor={project => project.id}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.title}>{item.title}</Text>
              </View>
            )}
        >
        </FlatList>

        <TouchableOpacity 
            onPress={handleAddProject} 
            activeOpacity={0.6} 
            style={styles.button}
        >
            <Text >Adicionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  button: {
      backgroundColor: '#fff',
      alignSelf: 'stretch',
      margin: 20,
      height: 50,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
  },
  buttonText: {
      fontWeight: 'bold',
      fontSize: 16,
  }
});
