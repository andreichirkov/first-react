import { RatingProps } from "./Rating.props"
import {
  useEffect,
  useState,
  KeyboardEvent,
  forwardRef,
  ForwardedRef
} from "react"
import StarIcon from "./star.svg"
import cn from "classnames"
import styles from "./Rating.module.css"

export const Rating = forwardRef(
  (
    {
      isEditable = false,
      error,
      rating,
      setRating,
      className,
      ...props
    }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
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
          <span
            className={cn(styles.star, {
              [styles.filled]: i < currentRating,
              [styles.editable]: isEditable
            })}
            onMouseEnter={() => changeDisplay(i + 1)}
            onMouseLeave={() => changeDisplay(rating)}
            onClick={() => onClick(i + 1)}>
            <StarIcon
              tabIndex={isEditable ? 0 : -1}
              onKeyDown={(e: KeyboardEvent<SVGAElement>) =>
                isEditable && handleSpace(i + 1, e)
              }
            />
          </span>
        )
      })
      setRatingArray(updatedArray)
    }

    const changeDisplay = (i: number) => {
      if (!isEditable) {
        return
      }
      constructRating(i)
    }

    const onClick = (i: number) => {
      if (!isEditable || !setRating) {
        return
      }
      setRating(i)
    }

    const handleSpace = (i: number, e: KeyboardEvent<SVGAElement>) => {
      if (e.code != "Space" || !setRating) {
        return
      }
      setRating(i)
    }

    return (
      <div
        {...props}
        ref={ref}
        className={cn(styles.ratingWrapper, {
          [styles.error]: error
        })}>
        {ratingArray.map((r, i) => (
          <span key={i}>{r}</span>
        ))}
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    )
  }
)
