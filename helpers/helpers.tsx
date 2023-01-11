import { FirstLevelMenuItem } from "../interfaces/menu.interface"
import CoursesIcon from "../layouts/Menu/icons/courses.svg"
import { TopLevelCategory } from "../interfaces/page.interface"
import ServicesIcon from "../layouts/Menu/icons/services.svg"
import ProductsIcon from "../layouts/Menu/icons/products.svg"
import BooksIcon from "../layouts/Menu/icons/books.svg"
import { number } from "prop-types"

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

//Регулярка разделяет цену: три цифры отделяет пробелом
export const priceRu = (price: number): string =>
  price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    .concat(" ₽")

export const declOfNum = (
  number: number,
  titles: [string, string, string]
): string => {
  const cases = [2, 0, 1, 1, 1, 2]
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ]
}
