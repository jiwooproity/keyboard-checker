import { memo, useEffect } from "react";

import { KeyDataIF } from "@/utils/keyInterface";
import { getKeyCapInterface } from "@/utils/keyInterface";

import { Button, TextArea } from "@/common";
import { KeyBoardRow } from "@/components";

interface ComponentPropsType {
    state: { [key: string]: boolean };
    text: string;
    onChangeText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onKeyDown: (e: KeyboardEvent) => void;
    onKeyUp: (e: KeyboardEvent) => void;
    onReset: () => void;
    onTextReset: () => void;
    onFocus: () => void;
    onBlur: () => void;
}

const top = ['topLine', 'rightTop'] as const;
const left = ['oneLine', 'twoLine', 'threeLine', 'fourLine', 'fiveLine'] as const;
const right = ['rightOneLine', 'rightTwoLine', 'rightThreeLine', 'rightFourLine'] as const;

const KeyBoard = ({ state, text, onChangeText, onKeyDown, onKeyUp, onReset, onTextReset, onFocus, onBlur }: ComponentPropsType): JSX.Element => {
    const [topLine, rightTop]: KeyDataIF[][] = top.map(getKeyCapInterface);
    const [oneLine, twoLine, threeLine, fourLine, fiveLine]: KeyDataIF[][] = left.map(getKeyCapInterface);
    const [rightOneLine, rightTwoLine, rightThreeLine, rightFourLine]: KeyDataIF[][] = right.map(getKeyCapInterface);

    useEffect(() => {       
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener('keyup', onKeyUp);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener('keyup', onKeyUp);
        }
    }, []);

    return (
        <div className="keyboard_area">
            <div className="keyboard_box">
                <div className="keyboard_left-area">
                    <div className="keyboard_top">
                        <KeyBoardRow className="keyboard_top_row"   state={state} data={topLine.filter((val) => val.keyCode === "Escape")} />
                        <KeyBoardRow className="keyboard_top_row"   state={state} data={topLine.slice(1, 5)} />
                        <KeyBoardRow className="keyboard_top_row"   state={state} data={topLine.slice(5, 9)} />
                        <KeyBoardRow className="keyboard_top_row"   state={state} data={topLine.slice(9, 13)} />
                    </div>
                    <div className="keyboard_bottom">
                        <KeyBoardRow className="keyboard_row one"   state={state} data={oneLine} />
                        <KeyBoardRow className="keyboard_row two"   state={state} data={twoLine} />
                        <KeyBoardRow className="keyboard_row three" state={state} data={threeLine} />
                        <KeyBoardRow className="keyboard_row four"  state={state} data={fourLine} />
                        <KeyBoardRow className="keyboard_row five"  state={state} data={fiveLine} />
                    </div>
                </div>
                <div className="keyboard_right-area">
                    <div className="keyboard_top">
                        <KeyBoardRow className="keyboard_top_row"   state={state} data={rightTop} />
                    </div>
                    <div className="keyboard_bottom">
                        <KeyBoardRow className="keyboard_row one"   state={state} data={rightOneLine} />
                        <KeyBoardRow className="keyboard_row two"   state={state} data={rightTwoLine} />
                        <KeyBoardRow className="keyboard_row three" state={state} data={[]}/>
                        <KeyBoardRow className="keyboard_row four"  state={state} data={rightThreeLine} style={{ width: '150px', justifyContent: 'center' }}/>
                        <KeyBoardRow className="keyboard_row five"  state={state} data={rightFourLine} />
                    </div>
                </div>
            </div>
            <div className="keyboard_scan-box">
                <div className="keyboard_memo_area">
                    <TextArea value={text} onBlur={onBlur} onFocus={onFocus} onChange={onChangeText} />
                </div>
                <div id="keyboard_scan-rate_area" className="keyboard_scan-rate_area">
                    <ul id="keyboard_scan-rate_ul" className="keyboard_scan-rate_ul"></ul>
                </div>
            </div>
            <div className="keyboard_button-area">
                <Button className="text-reset btn" buttonText="Memo Reset" onClick={onTextReset}/>
                <Button className="all-reset btn" buttonText="All Reset" onClick={onReset}/>
            </div>
        </div>
    )
}

export default memo(KeyBoard);