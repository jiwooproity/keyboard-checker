import { ChangeEvent } from "react";

interface TextAreaPropsType {
    value: string,
    onBlur: () => void,
    onFocus: () => void,
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = ({ value, onBlur, onFocus, onChange }: TextAreaPropsType): JSX.Element => {
    return (
        <textarea value={value} onBlur={onBlur} onFocus={onFocus} onChange={onChange} />
    )
};

TextArea.defaultProps = {
    value: "",
}

export default TextArea;