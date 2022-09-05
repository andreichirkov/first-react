import { LayoutProps } from "./Layout.props"
import styles from "./Layout.module.css"
import cn from "classnames"
import { Header } from "../components/Header/Header"
import { Sidebar } from "../components/Sidebar/Sidebar"
import { Footer } from "../components/Footer/Footer"
import { FunctionComponent } from "react"

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <>
      <Header />
      <div>
        <Sidebar />
        <div>{children}</div>
      </div>
      <Footer />
    </>
  )
}

export const withLayout = <T extends Record<string, unknown>>(
  Component: FunctionComponent<T>
) => {
  return function withLayoutComponent(props: T):JSX.Element {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    )
  }
}
