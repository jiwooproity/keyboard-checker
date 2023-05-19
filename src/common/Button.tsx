import { memo } from "react";

type ButtonPropsType = {
    id?: string;
    key?: number;
    className?: string;
    buttonText: string;
    onClick?: () => void;
}

const Button = ({ id, key, className, buttonText, onClick }: ButtonPropsType): JSX.Element => {
    return (
        <button id={id} key={key} className={className} onClick={onClick}>
            <span>{buttonText}</span>
        </button>
    )
}

Button.defaultProps = {
    id: "",
    key: "",
    className: "",
}

export default memo(Button);