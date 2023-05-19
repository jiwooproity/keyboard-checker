import { CSSProperties, memo } from "react";

import Button from "@/common/Button";

import { KeyDataIF } from "@/utils/keyInterface";

interface RowComponentTypes {
    data: KeyDataIF[];
    pressed: { [key: string]: boolean };
    className?: string;
    style?: CSSProperties;
}

const KeyBoardRow = ({ pressed, data, className, style }: RowComponentTypes): JSX.Element => {
    const KeyLineElement = (value: KeyDataIF, index: number): JSX.Element => {
        const keyPressed = pressed[value.keyCode] || false;

        return (
            <Button
                id={value.keyCode}
                key={index}
                className={`${value.keyCap}${keyPressed ? " press active" : ""}`}
                buttonText={value.keyCap}
            />
        )
    }

    return (
        <div className={className} style={style}>
            {data.map(KeyLineElement)}
        </div>
    )
}

KeyBoardRow.defaultProps = {
    className: "",
    style: {}
}

export default memo(KeyBoardRow);