import React from "react";
import {FullScreenOverlay} from "../../../FullScreenOverlay";

interface UpdatePhoneNumberProps {
    isVisible: boolean;
    onClose: () => void;
}

export const UpdatePhoneNumber : React.FC<UpdatePhoneNumberProps> = ({isVisible, onClose}) => {

    return (
        <FullScreenOverlay isVisible={isVisible}>
            <div className={"rounded bg-white px-5 py-5 position-relative"} style={{width: "450px", minHeight: "250px"}}>
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