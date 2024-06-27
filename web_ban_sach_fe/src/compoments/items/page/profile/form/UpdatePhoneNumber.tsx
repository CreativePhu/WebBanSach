import React from "react";
import {FullScreenOverlay} from "../../../FullScreenOverlay";

interface UpdatePhoneNumberProps {
    isVisible: boolean;
    onClose: () => void;
}

export const UpdatePhoneNumber : React.FC<UpdatePhoneNumberProps> = ({isVisible, onClose}) => {

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
            <div ref={modalRef} className={"rounded bg-white px-5 py-5 position-relative"} style={{width: "450px", minHeight: "250px"}}>
                <p className={"text-danger fw-semibold fs-3"}>Cập nhật số điện thoại</p>
                <label htmlFor={"phoneNumber"} className={"fw-semibold mt-2"}>Số điện thoại</label>
                <input id={"phoneNumber"} type="text" className={"form-control mt-1 py-2 rounded-3"}
                       placeholder={"Số điện thoại của bạn"}/>
                <button className={"btn btn-danger w-100 mt-3 rounded-3"}>Cập nhật</button>
                <div onClick={() => {onClose()}} className={"position-absolute cussor-pointer"} style={{top: "10px", right: "20px"}}>
                    <i className="bi bi-x fs-2"></i>
                </div>
            </div>
        </FullScreenOverlay>
    );
}