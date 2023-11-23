import { AudioContext } from "../../context/AudioContext";
import { useContext, useEffect, useState } from "react";
import styles from "./PlayBar.module.scss";
import { IconButton, Slider } from "@mui/material";
import { Pause, PlayArrow } from "@mui/icons-material";
import secondsToMMSS from "../../utils/secondsToMMSS";

const PlayBar = () => {
	const { audio, currentTrack, isPlaying, handleToggleAudio } =
		useContext(AudioContext);
	const { artists, preview, title, duration } = currentTrack;
	const formattedDuration = secondsToMMSS(duration);
	const [CurrentTime, setCurrentTime] = useState(0);
	const sliderCurrentTime = Math.round((CurrentTime / duration) * 100);
	const formattedCurrentTime = secondsToMMSS(CurrentTime);

	useEffect(() => {
		setInterval(() => {
			setCurrentTime(audio.currentTime);
		}, 1000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChangeCurrentTime = (
		_event: Event,
		value: number | number[]
	) => {
		if (typeof value === "object") return;
		const time = Math.round((value / 100) * duration);
		setCurrentTime(time);
		audio.currentTime = time;
	};

	return (
		<div className={styles.playbar}>
			<img className={styles.preview} src={preview} alt="#" />
			<IconButton onClick={() => handleToggleAudio(currentTrack)}>
				{isPlaying ? <Pause /> : <PlayArrow />}
			</IconButton>
			<div className={styles.credits}>
				<h4>{title}</h4>
				<p>{artists}</p>
			</div>
			<div className={styles.slider}>
				<p>{formattedCurrentTime}</p>
				<Slider
					step={1}
					min={0}
					max={100}
					value={sliderCurrentTime}
					onChange={handleChangeCurrentTime}
				/>
				<p>{formattedDuration}</p>
			</div>
		</div>
	);
};

export default PlayBar;
