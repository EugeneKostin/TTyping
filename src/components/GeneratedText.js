import React from "react";

function GeneratedText(props) {
    return (
        <div className="generated-text">
            <span className="generated-text_out">
                {props.textProps.passedChars}
            </span>
            <span className={"generated-text_cur " + (props.textProps.curCharCorrect ? "" : "wrong")}>{props.textProps.currentChar}</span>
            <span>{props.textProps.incomingChars}</span>
        </div>
    )
}

export default GeneratedText;


