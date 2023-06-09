import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { KeyBoard } from "@/components";

import { convertChar } from "@/utils/convertChar";
import { getKeyName } from "@/utils/keyNames";
import Button from "@/common/Button";
import TextArea from "@/common/TextArea";

const SLEFT = 'ShiftLeft' as const;
const SRIGHT = 'ShiftRight' as const;

interface KeyBoardControlPropsType {
    setScanRate: Dispatch<SetStateAction<string>>
}

interface ChangeActiveIF {
    code: string;
    active: boolean;
}

let bestKeyTime = 10000;
let keyPerformance: { [key: string]: number } = {};
let inputFocus: boolean = false;

const KeyBoardControl = ({ setScanRate }: KeyBoardControlPropsType): JSX.Element => {
    const [text, setText] = useState<string>('');
    const [pressed, setPressed] = useState<{ [key: string]: boolean }>({});

    const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setText(value);
    };

    const onChangeActive = useCallback(({ code, active }: ChangeActiveIF) => {
        const key = document.getElementById(code);

        if(key) {
            active ? key.classList.add('press') : key.classList.remove('press');
        }
    }, []);

    const onTextAreaEvent = () => {
        inputFocus = !inputFocus;
    };

    const onCreateLog = (keyName: string, heldTime: number) => {
        const createKeyTextElement = document.createElement('span');
        createKeyTextElement.append(`${convertChar.oneToUpper(keyName)}`);

        const createKeyDummyElement = document.createElement('p');
        createKeyDummyElement.append(`${convertChar.oneToUpper(keyName)}`);

        const createButtonElement = document.createElement('button');
        createButtonElement.appendChild(createKeyTextElement);
        createButtonElement.appendChild(createKeyDummyElement);

        const createListElement = document.createElement('li');
        createListElement.appendChild(createButtonElement);

        const performanceContent = document.createTextNode(`${heldTime}ms`);
        createListElement.appendChild(performanceContent)

        const getTimeAreaElement = document.querySelector('#keyboard_scan-rate_ul');
        getTimeAreaElement.appendChild(createListElement);
        // getTimeAreaElement.insertBefore(createListElement, getTimeAreaElement.firstChild);
        
        const getTimeAreaBox = document.querySelector('#keyboard_scan-rate_area');
        const toTop = getTimeAreaBox.scrollHeight;
        
        getTimeAreaBox.scrollTo({ top: toTop, behavior: 'auto' }); 
    };
    
    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if(!inputFocus) {
            e.preventDefault();
        }

        if (!keyPerformance[e.code]) {
            keyPerformance[e.code] = performance.now()    
        };

        if(!pressed[e.code]) {
            setPressed((state) => { return { ...state, [e.code]: true } })
        }

        onChangeActive({ code: e.code, active: true });
    }, []);

    const onKeyUp = useCallback((e: KeyboardEvent) => {
        if(!inputFocus) {
            e.preventDefault();

            let keyName = getKeyName(e.code);
            let upTime = performance.now();
            let heldTime = Math.ceil(upTime - keyPerformance[e.code]);

            bestKeyTime = Math.min(bestKeyTime, heldTime);
            let scanRate = Math.min(1000 / (bestKeyTime), 1000);

            setScanRate(`${scanRate}Hz`);
            onCreateLog(keyName, heldTime);
        }

        switch (e.code) {
            case SLEFT:
            case SRIGHT:
                const SHIFTKEYS = [SLEFT, SRIGHT];
                SHIFTKEYS.forEach((val) => onChangeActive({ code: val, active: false }));
                break;
            default:
                onChangeActive({ code: e.code, active: false });
                break;
        }

        keyPerformance[e.code] = null;
    }, []);

    // 입력 활성화 초기화
    const onReset = () => {
        setText('');
        setPressed({});
        const getTimeAreaElement = document.querySelector('#keyboard_scan-rate_ul');
        getTimeAreaElement.textContent = '';
    };

    const onTextReset = () => {
        setText('');
    };

    return (
        <KeyBoard
            pressed={pressed}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
        >
            <div className="keyboard_scan-box">
                <div className="keyboard_memo_area">
                    <TextArea value={text} onBlur={onTextAreaEvent} onFocus={onTextAreaEvent} onChange={onChangeText} />
                </div>
                <div id="keyboard_scan-rate_area" className="keyboard_scan-rate_area">
                    <ul id="keyboard_scan-rate_ul" className="keyboard_scan-rate_ul"></ul>
                </div>
            </div>
            <div className="keyboard_button-area">
                <Button className="text-reset btn" buttonText="Memo Reset" onClick={onTextReset}/>
                <Button className="all-reset btn" buttonText="All Reset" onClick={onReset}/>
            </div>
        </KeyBoard>
    )
}

export default KeyBoardControl;