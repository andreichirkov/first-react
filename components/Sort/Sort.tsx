import { SortEnum, SortProps } from "./Sort.props"
import SortIcon from "./sort.svg"
import styles from "./Sort.module.css"
import cn from "classnames"

//Пропсами так же можно передать класс нейм,
//а потом объединить их тут через плагин CN
export const Sort = ({
  sort,
  setSort,
  className,
  ...props
}: SortProps): JSX.Element => {
  return (
    <div className={cn(styles.sort, className)} {...props}>
      <button
        onClick={() => setSort(SortEnum.Rating)}
        className={cn({
          [styles.active]: sort == SortEnum.Rating
        })}>
        <SortIcon className={styles.sortIcon} /> По рейтингу
      </button>
      <button
        onClick={() => setSort(SortEnum.Price)}
        className={cn({
          [styles.active]: sort == SortEnum.Price
        })}>
        <SortIcon className={styles.sortIcon} /> По цене
      </button>
    </div>
  )
}
