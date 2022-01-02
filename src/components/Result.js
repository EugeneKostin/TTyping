import React from "react";

function Result(props) {
  return (
    <div className="App-content__result">
      <div className="App-content__result-content">
        passed chars: {props.resultProps.passedChars.length} |
        cpm: {props.resultProps.cpm} |
        accuracy: {props.resultProps.accuracy}
        </div>
      <div class="overlay"></div>
    </div>
  )
}

export default Result;