import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./App.scss";

import ReactiveParagraph from "./Components/ReactiveParagraph";
import ReactiveGraph from "./Components/ReactiveGraph";
import RawData from "./Components/RawData";
import Filter from "./Components/Filter";

import { RootStoreI } from "./Store";
import { sourceData } from "./Slices/DataSlice";

function App() {
  const dispatchAction = useDispatch();
  const { sourced, paragraph, occurrenceList } = useSelector(
    (store: RootStoreI) => store.dataReducer
  );

  useEffect(() => {
    dispatchAction(sourceData());
  }, [dispatchAction]);

  return (
    <div className="App">
      <header className="paragraph">
        <p className="paragraph--content">{paragraph}</p>
        {sourced && (
          <React.Fragment>
            <Filter></Filter>
            <ReactiveParagraph
              paragraph={paragraph}
              occurrenceList={occurrenceList}
            ></ReactiveParagraph>

            <ReactiveGraph></ReactiveGraph>
            <h1>Raw Data</h1>
            <RawData></RawData>
          </React.Fragment>
        )}
      </header>
    </div>
  );
}

export default App;
