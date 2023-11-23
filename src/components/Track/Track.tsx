import styles from "./Track.module.scss";
import { IconButton } from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";
import secondsToMMSS from "../../utils/secondsToMMSS";
import { useContext } from "react";
import { AudioContext } from "../../context/AudioContext";
import cn from "classnames";

export interface Track {
	id: number;
	src: string;
	preview: string;
	duration: number;
	title: string;
	artists: string;
}

const Track = (track: Track) => {
	const { preview, title, artists, duration } = track;
	const formattedDuration = secondsToMMSS(duration);
	const { handleToggleAudio, currentTrack, isPlaying } =
		useContext(AudioContext);
	const isCurrentTrack = currentTrack.id === track.id;
	return (
		<div className={cn(styles.track, isCurrentTrack && styles.playing)}>
			<IconButton onClick={() => handleToggleAudio(track)}>
				{isPlaying && isCurrentTrack ? <Pause /> : <PlayArrow />}
			</IconButton>
			<img className={styles.preview} src={preview} alt="#" />
			<div className={styles.credits}>
				<b>{title}</b>
				<p>{artists}</p>
			</div>
			<p>{formattedDuration}</p>
		</div>
	);
};

export default Track;
