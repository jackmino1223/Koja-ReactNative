import { StyleSheet, Dimensions} from 'react-native'

var {width} = Dimensions.get('window');
export default StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    // height: 100,
    width: width/2,
    marginBottom: 60,

    // alignSelf: 'stretch',
    // flex: 0.5,
  },
  fieldsetWrapper: {
    // alignSelf: 'stretch',
    borderRadius: 2
  },
  inputWrapper: {
    width: width-80,
    borderWidth: 2,
    borderColor: '#C9C7C9',
    borderRadius: 5,
    paddingHorizontal: 40,
    marginVertical: 5,
  },
  input: {
    height: 40,
    color: '#555',
    backgroundColor: '#fff',
  },
  inputIcon: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
    position: 'absolute',
    bottom: 8,
  },
  backButton: {
    height: 40,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  backButtonText: {
    fontSize: 30,
    color: '#fff'
  },
  baseButton: {
    height: 50,
    backgroundColor: '#79C942',
    // alignSelf: 'stretch',
    width: width-80,
    borderRadius: 5,
    justifyContent: 'center',
    marginVertical: 25,
  },
  baseButtonText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 19,
    fontFamily: 'SanFranciscoDisplay-Regular',
  },
  formWrappper: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 0,
    // marginTop: 20,
    flexDirection: 'column',
    bottom: 0
  },
  loginResetPasswordLink: {
    height: 30,
    marginVertical: 5,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0)',
    paddingRight: 25,
  },
  loginResetPasswordLinkText: {
    fontSize: 17,
    color: '#aaa'
  },
  resetPasswordFormSubmitButton: {
    marginTop: 20
  }
})
