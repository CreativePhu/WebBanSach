import React from "react";
import {LAYOUT_COLOR} from "../../colors";
import HeroSection from "../items/HeroSection";
import Event from "../items/Event";
import ImageEventInf from "../../data_type/ImageEventInf";
import ProductHot from "../product-hot/ProductHot";
import BookInf from "../../data_type/BookInf";
import ListBook from "../list-book/ListBook";

export default function Content() {

    const [listImageHeroSection, setListImageHeroSection] = React.useState<string[]>([
        "images/hero_section/img1.png",
        "images/hero_section/img2.png",
        "images/hero_section/img3.png",
        "images/hero_section/img4.png",
        "images/hero_section/img5.png",
        "images/hero_section/img6.png",
        "images/hero_section/img7.png",
        "images/hero_section/img8.png",
    ])
    const [listImageHeroSection1, setListImageHeroSection1] = React.useState<string[]>([
        "images/hero_section/img2.png",
        "/images/hero_section/img3.png"
    ])
    const [listImageHeroSection2, setListImageHeroSection2] = React.useState<string[]>([
        "images/hero_section/img9.png",
        "images/hero_section/img10.png",
        "images/hero_section/img11.png",
        "images/hero_section/img12.png",
    ])
    const [listImageEvent, setListImageEvent] = React.useState<ImageEventInf[]>([
        {
            url: "/images/event/sieu_sale_he.png",
            title: "Siêu Sale Hè",
        },
        {
            url: "/images/event/le_may.png",
            title: "Lê Mây",
        },
        {
            url: "/images/event/hot_wheels.png",
            title: "Hot Wheels",
        },
        {
            url: "/images/event/san_pham_duoc_tro_gia.png",
            title: "Sản Phẩm Được Trợ Giá",
        },
        {
            url: "/images/event/sieu_sale_he.png",
            title: "Siêu Sale Hè",
        },
        {
            url: "/images/event/manga.png",
            title: "Manga",
        },
        {
            url: "/images/event/flash_sale.png",
            title: "Flash Sale",
        },
        {
            url: "/images/event/ma_giam_gia.png",
            title: "Mã Giảm Giá",
        },
        {
            url: "/images/event/do_choi.png",
            title: "Đồ Chơi",
        },
        {
            url: "/images/event/phien_cho_sach_cu.png",
            title: "Phiên Chợ Sách Cũ",
        },
        {
            url: "/images/event/san_pham_moi.png",
            title: "Sản Phẩm Mới",
        },

    ])

    return (
        <div id={"content"} className={"py-4"}
             style={{minHeight: "100vh", backgroundColor: LAYOUT_COLOR}}>
            <HeroSection listImage={listImageHeroSection} listImage1={listImageHeroSection1} listImage2={listImageHeroSection2}/>
            <Event listImage={listImageEvent}/>
            <ProductHot />
            <ListBook />
        </div>
    )
}