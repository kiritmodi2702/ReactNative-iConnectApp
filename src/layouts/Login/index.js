import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  AsyncStorage
} from "react-native";
import { validateEmail, validatePassword } from "../../utils/validation";
import TextField from "./../../components/TextField";

import Label from "../../components/Label";
import KMButton from "../../components/KMButton";
import CheckBox from "../../components/CheckBox";
import styles from "./styles";
import { Color } from "../../utils/color";
import Globals from "./../../utils/Globals";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ProgressIndicator from "./../../components/ProgressIndicator/ProgressIndicator";
import { setUserData } from "./../../Redux/Actions";
import { connect } from "react-redux";

const images = {
  logoImage: require("./../../../src/assets/Images/connect.png")
};

const loginMessage = {
  email: "Email Address",
  email_Error: "Please enter valid email address.",
  password: "Password",
  password_Error: "Password length must have eight."
};

const { width, height } = Dimensions.get("window");

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailid: "",
      password: "",
      errorMessage: false,
      isChecked: false,
      loading: false,
      error: ""
    };
  }

  componentDidMount() {
    console.log("USER DATA ==", this.props.userData);

    AsyncStorage.getItem("REMEMBER").then(value => {
      if (value !== null && value !== "NOTSET") {
        let remember = JSON.parse(value);
        this.setState({
          emailid: remember.emailid,
          password: "",
          isChecked: remember.isChecked
        });
      }
    });
  }

  // Handle TextInput Event ::

  handleText = name => {
    return text => {
      this.setState({ [name]: text });
    };
  };

  // Login Call ::

  loginCall = () => {
    let arraySignUp = this.props.signUpData;

    var userdata = arraySignUp.find(item => {
      return item.emailId === this.state.emailid;
    });

    if (typeof userdata !== "undefined") {
      this.props.setUserData(userdata);
      this.props.navigation.navigate("VideoLists");
    } else {
      Alert.alert(
        "iConnect",
        "This Email is not exist.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  // Runtime Validation ::

  checkValidation = () => {
    if (this.state.emailid.length > 0 && this.state.password.length > 0) {
      if (
        validateEmail(this.state.emailid) &&
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

  // Remember Me ::

  rememberAuthDetails = () => {
    this.setState(
      prevState => {
        return {
          isChecked: !prevState.isChecked
        };
      },
      () => {
        if (this.state.isChecked) {
          console.log("value is", this.state.isChecked);
          let remember = {
            emailid: this.state.emailid,
            password: this.state.password,
            isChecked: this.state.isChecked
          };
          console.log("remember", JSON.stringify(remember));
          AsyncStorage.setItem("REMEMBER", JSON.stringify(remember));
        } else {
          AsyncStorage.setItem("REMEMBER", "NOTSET");
        }
      }
    );
  };

  // Rendering ::

  render() {
    return (
      <KeyboardAwareScrollView
        scrollEnabled={false}
        style={{ backgroundColor: Color.BACKGROUND_COLOR }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Image source={images.logoImage} style={styles.logoStyle} />

          <TextField
            title={
              !validateEmail(this.state.emailid) &&
              this.state.emailid.length > 0
                ? loginMessage.email_Error
                : loginMessage.email
            }
            isError={
              !validateEmail(this.state.emailid) &&
              this.state.emailid.length > 0
            }
            placeholder="Enter email address"
            onChangeText={this.handleText("emailid")}
            value={this.state.emailid}
            autoCapitalize={"none"}
            maxLength={50}
            keyboardType="email-address"
            returnKeyType={"next"}
            onSubmitEditing={() => this.emailid.refs.passwordRef.focus()}
            width={width - 80}
          />

          <TextField
            ref={ref => (this.emailid = ref)}
            refInner="passwordRef"
            title={
              !validatePassword(this.state.password) &&
              this.state.password.length > 0
                ? loginMessage.password_Error
                : loginMessage.password
            }
            isError={
              !validatePassword(this.state.password) &&
              this.state.password.length > 0
            }
            placeholder="Enter password"
            onChangeText={this.handleText("password")}
            width={width - 80}
            secureTextEntry={true}
            returnKeyType={"done"}
            value={this.state.password}
          />

          <View style={styles.commonBtnStyle}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <CheckBox
                isChecked={this.state.isChecked}
                onCheckPress={this.rememberAuthDetails}
              />
              <Label
                onPress={this.rememberAuthDetails}
                ml={5}
                xsmall
                Futura_Book
                color={Color.TEXTFIELD_TITLE}
              >
                {"Remember me"}
              </Label>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <KMButton
                onPress={() => {
                  console.log("Apple");
                }}
                xsmall
                Futura_Book
                title={"Forgot password?"}
                color={Color.TEXTFIELD_TITLE}
                textStyle={{ alignSelf: "flex-end", padding: 0 }}
                style={styles.forgotBtnStyle}
              />
            </View>
          </View>

          <View style={styles.commonBtnStyle}>
            <KMButton
              disabled={!this.checkValidation()}
              xsmall
              Futura_Book
              title={"Login"}
              color={Color.WHITE}
              onPress={() => {
                this.loginCall();
              }}
              style={{
                backgroundColor: !this.checkValidation()
                  ? Color.BUTTON_BG_COLOR_DISBLE
                  : Color.BUTTON_BG_COLOR,
                padding: 10,
                width: width - 80
              }}
            />
          </View>

          <View style={{ flexDirection: "row", marginTop: height * 0.03 }}>
            <Label xsmall Futura_Book color={Color.TEXTFIELD_TITLE}>
              {"Not member yet? "}
            </Label>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("SignUp");
              }}
              style={styles.signupStyle}
            >
              <Label xsmall Futura_Book color={Color.BLACK}>
                {"Register Now"}
              </Label>
            </TouchableOpacity>
          </View>

          <ProgressIndicator loading={this.state.loading} />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

// Redux ::

const mapDispatchToProps = dispatch => {
  return {
    setUserData: userData => dispatch(setUserData(userData))
  };
};
const mapStateToProps = state => {
  if (state === undefined) {
    return {};
  }
  return {
    signUpData: state.UserReducer.signUpData,
    userData: state.UserReducer.userData
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
