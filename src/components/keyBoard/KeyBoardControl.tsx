import { Dispatch, SetStateAction, useState } from "react";
import { KeyBoard } from "@/components";

import { convertChar } from "@/utils/convertChar";
import { getKeyName } from "@/utils/keyNames";

const SLEFT = 'ShiftLeft' as const;
const SRIGHT = 'ShiftRight' as const;

interface KeyBoardControlPropsType {
    setScanRate: Dispatch<SetStateAction<string>>;
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
    const [pressedStatus, setPressedStatus] = useState<{ [key: string]: boolean }>({});

    const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setText(value);
    }

    const onChangeActive = ({ code, active }: ChangeActiveIF) => {
        const key = document.getElementById(code);

        if(key) {
            active ? key.classList.add('press') : key.classList.remove('press');
        }
    }

    const onFocus = () => {
        inputFocus = true;
    }

    const onBlur = () => {
        inputFocus = false;
    }
    
    const onKeyDown = (e: KeyboardEvent) => {
        if(!inputFocus) {
            e.preventDefault();
        }

        if (!keyPerformance[e.code]) {
            keyPerformance[e.code] = performance.now()    
        };

        if(!pressedStatus[e.code]) {
            setPressedStatus((state) => { return { ...state, [e.code]: true } })
        }

        onChangeActive({ code: e.code, active: true });
    }

    const onKeyUp = (e: KeyboardEvent) => {
        if(!inputFocus) {
            e.preventDefault();

            let keyName = getKeyName(e.code);
            let upTime = performance.now();
            let heldTime = Math.ceil(upTime - keyPerformance[e.code]);

            bestKeyTime = Math.min(bestKeyTime, heldTime);
            let scanRate = Math.min(1000 / (bestKeyTime), 1000);

            setScanRate(`${scanRate}Hz`);

            const createKeyTextElement = document.createElement('span');
            const createKeyDummyElement = document.createElement('p');
            createKeyTextElement.append(`${convertChar.oneToUpper(keyName)}`);
            createKeyDummyElement.append(`${convertChar.oneToUpper(keyName)}`);

            const createButtonElement = document.createElement('button');
            createButtonElement.appendChild(createKeyTextElement);
            createButtonElement.appendChild(createKeyDummyElement);

            const createListElement = document.createElement('li');
            const performanceContent = document.createTextNode(`${heldTime}ms`);
            createListElement.appendChild(createButtonElement);
            createListElement.appendChild(performanceContent)

            const getTimeAreaElement = document.querySelector('#keyboard_scan-rate_ul');
            getTimeAreaElement.appendChild(createListElement);
            // getTimeAreaElement.insertBefore(createListElement, getTimeAreaElement.firstChild);
            
            const getTimeAreaBox = document.querySelector('#keyboard_scan-rate_area');
            const toTop = getTimeAreaBox.scrollHeight;
            getTimeAreaBox.scrollTo({ top: toTop, behavior: 'auto' }); 
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
    }

    // 입력 활성화 초기화
    const onReset = () => {
        setText('');
        setPressedStatus({});
        const getTimeAreaElement = document.querySelector('#keyboard_scan-rate_ul');
        getTimeAreaElement.textContent = '';
    }

    const onTextReset = () => {
        setText('');
    }

    return (
        <KeyBoard
            state={pressedStatus}
            text={text}
            onChangeText={onChangeText}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onReset={onReset}
            onTextReset={onTextReset}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    )
}

export default KeyBoardControl;