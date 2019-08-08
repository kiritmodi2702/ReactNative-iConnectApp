import React, { Component } from "react";
import {
  View,
  StyleSheet,
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

import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import championFontConfige from "./../../../selection.json";
import DatePicker from "react-native-datepicker";

const Icon = createIconSetFromIcoMoon(championFontConfige);
import { setSignUpData, setUserData } from "./../../Redux/Actions";

import { connect } from "react-redux";
import CustomNavigation from "../../components/CustomNavigation";

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

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      mobileNo: "",
      joinDate: "",
      profileImage: "",
      profileSelection: false,
      errorMessage: false,
      isCheckEmail: false,
      isCheckMobile: false,
      loading: false,
      error: "",
      isEditEnable: false
    };
  }
  componentDidMount() {
    console.log("====== userData", this.props.userData);

    let users = this.props.userData;

    this.setState({
      emailId: users.emailId || "",
      firstName: users.firstName || "",
      lastName: users.lastName || "",
      address: users.address || "",
      mobileNo: users.mobileNo || "",
      joinDate: users.joinDate || "",
      profileImage:
        users.profileImage || require("./../../assets/Images/placeholder.png")
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("====== signUpData");

    // if (prevState.someMirroredValue !== nextProps.someValue) {
    //   return {
    //     derivedData: computeDerivedState(nextProps),
    //     someMirroredValue: nextProps.someValue
    //   };
    // }

    // // Return null to indicate no change to state.
    // return null;
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

  // Edit Profile ::

  editProfile = () => {
    if (!this.state.isEditEnable) {
      this.setState({
        isEditEnable: true
      });
    } else {
      let signUp = this.props.signUpData;
      let index = this.props.signUpData.findIndex(item => {
        return item.emailId === this.state.emailId;
      });

      let profileData = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        emailId: this.state.emailId,
        password: this.state.password,
        address: this.state.address,
        mobileNo: this.state.mobileNo,
        joinDate: this.state.joinDate,
        profileImage: this.state.profileImage
      };

      signUp[index] = profileData;
      this.props.setUserData(profileData);
      this.props.setSignUpData(signUp);
      Alert.alert(
        "iConnect",
        "Profile has been successfully updated.",
        [
          {
            text: "OK",
            onPress: () => {
              console.log("Profile has been successfully updated.");
            }
          }
        ],
        { cancelable: false }
      );
    }
  };

  // Logout Call ::

  logoutCall = () => {
    Alert.alert(
      "General Electronics",
      "Are you sure to logout from the application?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            this.props.setUserData({});
            this.props.navigation.navigate("Login");
          }
        }
      ],
      { cancelable: false }
    );
  };
  // Render ::

  render() {
    return (
      <View style={styles.container}>
        <CustomNavigation navigationTitle="Profile" />

        <KeyboardAwareScrollView
          style={styles.keybordStyle}
          contentContainerStyle={{ alignSelf: "center" }}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileTouchView} onPress={this.onProfileClick}>
            <Image
              style={styles.profileImageStyle}
              source={this.state.profileImage}
            />

            <Label ml={15} small Futura_Book color={Color.TEXTFIELD_TITLE}>
              {this.state.firstName + " " + this.state.lastName}
            </Label>
          </View>

          <View style={styles.itemViewStyle}>
            <View style={styles.fieldSubView}>
              <TextField
                style={{ color: "#dddddd" }}
                editable={false}
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
                style={{ color: "#dddddd" }}
                editable={false}
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
              style={{ color: "#dddddd" }}
              editable={false}
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
              onSubmitEditing={() => this.email.refs.firstname.focus()}
            />

            <View style={styles.fieldSubView}>
              <TextField
                editable={this.state.isEditEnable}
                ref={ref => (this.mobileNo = ref)}
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
                  title={"Join Date"}
                  editable={false}
                  width={(Dimensions.get("window").width - 80) / 2 - 10}
                  value={this.state.joinDate || ""}
                  autoCapitalize={"none"}
                />

                {this.state.isEditEnable && (
                  <DatePicker
                    style={{
                      width: (Dimensions.get("window").width - 80) / 2 - 10,
                      height: 60,
                      position: "absolute"
                    }}
                    mode="date"
                    date={""}
                    maxDate={new Date()}
                    format="DD/MM/YYYY"
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
                )}
              </View>
            </View>

            <TextField
              editable={this.state.isEditEnable}
              returnKeyType={"done"}
              title={signUpMessage.address}
              onChangeText={this.handleText("address")}
              width={Dimensions.get("window").width - 80}
              value={this.state.address}
            />
          </View>

          <KMButton
            onPress={this.editProfile}
            Futura_Book
            title={this.state.isEditEnable ? "Save" : "Edit"}
            color={Color.WHITE}
            style={styles.saveEditStyle}
          />

          <KMButton
            onPress={this.logoutCall}
            Futura_Book
            title={"Logout"}
            color={Color.WHITE}
            style={styles.logoffStyle}
          />
        </KeyboardAwareScrollView>
        <ProgressIndicator loading={this.state.loading} />
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setSignUpData: signUpData => dispatch(setSignUpData(signUpData)),
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
)(Profile);
