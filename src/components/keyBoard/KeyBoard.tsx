import { ReactNode, useEffect, useMemo, memo } from "react";

import { KeyDataIF } from "@/utils/keyInterface";
import { getKeyCapInterface } from "@/utils/keyInterface";

import { KeyBoardRow } from "@/components";

interface ComponentPropsType {
    pressed: { [key: string]: boolean },
    children: ReactNode,
    onKeyDown: (e: KeyboardEvent) => void,
    onKeyUp: (e: KeyboardEvent) => void,
}

const top = ['topLine', 'rightTop'] as const;
const left = ['oneLine', 'twoLine', 'threeLine', 'fourLine', 'fiveLine'] as const;
const right = ['rightOneLine', 'rightTwoLine', 'rightThreeLine', 'rightFourLine'] as const;

const KeyBoard = ({ pressed, children, onKeyDown, onKeyUp }: ComponentPropsType): JSX.Element => {
    const [leftTop, rightTop]: KeyDataIF[][] = top.map(getKeyCapInterface);
    const [leftOneLine, leftTwoLine, leftThreeLine, leftFourLine, leftFiveLine]: KeyDataIF[][] = left.map(getKeyCapInterface);
    const [rightOneLine, rightTwoLine, rightThreeLine, rightFourLine]: KeyDataIF[][] = right.map(getKeyCapInterface);

    const memoKeys = useMemo(() => ({
        leftTop,
        rightTop,
        leftOneLine,
        leftTwoLine,
        leftThreeLine,
        leftFourLine,
        leftFiveLine,
        rightOneLine,
        rightTwoLine,
        rightThreeLine,
        rightFourLine
    }), []);

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
                        <KeyBoardRow className="keyboard_top_row"   pressed={pressed} data={memoKeys.leftTop.filter((val) => val.keyCode === "Escape")} />
                        <KeyBoardRow className="keyboard_top_row"   pressed={pressed} data={memoKeys.leftTop.slice(1, 5)} />
                        <KeyBoardRow className="keyboard_top_row"   pressed={pressed} data={memoKeys.leftTop.slice(5, 9)} />
                        <KeyBoardRow className="keyboard_top_row"   pressed={pressed} data={memoKeys.leftTop.slice(9, 13)} />
                    </div>
                    <div className="keyboard_bottom">
                        <KeyBoardRow className="keyboard_row one"   pressed={pressed} data={memoKeys.leftOneLine} />
                        <KeyBoardRow className="keyboard_row two"   pressed={pressed} data={memoKeys.leftTwoLine} />
                        <KeyBoardRow className="keyboard_row three" pressed={pressed} data={memoKeys.leftThreeLine} />
                        <KeyBoardRow className="keyboard_row four"  pressed={pressed} data={memoKeys.leftFourLine} />
                        <KeyBoardRow className="keyboard_row five"  pressed={pressed} data={memoKeys.leftFiveLine} />
                    </div>
                </div>
                <div className="keyboard_right-area">
                    <div className="keyboard_top">
                        <KeyBoardRow className="keyboard_top_row"   pressed={pressed} data={memoKeys.rightTop} />
                    </div>
                    <div className="keyboard_bottom">
                        <KeyBoardRow className="keyboard_row one"   pressed={pressed} data={memoKeys.rightOneLine} />
                        <KeyBoardRow className="keyboard_row two"   pressed={pressed} data={memoKeys.rightTwoLine} />
                        <KeyBoardRow className="keyboard_row three" pressed={pressed} data={[]}/>
                        <KeyBoardRow className="keyboard_row four"  pressed={pressed} data={memoKeys.rightThreeLine} style={{ width: '150px', justifyContent: 'center' }}/>
                        <KeyBoardRow className="keyboard_row five"  pressed={pressed} data={memoKeys.rightFourLine} />
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}

export default memo(KeyBoard);