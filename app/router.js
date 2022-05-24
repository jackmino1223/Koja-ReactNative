import React, { Component } from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { Dimensions, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './Components/Home';
import Detail from './Components/Detail';
import Photodetail from './Components/Photodetail';
import Chat from './Components/Chat';
import Hopthu from './Components/Hopthu';
import Phimonline from './Components/Phimonline';
import Directory from './Components/Directory';
import Myaccount from './Components/Myaccount'
import Menu from './Menu';


const { width } = Dimensions.get('window');


const DrawerIcon = ({ navigate }) => {
  return (
    <Icon
      name="md-menu"
      size={28}
      color="red"
      onPress={() => navigate('DrawerOpen')}
      style={{ paddingLeft: 10 }}/>
  );
}
const DrawerIconR = ({ navigate }) => {
  return (
    <Icon
      name="md-search"
      size={28}
      color="red"
      onPress={() => navigate('Manhinh_Myaccount')}
      style={{ paddingRight: 10 }}
    />
  );
}
const DrawerIconB = ({ navigate }) => {
  return (
    <Icon
      name="md-chatboxes"
      size={28}
      color="red"
      onPress={() => navigate('Manhinh_Myaccount')}
      style={{ paddingRight: 10, marginTop:10 }}
    />
  );
}
export const HomeStack = StackNavigator({
  Manhinh_Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      headerTitle:<Icon
          name="md-megaphone"
          size={48}
          color="red"
          style={{ paddingRight: 10, marginTop:10 }}
        />,
      headerStyle: { backgroundColor: 'white', paddingBottom:15},
      headerTitleStyle: {color: '#a7c3f2'},
      headerLeft: <DrawerIcon {...navigation} />,
      headerRight: <DrawerIconR {...navigation} />,

    }),
  },
  Manhinh_Detail: {
    screen: Detail,
    navigationOptions: ({ navigation }) => ({
      headerTitle: `${navigation.state.params.userID}`,
      headerStyle: { backgroundColor: 'white', paddingBottom:15},
      headerRight: <DrawerIconB {...navigation} />,
      headerLeft:
      <Icon
        name="md-arrow-back"
        size={28}
        color="#a7c3f2"
        onPress={() => { navigation.goBack()}}
        style={{ paddingLeft: 10 }}
      />
    }),
  },
  Manhinh_Photodetail: {
    screen: Photodetail,
    navigationOptions: {
      title: 'Photo Detail'
    }
  },
  Manhinh_Myaccount: {
    screen: Myaccount,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'My Account',
      headerStyle: { backgroundColor: 'green', height: 40, paddingBottom:15},
      headerTitleStyle: {color: 'white'},
      headerLeft: <DrawerIcon {...navigation} />,
      headerRight: <DrawerIconR {...navigation} />,
    }),
  }

});

export const MyaccountStack = StackNavigator ({
  Manhinh_Myaccount: {
    screen: Myaccount,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'My Account',
      headerStyle: { backgroundColor: 'green', height: 40, paddingBottom:15},
      headerTitleStyle: {color: 'white'},
      headerLeft: <DrawerIcon {...navigation} />,
      headerRight: <DrawerIconR {...navigation} />,
    }),
  }
});

export const MovieStack = StackNavigator ({
  Manhinh_Hopthu: {
    screen: Phimonline,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Phim Online',
      headerStyle: { backgroundColor: 'green', height: 40, paddingBottom:15},
      headerTitleStyle: {color: 'white'},
      headerLeft: <DrawerIcon {...navigation} />,
      headerRight: <DrawerIconR {...navigation} />,
    }),
  }
});

export const ChatStack = StackNavigator ({
  Manhinh_Hopthu: {
    screen: Chat,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'CHAT',
      headerStyle: { backgroundColor: 'green', height: 40, paddingBottom:15},
      headerTitleStyle: {color: 'white'},
      headerLeft: <DrawerIcon {...navigation} />,
      headerRight: <DrawerIconR {...navigation} />,
    }),
  }
});

export const MessageStack = StackNavigator ({
  Manhinh_Mail: {
    screen: Hopthu,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'MESSAGE',
      headerStyle: { backgroundColor: 'green', height: 40, paddingBottom:15},
      headerTitleStyle: {color: 'white'},
      headerLeft: <DrawerIcon {...navigation} />,
      headerRight: <DrawerIconR {...navigation} />,
    }),
  }
});

export const UserStack = StackNavigator ({
  Manhinh_User: {
    screen: Detail,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'DANH BẠ',
      headerStyle: { backgroundColor: 'green', height: 40, paddingBottom:15},
      headerTitleStyle: {color: 'white'},
      headerLeft: <DrawerIcon {...navigation} />,
      headerRight: <DrawerIconR {...navigation} />,
    }),
  }
});

export const Tabs = TabNavigator(
  {
    TrangChu: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'PEOPLE',
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('./images/home.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
      }
    },
    Hopthu: {
      screen: MovieStack,
      navigationOptions: {
        tabBarLabel: 'MOVIE',
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('./images/movie.png')}
            style={[styles.icon, {tintColor: tintColor}]}/>
        ),
      }
    },
    Chat: {
      screen: ChatStack,
      navigationOptions: {
        tabBarLabel: 'CONTACT',
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('./images/chat.png')}
            style={[styles.icon, {tintColor: tintColor}]}/>
        ),
      }
    },
    Message: {
        screen: MessageStack,
        navigationOptions: {
          tabBarLabel: 'MESSAGE',
          tabBarIcon: ({ tintColor }) => (
            <Image
              source={require('./images/bell.png')}
              style={[styles.icon, {tintColor: tintColor}]}
            />
          ),
        }
    },
    MyAccount: {
      screen: MyaccountStack,
      navigationOptions: {
        tabBarLabel: 'MORE',
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('./images/setting.png')}
            style={[styles.icon, {tintColor: tintColor}]}/>
        ),
      }
    }
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    tabBarOptions: {
      style: {
        backgroundColor: 'white',
      },
      labelStyle: {
        fontWeight: 'normal'
      },
      activeTintColor: 'red',
      inactiveTintColor: '#ef7b69'
    }
  }
);
export const SideMenu = DrawerNavigator(
  {
    Tabbars: {
      screen: Tabs
    },
  },
  {
    drawerWidth: width / 2,
    drawerPosition: 'left',
    contentComponent: props => <Menu {...props} />
  }
);
const styles = StyleSheet.create(
  {
    icon: {
      width: 26,
      height: 26,
    },
  }
);
