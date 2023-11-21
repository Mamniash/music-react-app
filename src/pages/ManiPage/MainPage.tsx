import Track from "../../components/Track/Track";
import style from "./MainPage.module.scss";
import tracksList from "../../assets/tracksList";
import { Input } from "@mui/material";

const MainPage = () => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return (
    <div className={style.search}>
      <Input
        className={style.input}
        placeholder="Find track"
        onChange={handleChange}
      ></Input>
      <div className={style.list}>
        {tracksList.map((track) => (
          <Track key={track.id} {...track} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
