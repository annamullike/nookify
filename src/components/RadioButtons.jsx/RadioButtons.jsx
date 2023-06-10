import React, { useEffect, useState } from "react";
import styles from "./RadioButtons.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setReduxGenre } from "../../redux/genreReducer";
function RadioButtons() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const token = useSelector((state) => state.token.token);
  const [checkedGenres, setCheckedGenres] = useState([]);
  const genretest = useSelector((state) => state.genres.genres);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/spotify/getgenre"
        );
        console.log("Response status:", response.status);
        if (response.ok) {
          const responseData = await response.json();
          console.log("GENRES", responseData);
          setData(responseData);
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (token !== "") {
      fetchData();
    }
  }, [token]);
  const handlecheckbox = (e) => {
    if (e.target.checked) {
      setCheckedGenres((prev) => [...prev, e.target.value]);
      dispatch(
        setReduxGenre({
          genres: checkedGenres,
        })
      );
    } else {
      setCheckedGenres((prev) =>
        prev.filter((genre) => genre !== e.target.value)
      );
    }
  };
  useEffect(() => {
    dispatch(
      setReduxGenre({
        genres: checkedGenres,
      })
    );
  }, [checkedGenres]);
  const radioButts1 = [];
  const radioButts2 = [];
  const radioButts3 = [];
  for (let i = 0; i < 5; i++) {
    radioButts1.push(
      <div>
        <input
          onChange={handlecheckbox}
          type="checkbox"
          name="radio"
          value={`${data[i]}`}
          id={`gen${i}`}
        />
        <label htmlFor={`gen${i}`}>{data[i]}</label>
      </div>
    );
  }
  for (let i = 5; i < 10; i++) {
    radioButts2.push(
      <div>
        <input
          onChange={handlecheckbox}
          type="checkbox"
          name="radio"
          value={`${data[i]}`}
          id={`gen${i}`}
        />
        <label htmlFor={`gen${i}`}>{data[i]}</label>
      </div>
    );
  }
  for (let i = 10; i < 15; i++) {
    radioButts3.push(
      <div>
        <input
          onChange={handlecheckbox}
          type="checkbox"
          name="radio"
          value={`${data[i]}`}
          id={`gen${i}`}
        />
        <label htmlFor={`gen${i}`}>{data[i]}</label>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      {/* <button onClick={() => console.log(genretest)}>TESTER</button>
      <button onClick={() => console.log("GENRES ", data)}>genres</button> */}
      <h2>Choose up to 5 genres</h2>
      {data && (
        <div className={styles.radioButtons}>
          <div className={styles.butt}>{radioButts1}</div>
          <div className={styles.butt}>{radioButts2}</div>
          <div className={styles.butt}>{radioButts3}</div>
        </div>
      )}
    </div>
  );
}

export default RadioButtons;
