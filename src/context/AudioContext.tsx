import trackList from "../assets/tracksList";
import { ReactNode, createContext, useState } from "react";
import { Track } from "../components/Track/Track";

const audio = new Audio();

export const AudioContext = createContext({
	isPlaying: false,
	handleToggleAudio: (track: Track) => {
		track;
	},
	currentTrack: trackList[0],
	audio,
});

interface AudioProviderProps {
	children: ReactNode;
}

const AudioProvider = (props: AudioProviderProps) => {
	const [currentTrack, setCurrentTrack] = useState(trackList[0]);
	const [isPlaying, setIsPlaying] = useState(false);

	const handleToggleAudio = (track: Track) => {
		if (currentTrack.id !== track.id) {
			setCurrentTrack(track);
			audio.src = track.src;
			audio.currentTime = 0;
			setIsPlaying(true);
			audio.play();
			return;
		}

		if (isPlaying) {
			audio.pause();
			setIsPlaying(false);
		} else {
			audio.play();
			setIsPlaying(true);
		}
	};

	const value = { audio, currentTrack, isPlaying, handleToggleAudio };

	return (
		<AudioContext.Provider value={value}>
			{props.children}
		</AudioContext.Provider>
	);
};

export default AudioProvider;
