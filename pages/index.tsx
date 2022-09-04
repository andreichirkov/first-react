import { Button, Htag, P } from "../components"

export default function Home(): JSX.Element {
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
    </>
  )
}
