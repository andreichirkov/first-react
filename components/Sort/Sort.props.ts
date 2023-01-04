import { DetailedHTMLProps, HTMLAttributes } from "react"

//Описываем что это div элемент с 2 свойствами
export interface SortProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  sort: SortEnum
  setSort: (sort: SortEnum) => void
}

export enum SortEnum {
  Rating,
  Price
}
