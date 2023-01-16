import { SortEnum } from "../../components/Sort/Sort.props"
import { ProductModel } from "../../interfaces/product.interface"

// или SortEnum можно просто написать
export type SortActions =
  | { type: SortEnum.Price }
  | { type: SortEnum.Rating }
  | { type: "reset"; initialState: ProductModel[] }

//Тут должна храниться сортировка,
//чтобы потом отображать карточки на основании этой сортировки
//Здесь стейт который хрантся на основе входящего пропса сортировки
export interface SortReducerState {
  sort: SortEnum
  products: ProductModel[]
}

export const sortReducer = (
  state: SortReducerState,
  action: SortActions
): SortReducerState => {
  switch (action.type) {
    case SortEnum.Rating:
      return {
        sort: SortEnum.Rating,
        products: state.products.sort((a, b) =>
          a.initialRating > b.initialRating ? -1 : 1
        )
      }
    case SortEnum.Price:
      return {
        sort: SortEnum.Price,
        products: state.products.sort((a, b) => (a.price > b.price ? 1 : -1))
      }
    case "reset":
      return {
        sort: SortEnum.Rating,
        products: action.initialState
      }
    default:
      throw new Error("Неверный тип сортировки")
  }
}
