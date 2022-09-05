import {Button, Htag, P, Rating, Tag} from "../components"

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
      <Rating rating={3} />
      <Rating rating={4} />
    </>
  )
}
