import { RatingProps } from "./Rating.props"
import {
  useEffect,
  useState,
  KeyboardEvent,
  forwardRef,
  ForwardedRef, useRef
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
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([])

    //Подписываемся на рейтинг (ПРОПС)
    //При его изменении выполняем useEffect
    useEffect(() => {
      //Возвращаем разметку с рейтингом на основе ПРОПСОВ
      constructRating(rating)
    }, [rating])

    const computeFocus = (r: number, i: number): number => {
      if (!isEditable) {
        return -1
      }

      if (!rating && i == 0) {
        return 0
      }

      if (r == i + 1) {
        return 0
      }

      return -1
    }

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
            ref={r => ratingArrayRef.current?.push(r)}
            tabIndex={computeFocus(rating, i)}
            onKeyDown={handleKey}
            onMouseEnter={() => changeDisplay(i + 1)}
            onMouseLeave={() => changeDisplay(rating)}
            onClick={() => onClick(i + 1)}>
            <StarIcon   />
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

    const handleKey = (e: KeyboardEvent) => {
      if (!isEditable || !setRating) {
        return
      }

      if (e.code == "ArrowRight" || e.code == "ArrowUp") {
        if (!rating) {
          setRating(1)
        } else {
          e.preventDefault()
          setRating(rating < 5 ? rating + 1 : 5)
        }
        ratingArrayRef.current[rating]?.focus()
      }

      if (e.code == "ArrowLeft" || e.code == "ArrowDown") {
        if (!rating) {
          setRating(1)
        } else {
          e.preventDefault()
          setRating(rating > 1 ? rating - 1 : 1)
          ratingArrayRef.current[rating - 2]?.focus()
        }
      }
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
