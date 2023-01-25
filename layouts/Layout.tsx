import { LayoutProps } from "./Layout.props"
import styles from "./Layout.module.css"
import { Header } from "./Header/Header"
import { FunctionComponent, useState, KeyboardEvent, useRef } from "react"
import { Sidebar } from "./Sidebar/Sidebar"
import { Footer } from "./Footer/Footer"
import { AppContextProvider, IAppContext } from "../context/app.context"
import { Up } from "../components"
import cn from "classnames"

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  const skipContentActon = (key: KeyboardEvent) => {
    if (key.code === "Space" || key.code === "Enter") {
      key.preventDefault()
      bodyRef.current?.focus()
    }

    setIsSkipLinkDisplayed(false)
  }

  return (
    <div className={styles.wrapper}>
      <a
        className={cn(styles.skipLink, {
          [styles.displayed]: isSkipLinkDisplayed
        })}
        onFocus={() => setIsSkipLinkDisplayed(true)}
        onKeyDown={skipContentActon}
        tabIndex={1}>
        Сразу к содержанию
      </a>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <div className={styles.body} ref={bodyRef} tabIndex={0}>
        {children}
      </div>
      <Footer className={styles.footer} />
      <Up />
    </div>
  )
}

//Из-за IAppContext доступны теперь props.menu и тд
export const withLayout = <T extends Record<string, unknown> & IAppContext>(
  Component: FunctionComponent<T>
) => {
  //Сюда попадают пропсы из Хоум, тк он обернут ЭТИМ компонентом
  //Далее они передаются в контекст
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    )
  }
}
