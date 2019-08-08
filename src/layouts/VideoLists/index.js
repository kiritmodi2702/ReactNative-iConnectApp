/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Dimensions,
  Platform,
  FlatList,
  Alert,
  TouchableOpacity,
  BackHandler
} from "react-native";
import Share from "react-native-share";
import Label from "../../components/Label";
import CustomNavigation from "../../components/CustomNavigation";
import ProgressIndicator from "../../components/ProgressIndicator/ProgressIndicator";
import styles from "./styles";
import { isIphoneX } from "../../utils/isIphone-x";
const HEADER_SIZE = isIphoneX() ? 135 : 70;
import Globle from "../../utils/Globals";
import { Color } from "../../utils/color";
const HeightView =
  Dimensions.get("window").height -
  HEADER_SIZE -
  (Platform.OS !== "ios" ? 30 : 0) -
  (Globle.Pad.isIpad === 1 ? 50 : 80);
import Video, { FilterType } from "react-native-video";

const filterTypes = [
  FilterType.NONE,
  FilterType.INVERT,
  FilterType.MONOCHROME,
  FilterType.POSTERIZE,
  FilterType.FALSE,
  FilterType.MAXIMUMCOMPONENT,
  FilterType.MINIMUMCOMPONENT,
  FilterType.CHROME,
  FilterType.FADE,
  FilterType.INSTANT,
  FilterType.MONO,
  FilterType.NOIR,
  FilterType.PROCESS,
  FilterType.TONAL,
  FilterType.TRANSFER,
  FilterType.SEPIA
];
export default class VideoLists extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      videosResponse: [],
      loading: false,
      isRefreshing: false,
      isVideoload: true,

      // Video :

      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: "contain",
      duration: 0.0,
      currentTime: 0.0,
      controls: true,
      paused: false,
      skin: "custom",
      ignoreSilentSwitch: null,
      isBuffering: false,
      filter: FilterType.NONE,
      filterEnabled: true,
      selectedVideo: false,
      selectedIndex: -1
    };
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    console.log("Compoent did mount");
    this.videosData();
  }

  handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  };

  ///****** Video Method ******/

  onLoad = data => {
    console.log("On load fired!");
    this.setState({ duration: data.duration });
  };

  onProgress = data => {
    this.setState({ currentTime: data.currentTime });
  };

  onBuffer = isBuffering => {
    this.setState({ isBuffering: isBuffering });
  };

  // API Calling ::

  videosData = async () => {
    this.setState({
      loading: true,
      isRefreshing: false
    });
    try {
      let response = await fetch(
        "https://private-c31a5-task27.apiary-mock.com/videos"
      );
      let responseJson = await response.json();

      this.setState({
        videos: responseJson.videos || [],
        videosResponse: responseJson.videos || [],
        loading: false,
        isRefreshing: false
      });
    } catch (error) {
      console.error(error);
      this.setState({
        loading: false,
        isRefreshing: false
      });
      Alert.alert(
        "iConnect",
        JSON.stringify(error),
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  // FlatLists ::

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        delayLongPress={1000}
        onPress={() => {
          console.log(" onPress");
          const shareOptions = {
            title: "iConnect",
            message: "Share",
            url: item.video_url
          };
          Share.open(shareOptions)
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              err && console.log(err);
            });
          // this.player = null;
        }}
        onLongPress={e => {
          console.log(" onLongPress");
          // this.setState({
          //   selectedVideo: true,
          //   selectedIndex: index
          // });
        }}
        style={styles.itemViewStyle}
      >
        <Image
          source={{ uri: item.thumbnail_url }}
          style={{
            width: 180,
            height: 100,
            marginBottom: 20
          }}
        />
        <Label
          small
          Futura_Heavy
          color={Color.TEXTFIELD_TEXT}
          style={styles.lblTitleStyle}
        >
          {item.title}
        </Label>
        {this.state.selectedVideo && this.state.selectedIndex === index && (
          <Video
            ref={ref => {
              this.player = ref;
            }}
            source={{
              uri: item.video_url
            }}
            style={{
              width: Dimensions.get("window").width - 40,
              alignSelf: "center",
              position: "absolute",
              height: 150
            }}
            controls={true}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            ignoreSilentSwitch={this.state.ignoreSilentSwitch}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onBuffer={this.onBuffer}
            onProgress={this.onProgress}
            onEnd={() => {
              this.setState({
                paused: true
              });
              console.log("Completed");
            }}
            repeat={false}
            filter={this.state.filter}
            filterEnabled={this.state.filterEnabled}
          />
        )}
      </TouchableOpacity>
    );
  };

  handleLoadMore = () => {
    var connected = this.state.videos.concat(this.state.videosResponse);
    this.setState({
      videos: connected
    });
  };

  handleRefresh = () => {
    this.setState(
      {
        isRefreshing: true
      },
      () => {
        this.videosData();
      }
    );
  };

  render() {
    const { loading, isRefreshing } = this.state;
    return (
      <View style={styles.container}>
        <CustomNavigation {...this.props} navigationTitle="Videos" />
        <SafeAreaView style={{ height: HeightView, marginTop: 10 }}>
          <FlatList
            data={this.state.videos}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            refreshing={isRefreshing}
            onRefresh={this.handleRefresh}
            onEndReached={this.handleLoadMore}
            onEndThreshold={0}
          />
        </SafeAreaView>
        <ProgressIndicator loading={this.state.loading} />
      </View>
    );
  }
}
