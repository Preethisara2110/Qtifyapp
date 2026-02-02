import React from "react";
import styles from "./Search.module.css";
import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { truncate } from "../../helpers/helpers";

function Search({ searchData = [], placeholder }) {
  const navigate = useNavigate();

  return (
    <Autocomplete
      freeSolo
      options={searchData}
      getOptionLabel={(option) => option.title || ""}
      onChange={(event, value) => {
        if (value) {
          navigate(`/album/${value.slug}`);
        }
      }}
      renderOption={(props, option) => {
        const artists = option.songs.reduce((acc, curr) => {
          acc.push(...curr.artists);
          return acc;
        }, []);

        return (
          <li {...props} className={styles.listElement}>
            <div>
              <p className={styles.albumTitle}>{option.title}</p>
              <p className={styles.albumArtists}>
                {truncate(artists.join(", "), 40)}
              </p>
            </div>
          </li>
        );
      }}
      renderInput={(params) => (
        <div className={styles.wrapper}>
          <TextField
            {...params}
            placeholder={placeholder}
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <button className={styles.searchButton} type="button">
                  <SearchIcon />
                </button>
              ),
            }}
          />
        </div>
      )}
    />
  );
}

export default Search;