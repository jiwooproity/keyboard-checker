import { useEffect } from "react";

import { KeyDataIF } from "@/utils/keyInterface";
import { getKeyCapInterface } from "@/utils/keyInterface";

import { Button } from "@/common";
import { KeyBoardRow } from "@/components";

type ComponentPropsType = {
    state: { [key: string]: boolean };
    onKeyDown: (e: KeyboardEvent) => void;
    onKeyUp: (e: KeyboardEvent) => void;
    onReset: () => void;
}

const KeyBoard = ({ state, onKeyDown, onKeyUp, onReset }: ComponentPropsType): JSX.Element => {
    const keyLineArray = ['topLine', 'oneLine', 'twoLine', 'threeLine', 'fourLine', 'fiveLine'];
    const [topLine, oneLine, twoLine, threeLine, fourLine, fiveLine]: KeyDataIF[][] = keyLineArray.map((value) => getKeyCapInterface(value));

    useEffect(() => {        
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener('keyup', onKeyUp);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener('keyup', onKeyUp);
        }
    }, []);

    const KeyLineElement = (value: KeyDataIF, index: number): JSX.Element => {
        const keyPressed = state[value.keyCode] || false;

        return <Button id={value.keyCode} key={index} className={`${value.keyCap}${keyPressed ? " press active" : ""}`} buttonText={value.keyCap} />
    }

    return (
        <div className="keyboard_area">
            <div className="keyboard_scan-rate_area">
                <ul id="keyboard_scan-rate_ul" className="keyboard_scan-rate_ul"></ul>
            </div>
            <div className="keyboard_box">
                <div className="keyboard_top">
                    <KeyBoardRow className="keyboard_top_row" createElement={KeyLineElement} data={topLine.filter((val) => val.keyCode === "Escape")} />
                    <KeyBoardRow className="keyboard_top_row" createElement={KeyLineElement} data={topLine.slice(1, 5)} />
                    <KeyBoardRow className="keyboard_top_row" createElement={KeyLineElement} data={topLine.slice(5, 9)} />
                    <KeyBoardRow className="keyboard_top_row" createElement={KeyLineElement} data={topLine.slice(9, 13)} />
                </div>
                <div className="keyboard_bottom">
                    <KeyBoardRow className="keyboard_row one"   createElement={KeyLineElement} data={oneLine} />
                    <KeyBoardRow className="keyboard_row two"   createElement={KeyLineElement} data={twoLine} />
                    <KeyBoardRow className="keyboard_row three" createElement={KeyLineElement} data={threeLine} />
                    <KeyBoardRow className="keyboard_row four"  createElement={KeyLineElement} data={fourLine} />
                    <KeyBoardRow className="keyboard_row five"  createElement={KeyLineElement} data={fiveLine} />
                </div>
            </div>
            <div className="keyboard_button-area">
                <Button buttonText="Reset" onClick={onReset} />
            </div>
        </div>
    )
}

export default KeyBoard;