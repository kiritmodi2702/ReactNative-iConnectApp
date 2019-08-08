import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert
} from "react-native";
import {
  validateEmail,
  validName,
  validatePassword,
  validationPhone
} from "../../utils/validation";
import TextField from "./../../components/TextField";
import Label from "../../components/Label";
import KMButton from "../../components/KMButton";
import CheckBox from "../../components/CheckBox";
import styles from "./styles";
import { Color } from "../../utils/color";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ImagePicker from "react-native-image-picker";
import ProgressIndicator from "./../../components/ProgressIndicator/ProgressIndicator";
import DatePicker from "react-native-datepicker";

import { setSignUpData } from "./../../Redux/Actions";
import { connect } from "react-redux";

const { width, height } = Dimensions.get("window");

const options = {
  title: "Profile",
  takePhotoButtonTitle: "Take a Photo",
  chooseFromLibraryButtonTitle: "Choose form Library",
  mediaType: "photo",
  allowsEditing: "false",
  quality: 0.5,
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

const signUpMessage = {
  email: "Email Address",
  email_Error: "Please enter valid email address.",
  password: "Password",
  password_Error: "Password length must have eight.",
  firstname: "First Name",
  firstname_Error: "Invalid name",
  lastname: "Last Name",
  lastname_Error: "Invalid name",
  phone: "Phone",
  phone_Error: "Invalid phone.",
  address: "Address",
  joinDate: ""
};

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      mobileNo: "",
      profileImage: "",
      joinDate: "",
      profileSelection: false,
      errorMessage: false,
      isCheckEmail: false,
      isCheckMobile: false,
      loading: false,
      error: ""
    };
  }
  componentDidMount() {
    console.log("====== signUpData", this.props.signUpData);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("====== signUpData");
  }

  // Handle Text change Event ::

  handleText = name => {
    return text => {
      this.setState({ [name]: text });
    };
  };

  // Profile Event ::

  onProfileClick = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };
        this.setState({
          profileImage: source,
          profileSelection: true
        });
      }
    });
  };

  // Check Validation ::

  checkValidation = () => {
    if (
      this.state.emailId.length > 0 &&
      this.state.firstName.length > 0 &&
      this.state.lastName.length > 0 &&
      this.state.password.length > 0
    ) {
      if (
        validName(this.state.firstName) &&
        validName(this.state.lastName) &&
        validateEmail(this.state.emailId) &&
        validatePassword(this.state.password)
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  // Signup ::

  signupCall = () => {
    let mainData = this.props.signUpData || [];

    let emailArray = mainData.map(item => {
      return item.emailId;
    });

    if (emailArray.includes(this.state.emailId)) {
      Alert.alert(
        "iConnect",
        "This EmailId is already registered.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } else {
      let signup = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        emailId: this.state.emailId,
        password: this.state.password,
        address: this.state.address,
        mobileNo: this.state.mobileNo,
        joinDate: this.state.joinDate,
        profileImage: this.state.profileImage
      };

      mainData.push(signup);
      this.props.setSignUpData(mainData);

      Alert.alert(
        "iConnect",
        "Registration has been successfully completed.",
        [
          {
            text: "OK",
            onPress: () => {
              this.props.navigation.goBack(null);
            }
          }
        ],
        { cancelable: false }
      );
    }
  };
  // Render ::

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{
            flex: 1
          }}
        >
          <KeyboardAwareScrollView
            style={styles.keybordStyle}
            contentContainerStyle={{ alignSelf: "center" }}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
            <Label
              small
              Futura_Book
              color={Color.TEXTFIELD_TITLE}
              style={styles.lblTitleStyle}
            >
              {"Sign Up"}
            </Label>

            <TouchableOpacity
              style={styles.profileStyle}
              onPress={this.onProfileClick}
            >
              <Image
                style={styles.profileImage}
                source={
                  this.state.profileImage.length === 0
                    ? require("./../../assets/Images/placeholder.png")
                    : this.state.profileImage
                }
              />
            </TouchableOpacity>

            <View style={styles.subViewStyle}>
              <TextField
                placeholder="Kirit"
                returnKeyType={"next"}
                title={
                  !validName(this.state.firstName) &&
                  this.state.firstName.length > 0
                    ? signUpMessage.firstname_Error
                    : signUpMessage.firstname
                }
                isError={
                  !validName(this.state.firstName) &&
                  this.state.firstName.length > 0
                }
                onChangeText={this.handleText("firstName")}
                width={(Dimensions.get("window").width - 80) / 2 - 10}
                value={this.state.firstName}
                maxLength={50}
                onSubmitEditing={() => this.firstname.refs.lastname.focus()}
              />

              <TextField
                placeholder="Modi"
                ref={ref => (this.firstname = ref)}
                refInner="lastname"
                returnKeyType={"next"}
                title={
                  !validName(this.state.lastName) &&
                  this.state.lastName.length > 0
                    ? signUpMessage.lastname_Error
                    : signUpMessage.lastname
                }
                isError={
                  !validName(this.state.lastName) &&
                  this.state.lastName.length > 0
                }
                onChangeText={this.handleText("lastName")}
                width={(Dimensions.get("window").width - 80) / 2 - 10}
                value={this.state.lastName}
                maxLength={50}
                onSubmitEditing={() => this.lastname.refs.email.focus()}
              />
            </View>

            <TextField
              placeholder="John@gmail.com"
              ref={ref => (this.lastname = ref)}
              refInner="email"
              returnKeyType={"next"}
              title={
                !validateEmail(this.state.emailId) &&
                this.state.emailId.length > 0
                  ? signUpMessage.email_Error
                  : signUpMessage.email
              }
              isError={
                !validateEmail(this.state.emailId) &&
                this.state.emailId.length > 0
              }
              onChangeText={this.handleText("emailId")}
              width={Dimensions.get("window").width - 80}
              value={this.state.emailId}
              autoCapitalize={"none"}
              onSubmitEditing={() => this.emailids.refs.phoneRefs.focus()}
            />

            <View style={styles.subViewStyle}>
              <TextField
                placeholder="+91XXXXXXXX08"
                ref={ref => (this.emailids = ref)}
                refInner="phoneRefs"
                returnKeyType={"next"}
                title={
                  !validationPhone(this.state.mobileNo) &&
                  this.state.mobileNo.length > 0
                    ? signUpMessage.phone_Error
                    : signUpMessage.phone
                }
                isError={
                  !validationPhone(this.state.mobileNo) &&
                  this.state.mobileNo.length > 0
                }
                onChangeText={this.handleText("mobileNo")}
                value={this.state.mobileNo}
                autoCapitalize={"words"}
                maxLength={50}
                returnKeyType={"next"}
                keyboardType={"phone-pad"}
                width={(Dimensions.get("window").width - 80) / 2 - 10}
              />

              <View
                style={{
                  width: (Dimensions.get("window").width - 80) / 2 - 10
                }}
              >
                <TextField
                  placeholder="27/02/2019"
                  title={"Join Date"}
                  editable={false}
                  width={(Dimensions.get("window").width - 80) / 2 - 10}
                  value={this.state.joinDate || ""}
                  autoCapitalize={"none"}
                />

                <DatePicker
                  style={{
                    width: (Dimensions.get("window").width - 80) / 2 - 10,
                    height: 60,
                    position: "absolute"
                  }}
                  mode="date"
                  date={""}
                  format="DD/MM/YYYY"
                  maxDate={new Date()}
                  confirmBtnText="Done"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  customStyles={{
                    dateIcon: {
                      position: "absolute",
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateText: {
                      color: "transparent"
                    },
                    dateInput: {
                      height: 30,
                      width: 100,
                      borderColor: "transparent",
                      color: "#234456",
                      textColor: "white"
                    }
                  }}
                  onDateChange={date => {
                    this.setState({ joinDate: date });
                  }}
                />
              </View>
            </View>

            <TextField
              placeholder="Password"
              returnKeyType={"next"}
              title={
                !validatePassword(this.state.password) &&
                this.state.password.length > 0
                  ? signUpMessage.password_Error
                  : signUpMessage.password
              }
              isError={
                !validatePassword(this.state.password) &&
                this.state.password.length > 0
              }
              onChangeText={this.handleText("password")}
              width={Dimensions.get("window").width - 80}
              secureTextEntry={true}
              value={this.state.password}
              autoCapitalize={"none"}
              onSubmitEditing={() => this.password.refs.address.focus()}
            />

            <TextField
              ref={ref => (this.password = ref)}
              refInner="address"
              placeholder="Valid Address"
              returnKeyType={"done"}
              title={signUpMessage.address}
              onChangeText={this.handleText("address")}
              width={Dimensions.get("window").width - 80}
              value={this.state.address}
            />

            <View style={[styles.subViewStyle, { marginTop: 10 }]}>
              <View style={styles.checkBoxV}>
                <CheckBox
                  isChecked={this.state.isCheckEmail}
                  onCheckPress={() => {
                    this.setState(prevState => {
                      return { isCheckEmail: !prevState.isCheckEmail };
                    });
                  }}
                />
                <Label
                  onPress={() => {
                    this.setState(prevState => {
                      return { isCheckEmail: !prevState.isCheckEmail };
                    });
                  }}
                  ml={5}
                  style={{ width: (width - 110) / 2 }}
                  xsmall
                  Futura_Book
                  color={Color.TEXTFIELD_TITLE}
                >
                  {"Display email id"}
                </Label>
              </View>

              <View style={styles.checkBoxV}>
                <CheckBox
                  isChecked={this.state.isCheckMobile}
                  onCheckPress={() => {
                    this.setState(prevState => {
                      return { isCheckMobile: !prevState.isCheckMobile };
                    });
                  }}
                />

                <View
                  style={{
                    marginLeft: 5
                  }}
                >
                  <Label
                    onPress={() => {
                      this.setState(prevState => {
                        return { isCheckMobile: !prevState.isCheckMobile };
                      });
                    }}
                    style={{ width: (width - 110) / 2 }}
                    xsmall
                    Futura_Book
                    color={Color.TEXTFIELD_TITLE}
                  >
                    {"Display mobile number"}
                  </Label>
                </View>
              </View>
            </View>

            <KMButton
              onPress={this.signupCall}
              disabled={!this.checkValidation()}
              xsmall
              Futura_Book
              title={"Sign Up"}
              color={Color.WHITE}
              style={{
                backgroundColor: !this.checkValidation()
                  ? Color.BUTTON_BG_COLOR_DISBLE
                  : Color.BUTTON_BG_COLOR,
                padding: 10,
                width: width - 80,
                marginTop: 20
              }}
            />

            <View style={styles.alreadyMember}>
              <Label xsmall Futura_Book color={Color.TEXTFIELD_TITLE}>
                {"Already member? "}
              </Label>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}
                style={styles.loginNow}
              >
                <Label xsmall Futura_Book color={Color.BLACK}>
                  {"Login Now"}
                </Label>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
        <ProgressIndicator loading={this.state.loading} />
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setSignUpData: signUpData => dispatch(setSignUpData(signUpData))
  };
};
const mapStateToProps = state => {
  if (state === undefined) {
    return {};
  }
  return {
    signUpData: state.UserReducer.signUpData
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
