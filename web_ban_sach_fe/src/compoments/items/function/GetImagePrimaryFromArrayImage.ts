import BookImageInf from "../../data_type/Product/BookImageInf";

export const GetImagePrimaryFromArrayImage = (arrayImage: BookImageInf[]): string => {
    if (arrayImage.length > 0) {
        return arrayImage.find((image) => image?.primary === true)?.bookImage || ""
    }
    return "";
}