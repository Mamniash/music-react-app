import Track from "../../components/Track/Track";
import style from "./MainPage.module.scss";
import tracksList from "../../assets/tracksList";
import { Input } from "@mui/material";
import { useState } from "react";

const MainPage = () => {
	const [tracks, setTracks] = useState(tracksList);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTracks(runSearch(event.target.value));
	};

	const runSearch = (value: string) => {
		return tracksList.filter((track) => {
			const title = track.title.toLowerCase();
			const artists = track.artists.toLocaleLowerCase();
			return (
				title.includes(value.toLocaleLowerCase()) ||
				artists.includes(value.toLocaleLowerCase())
			);
		});
	};

	return (
		<div className={style.search}>
			<Input
				className={style.input}
				placeholder="Find track"
				onChange={handleChange}
			></Input>
			<div className={style.list}>
				{tracks.map((track) => (
					<Track key={track.id} {...track} />
				))}
			</div>
		</div>
	);
};

export default MainPage;
