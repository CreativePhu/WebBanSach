import React from "react";
import {FullScreenOverlay} from "../../../FullScreenOverlay";

interface UpdateFullNameProps {
    isVisible: boolean;
    onClose: () => void;
}

export const UpdateFullName : React.FC<UpdateFullNameProps> = ({isVisible, onClose}) => {

    return (
        <FullScreenOverlay isVisible={isVisible}>
            <div className={"rounded bg-white px-5 py-5 position-relative"} style={{width: "450px", minHeight: "350px"}}>
                <span className={"text-danger fw-semibold fs-3"}>Cập nhật tên của bạn</span>
                <p className={"text-danger"}>Tên sẽ được hiển thị trên trang cá nhân và các bài viết của bạn</p>
                <label htmlFor={"fullName"} className={"fw-semibold"}>Họ và Tên</label>
                <input id={"fullName"} type="text" className={"form-control mt-1 py-2 rounded-3"}
                       placeholder={"Tên mới của bạn"}/>
                <button className={"btn btn-danger w-100 mt-3 rounded-3"}>Cập nhật</button>
                <div onClick={() => {onClose()}} className={"position-absolute cussor-pointer"} style={{top: "10px", right: "20px"}}>
                    <i className="bi bi-x fs-2"></i>
                </div>
            </div>
        </FullScreenOverlay>
    );
}