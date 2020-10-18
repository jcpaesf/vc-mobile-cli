import React from 'react';

import { baseURL } from '../../services/api';
import { Video } from 'expo-av';
import { View, Dimensions } from 'react-native';

interface VideoProps {
    file: string;
    background: string;
}

const { width, height } = Dimensions.get('window');

const VideoFile: React.FC<VideoProps> = ({ file, background }) => {
    return (
        <Video
            source={{ uri: `${baseURL}/files/${file}` }}
            rate={1.0}
            posterSource={{ uri: `${baseURL}/files/${background}` }}
            volume={2.0}
            isMuted={false}
            resizeMode="contain"
            shouldPlay={false}
            isLooping={false}
            useNativeControls={true}
            style={{
                marginTop: 10,
                width,
                height: height / 3.5
            }}
        />
    );
}

export default VideoFile;