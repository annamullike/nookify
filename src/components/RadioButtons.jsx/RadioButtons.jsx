import React, { useEffect, useState } from "react";
import styles from "./RadioButtons.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setReduxGenre } from "../../redux/genreReducer";
function RadioButtons() {
    const dispatch = useDispatch()
  const [data, setData] = useState([]);
  const token = useSelector((state) => state.token.token);
  const [checkedGenres, setCheckedGenres] = useState([]);
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
      dispatch(setReduxGenre({
        genres: checkedGenres
      }));
    } else {
      setCheckedGenres((prev) => 
        prev.filter((genre) => genre !== e.target.value)
      )
      dispatch(setReduxGenre({
        genres: checkedGenres
      }))
    }
  };
  const radioButts = [];
  for (let i = 0; i < 15; i++) {
    radioButts.push(
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
    <div>
      <button onClick={() => console.log(checkedGenres)}>TESTER</button>
      <button onClick={() => console.log("GENRES ", data)}>genres</button>
      <h2>Choose up to 5 genres</h2>
      {data && radioButts}
    </div>
  );
}

export default RadioButtons;
