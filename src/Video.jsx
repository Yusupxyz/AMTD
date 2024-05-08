import React from 'react';
import {StyleSheet} from 'react-native';
import VideoPlayer from 'react-native-video-controls';

const Video = ({route,navigation}) => {
    const {source}= route.params;

    return (
        <VideoPlayer 
            source={{
                uri:
                `http://192.168.1.2/backend/public/assets/uploads/${source}`,
                }}   // Can be a URL or a local file.
            ref={(ref) => {
                this.player = ref
            }}               
                        
            showDuration={true}
            // autoplay
            controlsTimeout={2000}
            defaultMuted={true}
            disableSeek={true}
            pauseOnPress={true}  
            onBack={() => {
                navigation.goBack();
            }}            // Callback when video cannot be loaded
            style={styles.backgroundVideo} />
    );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default Video