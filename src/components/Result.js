import React from "react";

function Result(props) {
  return (
    <div className="app-content__result">
      <div className="app-content__result-content">
        <div className="app-content__result-header">Результаты</div>
        <div className="app-content__result-container">
          <div className="app-content__result-item">
            <div className="app-content__result-item-value">{props.resultProps.passedChars.length}</div>
            <div className="app-content__result-item-label">знаков напечатано</div>
          </div>
          <div className="app-content__result-item">
            <div className="app-content__result-item-value">{props.resultProps.cpm}<sup>зн./мин</sup></div>
            <div className="app-content__result-item-label">Скорость</div>
          </div>
          <div className="app-content__result-item">
            <div className="app-content__result-item-value">{props.resultProps.accuracy}<sup>%</sup></div>
            <div className="app-content__result-item-label">Точность</div>
          </div>
        </div>
        <button onClick={() => window.location.reload(false)} className='app__button app__button_large'>Ещё раз</button>
      </div>
      <div class="overlay"></div>
    </div>
  )
}

export default Result;