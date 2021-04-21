import { isMobile } from "react-device-detect";

const PressEnterText = () => {
    return (
        <>{ !isMobile && <><span>or press</span> <strong>ENTER</strong></> }</>
    )
}

export default PressEnterText
