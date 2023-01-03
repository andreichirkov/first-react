import { PProps } from "../../components/P/P.props"
import cn from "classnames"
import styles from "./TopPageComponent.module.css"
import { TopPageComponentProps } from "./TopPageComponent.props"
import { Card, HhData, Htag, Tag } from "../../components"

export const TopPageComponent = ({
  page,
  products,
  firstCategory
}: TopPageComponentProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag="h1">{page.title}</Htag>
        {products && <Tag color='grey' size='m'>{products.length}</Tag>}
        <span>Сортировка</span>
      </div>
      <div>
        {products && products.map(p => (<div key={p._id}>{p.title}</div>))}
      </div>
      <div className={styles.hhTitle}>
        <Htag tag="h2">Вакансии - {page.category}</Htag>
        <Tag color='red' size='m'>hh.ru</Tag>
      </div>
      <HhData {...page.hh} />


    </div>
  )
}
