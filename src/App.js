import React, { useState } from "react";
import { animated, useSpring, useSprings } from "react-spring";
import { useDrag } from "react-use-gesture";
import swap from "lodash-move";
import "./styles.css";

const Div = animated.div;

export const MovingDiv = ({ style, children, ...gestureHandlers }) => {
  return (
    <Div {...gestureHandlers} className="colored-div noselect" style={style}>
      {children}
    </Div>
  );
};

const MIN_DRAG_AMT = 60;

export default function App() {
  const [words, setWords] = useState(["A", "B", "C", "D"]);
  // The callback keeps track of how much the user has dragged,
  // .. and when the user has dragged enough, we change its place in our words statelist
  const createHandlers = useDrag(({ movement, last, args }) => {
    const [_, dY] = movement;
    const [currentWord] = args;
    const currentWordIndex = words.indexOf(currentWord);
    const newSlotOffset = Math.floor(dY / MIN_DRAG_AMT);

    if (newSlotOffset > -1 && newSlotOffset < words.length) {
      setWords(swap(words, currentWordIndex, newSlotOffset));
    }

    // if (currentWordIndex != newSlotOffset) {
    //   console.log(currentWordIndex);
    //   console.log(newSlotOffset);
    //   console.log("-");
    // }
  });

  return (
    <div className="App">
      {words.map((currentWord, currentWordIndex) => (
        <MovingDiv
          {...createHandlers(currentWord)}
          style={{ transform: `translate(0px,${currentWordIndex * 60}px)` }}
        >
          {currentWord}
        </MovingDiv>
      ))}
    </div>
  );
}
