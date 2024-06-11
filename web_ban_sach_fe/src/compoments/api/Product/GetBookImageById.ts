import axios from "axios";
import BookImageInf from "../../data_type/Product/BookImageInf";

const GetBookImageById = async (bookId: number):Promise<BookImageInf[]> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const bookImages: BookImageInf[] = [];
    const response = await axios.get(`${HOST}/books/${bookId}/bookImages`);
    const data:BookImageInf[] = response.data._embedded.bookImages;

    data.forEach((bookImage: BookImageInf) => {
        bookImages.push({
            bookImageID: bookImage.bookImageID,
            bookImage: bookImage.bookImage,
            primary: bookImage.primary,
        });
    });

    return bookImages;
};

export default GetBookImageById;