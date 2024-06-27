import React from "react";
import {ProfileInfomation} from "./ProfileInfomation";
import {OrderInformation} from "./OrderInformation";

export const ProfilePage = () => {

    const active = "rounded-5 bg-danger text-white";
    const [activeTab, setActiveTab] = React.useState<boolean>(true);

    return (
        <div className={"container-fluid bg-light py-4"}>
            <div className={"container"}>
                <div className={"row d-flex justify-content-lg-between"}>
                    <div className={"col-3 p-0"}>
                        <div className={"bg-white rounded-4 shadow-sm"} style={{minHeight: "250px"}}>
                            <ul className={"list-unstyled w-100"}>
                                <li>
                                    <div
                                        onClick={() => setActiveTab(true)}
                                        className={`cussor-pointer d-flex justify-content-start align-items-center py-2 px-4 ${activeTab ? active : ""}`}>
                                        <i className="bi bi-person-circle fs-4"></i>
                                        <span className={"fs-6 fw-semibold ms-2"}>Thông Tin Tài Khoản</span>
                                    </div>
                                </li>
                                <li>
                                    <div
                                        onClick={() => setActiveTab(false)}
                                        className={`cussor-pointer d-flex justify-content-start align-items-center py-2 px-4 ${!activeTab ? active : ""}`}>
                                        <i className="bi bi-bag-check-fill fs-4"></i>
                                        <span className={"fs-6 fw-semibold ms-2"}>Hóa Đơn</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={"col-9 pe-0"}>
                        <div style={{minHeight: "500px"}}>
                            {
                                activeTab ? <ProfileInfomation/> : <OrderInformation/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}