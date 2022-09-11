import { withLayout } from "../../layouts/Layout"
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import axios from "axios"
import { MenuItem } from "../../interfaces/menu.interface"
import { TopPageModel } from "../../interfaces/page.interface"
import { ParsedUrlQuery } from "querystring"
import { ProductModel } from "../../interfaces/product.interface"

//Главная категория первая, при первичном заходе (логично)
const firstCategory = 0

//Страница конкретного курса
//Пример: рендерим длину продуктов (получаем ПРОПСАМИ ЭТИ продукты)
function Course({ menu, page, products }: CourseProps): JSX.Element {
  return <>{products && products.length}</>
}

export default withLayout(Course)

//ПРЕгенерация путей страниц -> возвращаем paths по сути
export const getStaticPaths: GetStaticPaths = async () => {
  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
    {
      firstCategory
    }
  )

  return {
    paths: menu.flatMap(m => m.pages.map(p => "/courses/" + p.alias)),
    fallback: true
  }
}

//Делаем пропсы (данные) для статической генерации
//Тип возврата функции: Статические пропсы (т.е. Спец. тип GetStaticProps) интерфейса КурсПропс (Пр: <IPageProps>, в Дженерик передается тип пропсов)
//Далее функция получает Доп. Параметры (некоторый Контекст типа GetStaticPropsContext)
//Это ВСЁ возвращает ПРОПСЫ, которые автоматом передаются в страницу(тут это -> Course) ^^  (сходили на БЭК и получили данные)
export const getStaticProps: GetStaticProps<CourseProps> = async ({
  params
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true
    }
  }

  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
    {
      firstCategory
    }
  )
  const { data: page } = await axios.get<TopPageModel>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/byAlias/" + params.alias
  )
  const { data: products } = await axios.post<ProductModel[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/product/find",
    {
      category: page.category,
      limit: 10
    }
  )

  return {
    props: {
      menu,
      firstCategory,
      page,
      products
    }
  }
}

//ТИП возвращаемых ПРОПСОВ (для более строгой типизации)
interface CourseProps extends Record<string, unknown> {
  menu: MenuItem[]
  firstCategory: number
  page: TopPageModel
  products: ProductModel[]
}
