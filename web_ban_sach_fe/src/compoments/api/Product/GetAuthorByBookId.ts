import axios from "axios";
import BookInf from "../../data_type/Product/BookInf";
import AuthorInf from "../../data_type/Product/AuthorInf";

const GetAuthorByBookID = async (bookId: number):Promise<AuthorInf[]> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const authors: AuthorInf[] = [];
    const response = await axios.get(`${HOST}/authors/search/findByBooksBookID?bookID=${bookId}`);
    const data:AuthorInf[] = response.data._embedded.authors;

    data.forEach((author: AuthorInf) => {
        authors.push({
            authorID: author.authorID,
            authorName: author.authorName,
        });
    });

    return authors;
};

export default GetAuthorByBookID;