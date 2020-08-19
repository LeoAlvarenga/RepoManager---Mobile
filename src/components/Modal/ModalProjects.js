import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {Form} from '@unform/mobile';
import * as Yup from 'yup';

import Input from '../Input/Input';

const ModalProjects = ({
  modalTitle,
  modalFunction,
  visible,
  visibilityControl,
}) => {
  const formRef = useRef(null);

  async function handleConfirm(formData) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        title: Yup.string().required('Obrigatório'),
        owner: Yup.string().required('Obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      modalFunction(formData);
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <TouchableWithoutFeedback onPressOut={() => visibilityControl(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <Form ref={formRef} onSubmit={handleConfirm}>
              <Input style={styles.input} placeholder="Title" name="title" />
              <Input style={styles.input} placeholder="Owner" name="owner" />
            </Form>
            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#2196F3'}}
              onPress={() => formRef.current.submitForm()}>
              <Text style={styles.textStyle}>Adicionar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#7159c1',
    borderRadius: 20,
    borderWidth: 2,
    height: 40,
    width: 240,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default ModalProjects;
