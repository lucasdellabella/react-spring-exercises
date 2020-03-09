import React, { useState } from "react";
import { animated, useSpring, useSprings } from "react-spring";
import { useDrag } from "react-use-gesture";
import swap from "lodash-move";
import "./styles.css";

const Div = animated.div;
const ELEMENT_HEIGHT = 60;

export const MovingDiv = ({ style, children, ...gestureHandlers }) => {
  return (
    <Div {...gestureHandlers} className="colored-div noselect" style={style}>
      {children}
    </Div>
  );
};

export default function App() {
  const [words, setWords] = useState(["A", "B", "C", "D"]);
  const springs = useSprings(
    words.length,
    words.map((w, i) => ({
      transform: `translate(0px,${i * ELEMENT_HEIGHT}px)`
    }))
  );
  // The callback keeps track of how much the user has dragged,
  // .. and when the user has dragged enough, we change its place in our words statelist
  const createHandlers = useDrag(({ movement, last, args }) => {
    const [_, dY] = movement;
    const [currentWord] = args;
    const currentWordIndex = words.indexOf(currentWord);
    const newSlotOffset = Math.floor(dY / ELEMENT_HEIGHT);

    if (newSlotOffset > -1 && newSlotOffset < words.length) {
      setWords(swap(words, currentWordIndex, newSlotOffset));
    }
  });

  return (
    <div className="App">
      {words.map((currentWord, i) => (
        <MovingDiv
          {...createHandlers(currentWord)}
          style={{ ...springs[i] }}
          key={i}
        >
          {currentWord}
        </MovingDiv>
      ))}
    </div>
  );
}
