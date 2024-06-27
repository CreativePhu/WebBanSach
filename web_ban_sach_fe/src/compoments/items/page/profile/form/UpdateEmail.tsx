import React from "react";
import {FullScreenOverlay} from "../../../FullScreenOverlay";

interface UpdateEmailProps {
    isVisible: boolean;
    onClose: () => void;
}

export const UpdateEmail : React.FC<UpdateEmailProps> = ({isVisible, onClose}) => {

    const modalRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    })

    return (
        <FullScreenOverlay isVisible={isVisible}>
            <div ref={modalRef}  className={"rounded bg-white px-5 py-5 position-relative"} style={{width: "450px", minHeight: "250px"}}>
                <p className={"text-danger fw-semibold fs-3"}>Cập nhật Email</p>
                <label htmlFor={"email"} className={"fw-semibold"}>Email</label>
                <input id={"email"} type="text" className={"form-control mt-1 py-2 rounded-3"}
                       placeholder={"Email mới của bạn"}/>
                <button className={"btn btn-danger w-100 mt-3 rounded-3"}>Cập nhật</button>
                <div onClick={() => {onClose()}} className={"position-absolute cussor-pointer"} style={{top: "10px", right: "20px"}}>
                    <i className="bi bi-x fs-2"></i>
                </div>
            </div>
        </FullScreenOverlay>
    );
}