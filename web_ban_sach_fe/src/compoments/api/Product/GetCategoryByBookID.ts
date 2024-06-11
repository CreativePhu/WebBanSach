import axios from "axios";
import BookInf from "../../data_type/Product/BookInf";
import AuthorInf from "../../data_type/Product/AuthorInf";
import CategoryInf from "../../data_type/Product/CategoryInf";

const GetAuthorByBookID = async (bookId: number):Promise<CategoryInf[]> => {
    const HOST = process.env.REACT_APP_HOST_BE;
    const categories: CategoryInf[] = [];
    const response = await axios.get(`${HOST}/categories/search/findByBooksBookID?bookID=${bookId}`);
    const data:CategoryInf[] = response.data._embedded.categories;

    data.forEach((category: CategoryInf) => {
        categories.push({
            categoryID: category.categoryID,
            categoryName: category.categoryName
        });
    });

    return categories;
};

export default GetAuthorByBookID;