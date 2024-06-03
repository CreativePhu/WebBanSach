import React from "react";

interface HeroSectionProps {
    listImage: string[],
    listImage1: string[],
    listImage2: string[],
}

const HeroSection: React.FC<HeroSectionProps> = ({listImage, listImage1, listImage2}) => {

    const [images, setImages] = React.useState<string[]>(listImage)
    const [images1, setImages1] = React.useState<string[]>(listImage1)
    const [images2, setImages2] = React.useState<string[]>(listImage2)

    return (
        <div id={"hero-section"} className="container">
            <div className={"row"}>
                <div className={"col-8 pe-0 ps-0"}>
                    <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {
                                images.map((image, index) => {
                                    return (
                                        <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                            <img
                                                src={image}
                                                className="d-block w-100 rounded-4" alt="..."
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <button className="carousel-control-prev" type="button"
                                data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button"
                                data-bs-target="#carouselExampleAutoplaying"
                                data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className={"col-4 pe-0 d-flex flex-column justify-content-between"}>
                    {
                        images1.map((image, index) => {
                            return (
                                <div key={index} className={"row"}>
                                    <img
                                        src={image}
                                        alt="..."
                                        style={{borderRadius: "4%"}}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className={"row mt-4 d-flex justify-content-between"}>
                {
                    images2.map((image, index) => {
                        return (
                                <img
                                    key={index}
                                    className={"p-0 rounded-3"}
                                    src={image}
                                    alt="..."
                                    style={{width: "calc(96%/4)"}}
                                />
                        )
                    })
                }
            </div>
        </div>
    );
};

export default HeroSection;