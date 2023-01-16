import { withLayout } from "../../layouts/Layout"
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import axios from "axios"
import { MenuItem } from "../../interfaces/menu.interface"
import { TopLevelCategory, TopPageModel } from "../../interfaces/page.interface"
import { ParsedUrlQuery } from "querystring"
import { ProductModel } from "../../interfaces/product.interface"
import { firstLevelMenu } from "../../helpers/helpers"
import { TopPageComponent } from "../../page-components"
import { API } from "../../helpers/api"

//Страница конкретного курса
//Пример: рендерим длину продуктов (получаем ПРОПСАМИ ЭТИ продукты)
function TopPage({ firstCategory, page, products }: TopPageProps): JSX.Element {
  return (
    <TopPageComponent
      firstCategory={firstCategory}
      page={page}
      products={products}
    />
  )
}

export default withLayout(TopPage)

//ПРЕгенерация путей страниц -> возвращаем paths по сути
export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = []
  for (const m of firstLevelMenu) {
    const { data: menu } = await axios.post<MenuItem[]>(
      API.topPage.find,
      {
        firstCategory: m.id
      }
    )
    paths = paths.concat(
      menu.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`))
    )
  }

  return {
    paths,
    fallback: true
  }
}

//Делаем пропсы (данные) для статической генерации
//Тип возврата функции: Статические пропсы (т.е. Спец. тип GetStaticProps) интерфейса КурсПропс (Пр: <IPageProps>, в Дженерик передается тип пропсов)
//Далее функция получает Доп. Параметры (некоторый Контекст типа GetStaticPropsContext)
//Это ВСЁ возвращает ПРОПСЫ, которые автоматом передаются в страницу(тут это -> Course) ^^  (сходили на БЭК и получили данные)
export const getStaticProps: GetStaticProps<TopPageProps> = async ({
  params
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true
    }
  }

  const firstCategoryItem = firstLevelMenu.find(m => m.route == params.type)
  if (!firstCategoryItem) {
    return {
      notFound: true
    }
  }

  try {
    const { data: menu } = await axios.post<MenuItem[]>(
      API.topPage.find,
      {
        firstCategory: firstCategoryItem.id
      }
    )
    if (menu.length == 0) {
      return {
        notFound: true
      }
    }

    // menu = menu.slice(0, 2)

    const { data: page } = await axios.get<TopPageModel>(
      API.topPage.byAlias + params.alias
    )
    const { data: products } = await axios.post<ProductModel[]>(
      API.product.find,
      {
        category: page.category,
        limit: 10
      }
    )


    return {
      props: {
        menu,
        firstCategory: firstCategoryItem.id,
        page,
        products
      }
    }
  } catch {
    return {
      notFound: true
    }
  }
}

//ТИП возвращаемых ПРОПСОВ (для более строгой типизации)
interface TopPageProps extends Record<string, unknown> {
  menu: MenuItem[]
  firstCategory: TopLevelCategory
  page: TopPageModel
  products: ProductModel[]
}
