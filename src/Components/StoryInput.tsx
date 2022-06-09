import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { RootStoreI, useAppDispatch } from "../Store";
import { fetchData } from "../Slices/DataSlice";

import "./StoryInput.scss";

const StoryInput = () => {
  const { fetching } = useSelector((store: RootStoreI) => store.dataReducer);
  const [value, setValue] = useState("");
  const appDispatchAction = useAppDispatch();
  return (
    <div className="story--input--container">
      <textarea
        className="story--input--textarea"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      ></textarea>
      {!fetching && (
        <button
          className="story--input--btn"
          onClick={() => appDispatchAction(fetchData(value))}
        >
          Test
        </button>
      )}
      {fetching && <AiOutlineLoading3Quarters className="loader" />}
    </div>
  );
};

export default StoryInput;
