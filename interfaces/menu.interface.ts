//Категории с подКатегориями -> Главное меню
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
  pages: PageItem[]
}
