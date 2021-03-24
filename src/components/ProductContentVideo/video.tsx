import React from 'react';
import { Video } from 'expo-av';
import VideoPlayer from 'react-native-video';
import { Dimensions } from 'react-native';

interface VideoProps {
	file: string;
	background: string;
}

const { width, height } = Dimensions.get('window');

const VideoFile: React.FC<VideoProps> = ({ file, background }) => {
	return (
		<>
			<VideoPlayer
				source={{ uri: file }}
				controls
				paused
				resizeMode="contain"
				volume={2.0}
				poster={background}
				style={{
					marginTop: 10,
					width,
					height: height / 3.5
				}}
			/>
			{/* <Video
				source={{ uri: file }}
				rate={1.0}
				posterSource={{ uri: background }}
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
			/> */}
		</>
	);
}

export default VideoFile;