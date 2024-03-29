import { withLayout } from "../../layouts/Layout"
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import axios from "axios"
import { MenuItem } from "../../interfaces/menu.interface"
import { firstLevelMenu } from "../../helpers/helpers"
import { ParsedUrlQuery } from "querystring"
import { API } from "../../helpers/api"

function Type({ firstCategory }: TypeProps): JSX.Element {
  return <>Страница первой категории!!! Type - {firstCategory}</>
}

export default withLayout(Type)

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map(m => `/${m.route}`),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<TypeProps> = async ({
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

  let { data: menu } = await axios.post<MenuItem[]>(
    API.topPage.find,
    {
      firstCategory: firstCategoryItem.id
    }
  )


  //Укоротил список меню до 2 | HARDCODE
  menu = menu.slice(0, 2)

  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id
    }
  }
}

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[]
  firstCategory: number
}
