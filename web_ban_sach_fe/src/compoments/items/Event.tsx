import React from "react";
import ImageEventInf from "../data_type/Product/ImageEventInf";

interface EventProps {
    listImage: ImageEventInf[];
}

const Event: React.FC<EventProps> = ({listImage}) => {
    return (
        <div id={"event"} className={"container-fluid container-lg mt-4 bg-white rounded-3 py-4 shadow-sm"}>
            <div className={"overflow-x-scroll d-flex flex-row justify-content-xl-around justify-content-lg-around hidden-scrollbar"}>
                {
                    listImage.map((image, index) => {
                        return (
                            <div key={index} className={"d-flex flex-column flex-grow-0 flex-shrink-0 align-items-center justify-content-start text-center me-3 me-xl-0 me-lg-0"} style={{width: "100px"}}>
                                <img src={image.url} className="rounded mx-auto d-block mb-2" alt="..."
                                     style={{width: "50px", height: "50px"}}/>
                                <span>{image.title}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Event;