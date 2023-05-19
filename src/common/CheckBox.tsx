import { ChangeEvent, memo } from "react";

interface CheckBoxPropsType {
    id?: string,
    className: string,
    checked: boolean,
    hidden?: boolean,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

const CheckBox = ({ id, className, checked, hidden, onChange }: CheckBoxPropsType): JSX.Element => {
    return (
        <input id={id} type="checkbox" className={className} checked={checked} hidden={hidden} onChange={onChange} />
    )
}

CheckBox.defaultProps = {
    checked: false,
}

export default memo(CheckBox);