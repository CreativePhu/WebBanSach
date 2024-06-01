import React from "react";
import ImageEvent from "../data_type/ImageEvent";

interface EventProps {
    listImage: ImageEvent[];
}

const Event: React.FC<EventProps> = ({listImage}) => {
    return (
        <div id={"event"} className={"container mt-4 bg-white rounded-4 d-flex flex-row justify-content-around align-items-start py-4"}>
            {
                listImage.map((image, index) => {
                    return (
                        <div key={index} className={"text-center"} style={{width: "calc(100%/11)"}}>
                            <img src={image.url} className="rounded mx-auto d-block mb-2" alt="..."
                                 style={{width: "50px", height: "50px"}}/>
                            <span>{image.title}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Event;