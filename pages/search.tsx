import { withLayout } from "../layouts/Layout"
import { GetStaticProps } from "next"
import axios from "axios"
import { MenuItem } from "../interfaces/menu.interface"
import { API } from "../helpers/api"

function Search(): JSX.Element {
  return (
    <>
      Search
    </>
  )
}

export default withLayout(Search)

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0
  const { data: menu } = await axios.post<MenuItem[]>(
    API.topPage.find, {
      firstCategory
    }
  )


  //Укоротил список меню до 2 | HARDCODE
  // menu = menu.map(item => {
  //   return {
  //     ...item,
  //     pages: item.pages.slice(0,2)
  //   }
  // })

  return {
    props: {
      menu,
      firstCategory
    }
  }
}

interface HomeProps extends Record<string, unknown>{
  menu: MenuItem[]
  firstCategory: number
}
