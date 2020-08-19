import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';

import ModalProjects from './components/Modal/ModalProjects';

import api from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    api.get('projects').then(res => {
      console.log(res.data);
      setProjects(res.data);
    });
  }, []);

  async function handleAddProject(formData) {
    const {title, owner} = formData;

    const response = await api.post('projects', {
      title,
      owner,
    });

    console.log(response);

    const project = response.data;

    setProjects([...projects, project]);

    setShowModal(state => !state);
  }

  return (
    <>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({item}) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.owner}>Owner: {item.owner}</Text>
            </View>
          )}
        />

        <TouchableOpacity
          onPress={() => setShowModal(state => !state)}
          activeOpacity={0.6}
          style={styles.button}>
          <Text>Adicionar Projeto</Text>
        </TouchableOpacity>

        <ModalProjects
          modalFunction={handleAddProject}
          modalTitle="Adicionar Projeto"
          visible={showModal}
          visibilityControl={setShowModal}
        />
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
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 30,
    marginBottom: 16,
    minWidth: '90%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  owner: {
    fontSize: 16,
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
  },
});
