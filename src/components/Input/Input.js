import React, {useRef, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

import {TextInput} from 'react-native';
import {useField} from '@unform/core';

const Input = ({name, ...rest}) => {
  const inputRef = useRef(null);
  const {fieldName, registerField, defaultValue, error} = useField(name);
  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue(ref) {
        ref.value = '';
        ref.clear();
      },
      setValue(ref, value) {
        ref.setNativeProps({text: value});
        inputRef.current.value = value;
      },
      getValue(ref) {
        return ref.value;
      },
    });
  }, [fieldName, registerField]);
  return (
    <>
      <TextInput
        ref={inputRef}
        defaultValue={defaultValue}
        onChangeText={value => {
          if (inputRef.current) {
            inputRef.current.value = value;
          }
        }}
        {...rest}
      />
      {error && <span className={styles.error}>{error}</span>}
    </>
  );
};

const styles = StyleSheet.create({
  error: {
    color: "red",
  }
})

export default Input;
