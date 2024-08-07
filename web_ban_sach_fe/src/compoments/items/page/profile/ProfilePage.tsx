import React from "react";
import {AccountProfileInfomationView} from "./AccountInformation/AccountProfileInfomationView";
import {OrderInformationView} from "./OrderInformation/OrderInformationView";
import {UpdateFullNameForm} from "./AccountInformation/FormUpdate/UpdateFullNameForm";
import {UpdatePhoneNumberForm} from "./AccountInformation/FormUpdate/UpdatePhoneNumberForm";
import {UpdateEmailForm} from "./AccountInformation/FormUpdate/UpdateEmailForm";
import {ChangePasswordForm} from "./AccountInformation/FormUpdate/ChangePasswordForm";
import {OrderDetailInformationFormView} from "./OrderInformation/OrderDetail/OrderDetailInformationFormView";

export const ProfilePage = () => {

    const active = "bg-danger text-white";
    const unActive = "bg-light text-danger";
    const [activeTab, setActiveTab] = React.useState<boolean>(true);
    const [isVisibleFullName, setIsVisibleFullName] = React.useState<boolean>(false);
    const [isVisiblePhoneNumber, setIsVisiblePhoneNumber] = React.useState<boolean>(false);
    const [isVisibleEmail, setIsVisibleEmail] = React.useState<boolean>(false);
    const [isVisibleChangePassword, setIsVisibleChangePassword] = React.useState<boolean>(false);
    const [isVisibleOrderDetail, setIsVisibleOrderDetail] = React.useState<boolean>(false);
    const [orderID, setOrderID] = React.useState<number>(0);

    const onCloseFullName = () => {
        setIsVisibleFullName(false);
    }

    const openFullName = () => {
        setIsVisibleFullName(true);
    }

    const onClosePhoneNumber = () => {
        setIsVisiblePhoneNumber(false);
    }

    const openPhoneNumber = () => {
        setIsVisiblePhoneNumber(true);
    }

    const onCloseEmail = () => {
        setIsVisibleEmail(false);
    }

    const openEmail = () => {
        setIsVisibleEmail(true);
    }

    const onCloseChangePassword = () => {
        setIsVisibleChangePassword(false);
    }

    const openChangePassword = () => {
        setIsVisibleChangePassword(true);
    }

    const onCloseOrderDetail = () => {
        setIsVisibleOrderDetail(false);
        setOrderID(0)
    }

    const openOrderDetailByID = (orderID: number) => {
        setOrderID(orderID);
        setIsVisibleOrderDetail(true);
    }

    return (
        <div className={"container-fluid bg-light py-4"}>
            <div className={"container"}>
                <div className={"row d-flex justify-content-lg-between"}>
                    <div className={"col-12 col-md-3 p-0"}>
                        <div className={"bg-white rounded-4 shadow-sm"}>
                            <ul className={"list-unstyled w-100"}>
                                <li>
                                    <div
                                        onClick={() => setActiveTab(true)}
                                        className={`cussor-pointer d-flex justify-content-start align-items-center py-2 px-4 rounded ${activeTab ? active : unActive}`}>
                                        <i className="bi bi-person-circle fs-4"></i>
                                        <span className={"fs-6 fw-semibold ms-2"}>Thông Tin Tài Khoản</span>
                                    </div>
                                </li>
                                <li>
                                    <div
                                        onClick={() => setActiveTab(false)}
                                        className={`cussor-pointer d-flex justify-content-start align-items-center py-2 px-4 rounded ${!activeTab ? active : unActive}`}>
                                        <i className="bi bi-bag-check-fill fs-4"></i>
                                        <span className={"fs-6 fw-semibold ms-2"}>Hóa Đơn</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={"col-12 col-md-9 p-0 pe-md-0 ps-md-2"}>
                        <div style={{minHeight: "500px"}}>
                            {
                                activeTab ? <AccountProfileInfomationView
                                        openEmail={openEmail}
                                        openFullName={openFullName}
                                        openPhoneNumber={openPhoneNumber}
                                        openChangePassword={openChangePassword}/> :
                                    <OrderInformationView openOrderDetail={openOrderDetailByID}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <UpdateFullNameForm isVisible={isVisibleFullName} onClose={onCloseFullName}/>
            <UpdatePhoneNumberForm isVisible={isVisiblePhoneNumber} onClose={onClosePhoneNumber}/>
            <UpdateEmailForm isVisible={isVisibleEmail} onClose={onCloseEmail}/>
            <ChangePasswordForm isVisible={isVisibleChangePassword} onClose={onCloseChangePassword}/>
            <OrderDetailInformationFormView isVisible={isVisibleOrderDetail} onClose={onCloseOrderDetail} orderID={orderID}/>
        </div>
    );
}