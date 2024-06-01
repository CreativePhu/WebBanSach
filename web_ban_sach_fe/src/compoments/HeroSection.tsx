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
        <div className="hero-section container">
            <div className={"row"}>
                <div className={"col-8 pe-1"}>
                    <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {
                                images.map((image, index) => {
                                    return (
                                        <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
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
                <div className={"col-4 d-flex flex-column justify-content-between"}>
                    {
                        images1.map((image, index) => {
                            return (
                                <div className={"row"}>
                                    <img
                                        src={image}
                                        alt="..."
                                        style={{ borderRadius: "4%"}}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className={"row mt-4"}>
                {
                    images2.map((image, index) => {
                        return (
                            <div className={"col-3"}>
                                <img
                                    src={image}
                                    className="rounded-4" alt="..."
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default HeroSection;