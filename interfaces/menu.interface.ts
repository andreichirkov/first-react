//Категории с подКатегориями -> Главное меню
import { TopLevelCategory } from "./page.interface"

export interface PageItem {
  _id: string
  alias: string
  title: string
  category: string
}

export interface MenuItem {
  _id: {
    secondCategory: string
  }
  //Опционально, тк с бэкенда не приходит
  isOpened?: boolean
  pages: PageItem[]
}

export interface FirstLevelMenuItem {
  route: string
  name: string
  icon: JSX.Element
  id: TopLevelCategory
}
