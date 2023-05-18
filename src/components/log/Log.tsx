interface LogPropsType {
    scanRate: string,
}

const Log = ({ scanRate }: LogPropsType): JSX.Element => {
    return (
        <span className="scanrate_log_text">{`Rate: ${scanRate}`}</span >
    )
}

export default Log;