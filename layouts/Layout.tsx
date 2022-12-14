import { LayoutProps } from "./Layout.props"
import styles from "./Layout.module.css"
import { Header } from "./Header/Header"
import React, { FunctionComponent } from "react"
import { Sidebar } from "./Sidebar/Sidebar"
import { Footer } from "./Footer/Footer"
import { AppContextProvider, IAppContext } from "../context/app.context"

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <div className={styles.body}>{children}</div>
      <Footer className={styles.footer} />
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
