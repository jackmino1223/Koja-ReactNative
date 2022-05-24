import React from 'react'
import { View, TextInput, Image, StyleSheet} from 'react-native'

const Input = (props) => {
  const renderIcon = () => {
    return <Image source={props.icon} style={props.iconStyle} />
  }

  return (
    <View style={styles.inputWrapper}>
      {props.icon ? renderIcon() : null}

      <TextInput
        {...props}
        placeholder={props.label}
        underlineColorAndroid='transparent'
        style={[{textAlign:(global.lang=='ir')?'right':'left'},styles.TextInput]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignSelf: 'stretch',
    marginTop: 5
  },
  TextInput: {
    height: 30,
    fontSize: 13,
    fontFamily: 'avenir-light',
    // flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    marginTop: 5,
  }
});

export default Input
