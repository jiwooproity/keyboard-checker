import { useCallback, useMemo, useState } from "react";

import CheckBox from "@/common/CheckBox";
import { KeyBoardControl, Log } from "@/components";

import lightbulb from "@/assets/svg/lightbulb.svg";
import darkbulb from "@/assets/svg/darkbulb.svg";

const Container = () => {
    const [theme, setTheme] = useState<boolean>(false);
    const [scanRate, setScanRate] = useState<string>('0.0Hz');

    const memoizedTheme = useMemo(() => theme, [theme]);
    const memoizedScanRate = useMemo(() => scanRate, [scanRate]);

    const onChangeTheme = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            document.documentElement.setAttribute('color-theme', 'dark');
        } else {
            document.documentElement.setAttribute('color-theme', 'light');
        }

        setTheme(!memoizedTheme);
    }, [memoizedTheme]);

    return (
        <div className="container">
            <div className="wrapper">
                <div className="navigation_container">
                    <CheckBox id="theme" className="checkbox" checked={memoizedTheme} hidden={true} onChange={onChangeTheme}/>
                    <label htmlFor="theme">
                        <img className="theme_img" src={memoizedTheme ? darkbulb : lightbulb}/>
                    </label>
                    <Log scanRate={memoizedScanRate} />
                </div>
                <div className="keyboard_container">
                    <KeyBoardControl setScanRate={setScanRate} />
                </div>
            </div>
        </div>
    )
}

export default Container;