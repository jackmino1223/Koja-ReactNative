// ES6 module syntax
import {
  AsyncStorage
} from 'react-native';

import LocalizedStrings from 'react-native-localization';

// CommonJS syntax
// let LocalizedStrings  = require ('react-native-localization');
let strings = new LocalizedStrings({
   "en-US":{
   },
   en:{
     welcome: 'Welcom',
     signing_in: 'Signing in..',
     loading: 'Loading...',
     enter_name: 'Please enter your username',
     enter_password: 'Please enter your password',
     incorrect_user_info: 'Username or password is incorrect',
     remember_me: 'Remember me',
     user_name: 'Username',
     password: 'Password',
     forgot_password: 'Forgot password',
     sign_in_now: 'SIGN IN NOW',
     send: 'Send',
     back: 'Back',
     cancel: 'Cancel',
     ok: 'OK',
     enter_device_name: 'Please enter device\'s name.',
     enter_phone_number: 'Please enter phone number.',
     enter_device_imei: 'Please enter device\'s imei.',
     adding: 'Adding…',
     confirm: 'Confirm',
     name: 'Name',
     imei: 'Imei',
     phone_number: 'Phone number',
     new_password: 'New password',
     confirm_password: 'Confirm Password',
     enter_new_password: 'Please enter new password.',
     confirm_new_password: 'Please confirm new password.',
     invalid_password: 'Invalid password.',
     changing_password: 'Changing Password…',
     invalid_coordinate: 'Invalid coordinate',
     welcom_to_koja: 'Welcome to Koja',
     map: 'Map',
     vehicle_list: 'Vehicle List',
     contact_us: 'Contact Us',
     change_password: 'Change Password',
     log_out: 'Log out',
     settings: 'Settings',
     driver: 'Driver',
     phone_number: 'Phone Number',
     ago: '5 min ago',
     show_on_map: 'Show on map',
     vehicle_history: 'Vehicle history',
     remove_vehicle: 'Remove vehicle',
     vehicle_list: 'Vehicle List',
     have_account: 'Don’t have an account?',
     click_here: 'Click here.',
     search: 'Search',
     alert_remove_vehicle: 'Are you sure you want to remove this device?',
     user_signin: 'Sign in'
   },
   ir: {
     welcome:'خوش آمديد',
     signing_in:'	در حال بارگذاري',
     loading:'در حال بارگذاري',
     enter_name:'	لطفا نام كاربري خود را وارد نماييد',
     enter_password:'لطفا كلمه عبور خود را وارد نماييد',
     incorrect_user_info:'نام كاربري و يا كلمه عبور وارد شده صحيح نمي باشد',
     remember_me:'مرا به خاطر بسپار',
     user_name:'نام كاربري',
     password:'كلمه عبور',
     forgot_password:'بازيابي كلمه عبور',
     sign_in_now:'ورود',
     send:'ارسال',
     back:'بازگشت',
     cancel:'لغو',
     ok:'تاييد',
     enter_device_name:'لطفا نام دستگاه را وارد نماييد.',
     enter_phone_number:'لطفا شماره تلفن دستگاه را وارد نماييد.',
     enter_device_imei:'	لطفا شماره IEMI دستگاه را وارد نماييد',
     adding:'در حال اضافه نمودن',
     confirm:'تاييد',
     name:'نام',
     imei:'شماره سريال IMEI',
     phone_number:'شماره تلفن',
     new_password:'كلمه عبور جديد',
     confirm_password:'لطفا كلمه عبور را تاييد نماييد.',
     enter_new_password:'لطفا كلمه عببور جديد را وارد نماييد',
     confirm_new_password:'لطفا كلمه عبور جديد را تاييد فرماييد',
     invalid_password:'كلمه عبور صحيح نمي باشد',
     changing_password:'در حال تغيير بارگذاري',
     invalid_coordinate:'مختصات جغرافيايي صحيح نمي باشد',
     welcom_to_koja:'به سامانه رديابي كجا خوش آمديد',
     map:'نقشه',
     vehicle_list:'ليست خودروها',
     contact_us:'تماس با ما',
     change_password:'تغيير كلمه عبور',
     log_out:'خروج',
     settings:'تنظيمات',
     driver:'نام راننده',
     phone_number:'شماره تلفن',
     ago:'5 دقيقه پيش',
     show_on_map:'نمايش بر روي نقشه',
     vehicle_history:'تاريخچه خودرو',
     remove_vehicle:'حذف خودرو',
     vehicle_list:'ليست خودروها',
     have_account:'آيا حساب كاربري نداريد؟',
     click_here:'بر روي اين گزينه كليك نماييد',
     search: 'جستجو کردن',
     alert_remove_vehicle: 'آیا مطمئن هستید که می خواهید این دستگاه را حذف کنید؟',
     user_signin: 'ورود کاربران'
  }
});

export {strings}
