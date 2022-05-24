const React = require('react');
const {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  I18nManager
} = require('react-native');
const { Component } = React;
import VehicleList from './VehicleList';
import ChangePassword from './ChangePassword';
import {strings} from '../components/i18n'
import Communications from 'react-native-communications';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width * 2/3,
    height: window.height,
    backgroundColor: '#fff',
    paddingVertical: 40,
    // paddingHorizontal: 20,
    // css-layout: 'end',
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    width: 100,
    height: 108,
    // borderRadius: 50,
    flex: 1,
  },
  icon: {
    width: 28,
    height: 28,
    margin: 5,
    marginRight: 20,
    resizeMode: 'contain'
    // marginLeft: 0
  },
  welcome: {
    fontFamily: 'SanFranciscoDisplay-Regular',
    fontSize: 18,
    color: '#636975',
  },
  name: {
    fontFamily: 'SanFranciscoDisplay-Bold',
    fontSize: 20,
    color: '#5A616D',
    fontWeight: '600',
  },
  item: {
    fontFamily: 'SanFranciscoDisplay-Bold',
    fontSize: 20,
    color: '#5A616D',
    fontWeight: '600',
    paddingVertical: 20,
    // color: '#fff',
    textAlign: 'center'
  },
  item_inactive: {
    fontFamily: 'SanFranciscoDisplay-Bold',
    fontSize: 20,
    color: '#A4B3BC',
    fontWeight: '600',
    paddingVertical: 20,
    // color: '#fff',
    textAlign: 'center'
  },
  container_active: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderLeftWidth: 4,
    borderLeftColor: '#444C5B',
    paddingHorizontal: 5,
  },
  container_inactive: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    // borderLeftWidth: 4,
    paddingHorizontal: 9,
  },
});

module.exports = class Menu extends Component {
  constructor(props) {
    super(props);
    console.log("menu create");
    this.state = {
      view: "Map",
    };
    if(global.selectMenuItem)
      this.state = {
        view: global.selectMenuItem,
      };
  }
  componentDidMount(){
  }

  componentWillMount(){
    if(global.lang == 'ir'){
      styles.container_active={
        flex: 1,
        flexDirection: 'row-reverse',
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRightWidth: 4,
        borderRightColor: '#444C5B',
        paddingHorizontal: 5,
      }
      styles.container_inactive={
        flex: 1,
        flexDirection: 'row-reverse',
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        // borderLeftWidth: 4,
        paddingHorizontal: 9,
      }
    }
  }

  render() {
    // if(this.state.view == "Main" || this.state.view == "ChangePassword"){
      return (
        <View style={{flex:1}}>
        <ScrollView scrollsToTop={false} style={styles.menu}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={require('../images/user.png')}/>
            <Text style={styles.welcome}>{strings.welcom_to_koja}</Text>
            <Text style={styles.name}>{global.userDetail.firstName} {global.userDetail.lastName}</Text>
          </View>
          <TouchableOpacity style={this.state.view == 'Map'?styles.container_active:styles.container_inactive} onPress={this.onMap}>
            <Image source={this.state.view == 'Map'?require('../images/map.png'):require('../images/map_inactive.png')} style={styles.icon} />
            <Text
              style={this.state.view == 'Map'?styles.item:styles.item_inactive}>
              {strings.map}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={this.state.view == 'VehicleList'?styles.container_active:styles.container_inactive} onPress={this.onVehicleList}>
            <Image source={this.state.view == 'VehicleList'?require('../images/vehicle.png'):require('../images/vehicle_inactive.png')} style={styles.icon} />
            <Text
              style={this.state.view == 'VehicleList'?styles.item:styles.item_inactive}>
              {strings.vehicle_list}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={this.state.view == 'ContactUs'?styles.container_active:styles.container_inactive} onPress={this.onContactUs}>
            <Image source={this.state.view == 'ContactUs'?require('../images/contactus.png'):require('../images/contactus_inactive.png')} style={styles.icon} />
            <Text
              style={this.state.view == 'ContactUs'?styles.item:styles.item_inactive}>
              {strings.contact_us}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={this.state.view == 'ChangePassword'?styles.container_active:styles.container_inactive} onPress={this.onChangePassword}>
            <Image source={this.state.view == 'ChangePassword'?require('../images/settings.png'):require('../images/settings_inactive.png')} style={styles.icon} />
            <Text
              style={this.state.view == 'ChangePassword'?styles.item:styles.item_inactive}>
              {strings.change_password}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={this.state.view == 'LogOut'?styles.container_active:styles.container_inactive} onPress={this.onLogOut}>
            <Image source={this.state.view == 'LogOut'?require('../images/myaccount.png'):require('../images/myaccount_inactive.png')} style={styles.icon} />
            <Text
              style={this.state.view == 'LogOut'?styles.item:styles.item_inactive}>
              {strings.log_out}
            </Text>
          </TouchableOpacity>
        </ScrollView>
        {this.state.view == 'ChangePassword' ?
          <ChangePassword onOkBtn={this.onChangePasswordOkBtn} onCancelBtn={this.onChangePasswordCancelBtn}/>
          :null
        }
        </View>
      );
    // }else if(this.state.view == "VehicleList"){
    //   return(
    //     <VehicleList onItemSelected={this.props.onItemSelected} onBackBtn={this.onBackBtn}/>
    //   )
    // }
  }

  onMap = () => {
    this.setState({
      view: "Map"
    });
    global.selectMenuItem = "Map"
    const {navigate} = global.navigation;
    navigate("Home");
    // this.props.onItemSelected('Map');
  }

  onVehicleList = () => {
    console.log("vehicle list");
    this.setState({
      view: "VehicleList"
    });
    global.selectMenuItem = "VehicleList"
    // this.props.onItemSelected('VehicleList');
    const {navigate} = global.navigation;
    navigate("VehicleList");
  }

  onContactUs = () => {
    console.log("contact us");
    this.setState({
      view: "ContactUs"
    });
    this.props.onItemSelected('ContactUs');
    Communications.phonecall('982122081016', true)
  }

  onChangePassword = () => {
    console.log("contact us");
    this.setState({
      view: "ChangePassword"
    });
  }

  onLogOut = () => {
    console.log("Log out");
    this.setState({
      view: "LogOut"
    });
    this.props.onItemSelected('LogOut');
  }

  onBackBtn = () => {
    console.log("onBack");
    this.setState({
      view: "Main"
    });

  }

  onChangePasswordOkBtn = () =>{
    // this.setState({
    //   view: "Main"
    // });
    this.props.onItemSelected('ChangePassword');
  }

  onChangePasswordCancelBtn = () =>{
    this.setState({
      view: "Main"
    });
  }

};
