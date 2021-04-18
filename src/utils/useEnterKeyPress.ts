import { useEffect } from "react";

export default function useEnterKeyPress(handleOnEnterClick: Function) {
    useEffect(() => {
        const listener = (event: any) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault();
                handleOnEnterClick();
            }
        };
        document.addEventListener("keydown", listener);
    }, [ handleOnEnterClick ]);
}
