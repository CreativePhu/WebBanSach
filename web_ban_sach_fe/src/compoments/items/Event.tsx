import React from "react";
import ImageEvent from "../../data_type/ImageEvent";

interface EventProps {
    listImage: ImageEvent[];
}

const Event: React.FC<EventProps> = ({listImage}) => {
    return (
        <div id={"event"} className={"container mt-4 bg-white rounded-4 py-4"}>
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