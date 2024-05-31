import React from "react";
import {LAYOUT_COLOR} from "../colors";
import HeroSection from "../compoments/HeroSection";

export default function Content() {

    const [listImage, setListImage] = React.useState<string[]>([
        require("../images/image_hero_section/img1.png"),
        require("../images/image_hero_section/img2.png"),
        require("../images/image_hero_section/img3.png"),
        require("../images/image_hero_section/img4.png"),
        require("../images/image_hero_section/img5.png"),
        require("../images/image_hero_section/img6.png"),
        require("../images/image_hero_section/img7.png"),
        require("../images/image_hero_section/img8.png"),
    ])
    const [listImage1, setListImage1] = React.useState<string[]>([
        require("../images/image_hero_section/img2.png"),
        require("../images/image_hero_section/img3.png"),
    ])

    return (
        <div className={"content py-4"}
             style={{minHeight: "100vh", backgroundColor: LAYOUT_COLOR}}>
            <HeroSection listImage={listImage} listImage1={listImage1}/>
        </div>
    )
}