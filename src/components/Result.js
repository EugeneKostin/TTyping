import React from "react";

function Result(props) {
  return (
    <div className="app-content__result">
      <div className="app-content__result-content">
        passed chars: {props.resultProps.passedChars.length} |
        cpm: {props.resultProps.cpm} |
        accuracy: {props.resultProps.accuracy}
        <button onClick={() => window.location.reload(false)} className='app-refresh-button'>Еще раз</button>
      </div>
      <div class="overlay"></div>
    </div>
  )
}

export default Result;