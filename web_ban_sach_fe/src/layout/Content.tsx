import React from "react";
import {LAYOUT_COLOR} from "../colors";
import HeroSection from "../compoments/HeroSection";
import Event from "../compoments/Event";
import ImageEvent from "../data_type/ImageEvent";
import ProductHot from "../compoments/product-hot/ProductHot";
import Book from "../data_type/Book";

export default function Content() {

    const [listImageHeroSection, setListImageHeroSection] = React.useState<string[]>([
        require("../images/hero_section/img1.png"),
        require("../images/hero_section/img2.png"),
        require("../images/hero_section/img3.png"),
        require("../images/hero_section/img4.png"),
        require("../images/hero_section/img5.png"),
        require("../images/hero_section/img6.png"),
        require("../images/hero_section/img7.png"),
        require("../images/hero_section/img8.png"),
    ])
    const [listImageHeroSection1, setListImageHeroSection1] = React.useState<string[]>([
        require("../images/hero_section/img2.png"),
        require("../images/hero_section/img3.png"),
    ])
    const [listImageHeroSection2, setListImageHeroSection2] = React.useState<string[]>([
        require("../images/hero_section/img9.png"),
        require("../images/hero_section/img10.png"),
        require("../images/hero_section/img11.png"),
        require("../images/hero_section/img12.png"),
    ])
    const [listImageEvent, setListImageEvent] = React.useState<ImageEvent[]>([
        {
            url: require("../images/event/sieu_sale_he.png"),
            title: "Siêu Sale Hè",
        },
        {
            url: require("../images/event/le_may.png"),
            title: "Lê Mây",
        },
        {
            url: require("../images/event/hot_wheels.png"),
            title: "Hot Wheels",
        },
        {
            url: require("../images/event/san_pham_duoc_tro_gia.png"),
            title: "Sản Phẩm Được Trợ Giá",
        },
        {
            url: require("../images/event/sieu_sale_he.png"),
            title: "Siêu Sale Hè",
        },
        {
            url: require("../images/event/manga.png"),
            title: "Manga",
        },
        {
            url: require("../images/event/flash_sale.png"),
            title: "Flash Sale",
        },
        {
            url: require("../images/event/ma_giam_gia.png"),
            title: "Mã Giảm Giá",
        },
        {
            url: require("../images/event/do_choi.png"),
            title: "Đồ Chơi",
        },
        {
            url: require("../images/event/phien_cho_sach_cu.png"),
            title: "Phiên Chợ Sách Cũ",
        },
        {
            url: require("../images/event/san_pham_moi.png"),
            title: "Sản Phẩm Mới",
        },

    ])
    const [imageBackgroundProductHot, setImageBackgroundProductHot] = React.useState<string>(require("../images/background/flash_sale.png"))
    const [listProductHot, setListProductHot] = React.useState<Book[]>([
        {
            title: "Sách hay nên đọc",
            price: 100000,
            image: "https://cdn0.fahasa.com/media/catalog/product/f/u/full-bia-ao.jpg",
            discount: 0.1
        },
        {
            title: "Sách hay nên đọc",
            price: 100000,
            image: "https://cdn0.fahasa.com/media/catalog/product/f/u/full-bia-ao.jpg",
            discount: 0.1
        },
        {
            title: "Sách hay nên đọc",
            price: 100000,
            image: "https://cdn0.fahasa.com/media/catalog/product/f/u/full-bia-ao.jpg",
            discount: 0.1
        },
        {
            title: "Sách hay nên đọc",
            price: 100000,
            image: "https://cdn0.fahasa.com/media/catalog/product/f/u/full-bia-ao.jpg",
            discount: 0.1
        },
        {
            title: "Sách hay nên đọc",
            price: 100000,
            image: "https://cdn0.fahasa.com/media/catalog/product/f/u/full-bia-ao.jpg",
            discount: 0.1
        },
        {
            title: "Sách hay nên đọc",
            price: 100000,
            image: "https://cdn0.fahasa.com/media/catalog/product/f/u/full-bia-ao.jpg",
            discount: 0.1
        },
        {
            title: "Sách hay nên đọc",
            price: 100000,
            image: "https://cdn0.fahasa.com/media/catalog/product/f/u/full-bia-ao.jpg",
            discount: 0.1
        }
    ])

    return (
        <div id={"content"} className={"py-4"}
             style={{minHeight: "100vh", backgroundColor: LAYOUT_COLOR}}>
            <HeroSection listImage={listImageHeroSection} listImage1={listImageHeroSection1} listImage2={listImageHeroSection2}/>
            <Event listImage={listImageEvent}/>
            <ProductHot imageBackground={imageBackgroundProductHot} listBook={listProductHot}/>
        </div>
    )
}