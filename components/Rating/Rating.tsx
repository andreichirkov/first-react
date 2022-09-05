import { RatingProps } from "./Rating.props"
import {useEffect, useState} from "react"
import StarIcon from "./star.svg"
import cn from "classnames"
import styles from "./Rating.module.css"

export const Rating = ({
  isEditable = false,
  rating,
  setRating,
  className,
  ...props
}: RatingProps): JSX.Element => {
  //По-умолчанию заполняем рейтинг пустым массивом 5 элементов
  //Состоящим внутри из пустых фрагментов
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
    new Array(5).fill(<></>)
  )

  //Подписываемся на рейтинг (ПРОПС)
  //При его изменении выполняем useEffect
  useEffect(() => {
    //Возвращаем разметку с рейтингом на основе ПРОПСОВ
    constructRating(rating)
  }, [rating])

  //Здесь привязываемся не к пропсу рейтинга, тк при ховере он визуально тоже меняется
  const constructRating = (currentRating: number) => {
    //Делаем массив звездочек, заливаем fill
    const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
      return (
        <StarIcon
          className={cn(styles.star, {
            [styles.filled]: i < currentRating
          })}
        />
      )
    })
    setRatingArray(updatedArray)
  }

  return (
    <div {...props}>
      {ratingArray.map((r, i) => (
        <span key={i}>{r}</span>
      ))}
    </div>
  )
}
