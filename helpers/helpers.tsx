import { FirstLevelMenuItem } from "../interfaces/menu.interface"
import CoursesIcon from "../layouts/Menu/icons/courses.svg"
import { TopLevelCategory } from "../interfaces/page.interface"
import ServicesIcon from "../layouts/Menu/icons/services.svg"
import ProductsIcon from "../layouts/Menu/icons/products.svg"
import BooksIcon from "../layouts/Menu/icons/books.svg"

export const firstLevelMenu: FirstLevelMenuItem[] = [
  {
    route: "courses",
    name: "Курсы",
    icon: <CoursesIcon />,
    id: TopLevelCategory.Courses
  },
  {
    route: "services",
    name: "Сервисы",
    icon: <ServicesIcon />,
    id: TopLevelCategory.Services
  },
  {
    route: "products",
    name: "Продукты",
    icon: <ProductsIcon />,
    id: TopLevelCategory.Products
  },
  {
    route: "books",
    name: "Книги",
    icon: <BooksIcon />,
    id: TopLevelCategory.Books
  }
]

export const priceRu = (price: number): string =>
  price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    .concat(" ₽")
