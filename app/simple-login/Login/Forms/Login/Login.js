import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import BaseForm from '../BaseForm'
import { Input, Button } from '../../Structure'

class Login extends BaseForm {
  submit = () => {
    this.props.onLogin(this.state.userIdentification, this.state.password, this.state.remembermeChecked)
  }

  renderResetPasswordLink = () => {
    return (
      <Button
        onPress={this.props.onResetPasswordClick}
        style={this.props.loginResetPasswordLinkStyle}
        textStyle={this.props.loginResetPasswordLinkTextStyle}
        text={this.props.labels.forgotPassword}
      />
    )
  }

  render () {
    return (
      <View style={this.props.loginFormWrapperStyle}>
        <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // width: 300,
        // alignSelf: 'center'
      }}>
          { this.renderLogo() }
          <Text style={{marginVertical: 10, color: '#6A6A6A', fontSize: 20, fontFamily: 'SanFranciscoDisplay-Bold',}}>{this.props.labels.user_signin}</Text>
          <View style={this.props.fieldsetWrapperStyle}>
            <Input
              icon={this.props.userIdentificationInputIcon}
              iconStyle={this.props.inputIconStyle}
              onChangeText={this.handleInputChange('userIdentification')}
              label={this.props.labels.userIdentification}
              wrapperStyle={this.props.inputWrapperStyle}
              style={this.props.inputStyle}
              placeholderTextColor={this.props.inputPlaceholderTextColor}
            />

            <Input
              icon={this.props.passwordInputIcon}
              iconStyle={this.props.inputIconStyle}
              onChangeText={this.handleInputChange('password')}
              secureTextEntry
              label={this.props.labels.password}
              wrapperStyle={this.props.inputWrapperStyle}
              style={this.props.inputStyle}
              placeholderTextColor={this.props.inputPlaceholderTextColor}
            />
          </View>
          <Button
            onPress={this.submit}
            style={[
              this.props.baseButtonStyle,
              this.props.loginFormSubmitButtonStyle
            ]}
            textStyle={[
              this.props.baseButtonTextStyle,
              this.props.loginFormSubmitButtonTextStyle
            ]}
            text={this.props.labels.loginFormButton}
          />
          <Text style={{marginVertical: 40}}></Text>
        </View>
      </View>
    )
  }
}

export default Login
