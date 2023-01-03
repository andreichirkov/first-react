import { Button, Htag, P, Rating, Tag } from "../components"
import { withLayout } from "../layouts/Layout"
import { GetStaticProps } from "next"
import axios from "axios"
import { MenuItem } from "../interfaces/menu.interface"

function Home({ menu }: HomeProps): JSX.Element {
  return (
    <>
      <Htag tag="h1">Текст</Htag>
      <Button appearance={"primary"} className={"klasss"} arrow={"right"}>
        раз кнопка
      </Button>
      <Button appearance={"ghost"} arrow={"down"}>
        два кнопка
      </Button>
      <P size={"l"}>Больой</P>
      <P>Сред</P>
      <P size={"s"}>Мал</P>
      <Tag size={"s"} color={"red"}>
        мал крас
      </Tag>
      <Tag size={"s"} color={"ghost"}>
        мал гост
      </Tag>
      <Tag size={"m"} color={"primary"}>
        мал гост
      </Tag>
      <Tag size={"m"} color={"green"}>
        мал гост
      </Tag>
      <Rating rating={3} isEditable />
      <Rating rating={4} />

    </>
  )
}

export default withLayout(Home)

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0

  let { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find", {
      firstCategory
    }
  )


  //Укоротил список меню до 2 | HARDCODE
  menu = menu.slice(0, 2)

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
