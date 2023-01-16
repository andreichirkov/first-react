import { ReviewFormProps } from "./ReviewForm.props"
import styles from "./ReviewForm.module.css"
import cn from "classnames"
import { Input } from "../Input/Input"
import { Rating } from "../Rating/Rating"
import { Textarea } from "../Textarea/Textarea"
import { Button } from "../Button/Button"
import CloseIcon from "./close.svg"
import { useForm, Controller } from "react-hook-form"
import { IReviewForm, IReviewSentResponse } from "./ReviewForm.interface"
import axios from "axios"
import { API } from "../../helpers/api"
import { useState } from "react"

export const ReviewForm = ({
  productId,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<IReviewForm>()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(
        API.review.createDemo,
        {
          ...formData,
          productId
        }
      )

      if (data.message) {
        setIsSuccess(true)
        reset()
      } else {
        setError("Что то пошло не так")
      }
    } catch (e) {
      const result = (e as Error).message
      setError(result)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input
          {...register("name", {
            required: { value: true, message: "Заполните имя" }
          })}
          placeholder="Имя"
          error={errors.name}
        />
        <Input
          {...register("title", {
            required: { value: true, message: "Заполните заголовок" }
          })}
          className={styles.title}
          placeholder="Заголовок отзыва"
          error={errors.title}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            name="rating"
            control={control}
            rules={{
              required: { value: true, message: "Укажите оценку" }
            }}
            render={({ field }) => (
              <Rating
                isEditable
                rating={field.value}
                setRating={field.onChange}
                ref={field.ref}
                error={errors.rating}
              />
            )}></Controller>
        </div>
        <Textarea
          {...register("description", {
            required: { value: true, message: "Заполните описание" }
          })}
          placeholder="Текст отзыва"
          className={styles.description}
          error={errors.description}
        />
        <div className={styles.submit}>
          <Button appearance={"primary"}>Отправить</Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      {isSuccess && (
        <div className={cn(styles.success, styles.panel)}>
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div>Спасибо, ваш отзыв будет опубликован после проверки</div>
          <CloseIcon className={styles.close} onClick={() => setIsSuccess(false)} />
        </div>
      )}
      {error && <div className={cn(styles.error, styles.panel)}>
        Что то пошло не так, попробуйте обновить страницу
        <CloseIcon className={styles.close} onClick={() => setError(undefined)} />
      </div>}
    </form>
  )
}
