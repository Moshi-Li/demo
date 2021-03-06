import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { EventI, EventSalientInfoI } from "../../Slices/DataSlice";
import { RootStoreI } from "../../Store";

const generateContent = (
  eventListInput: EventI[],
  paragraph: string,
  gender: "male" | "female" | "mix"
) => {
  let eventList = JSON.parse(JSON.stringify(eventListInput));
  eventList.sort((a: EventI, b: EventI) => {
    return a.verbStartByteText - b.verbEndByteText;
  });

  let index = 0;
  const result = [];
  eventList
    .map((item: EventI) => {
      const { verbStartByteText, verbEndByteText, gender } = item;
      const text = (
        <React.Fragment key={index}>
          {paragraph.substring(index, verbStartByteText)}
        </React.Fragment>
      );
      const span = (
        <span
          style={{
            backgroundColor:
              gender === "male"
                ? "blue"
                : gender === "female"
                ? "red"
                : "silver",
          }}
        >
          {paragraph.substring(verbStartByteText, verbEndByteText)}
        </span>
      );
      result.push(text);
      result.push(span);
      index = verbEndByteText;
    })
    .flat();
  result.push(
    <React.Fragment>
      {paragraph.substring(index, paragraph.length)}
    </React.Fragment>
  );

  return result;
};

const ReactiveParagraph = ({
  gender,
  eventList,
}: {
  gender: "male" | "female" | "mix";
  eventList: EventI[];
}) => {
  const { paragraph } = useSelector((store: RootStoreI) => store.dataReducer);
  const memoizedContent = useMemo(() => {
    return generateContent(eventList, paragraph, gender);
  }, [gender, eventList, paragraph]);

  return (
    <React.Fragment>
      <p className="report--reactive--paragraph">{memoizedContent}</p>
    </React.Fragment>
  );
};

export default ReactiveParagraph;
