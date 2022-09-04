import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

export interface TagProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  size?: "s" | "m" //по высоте
  children: ReactNode
  color?: "ghost" | "grey" | "red" | "green" | "primary"
  href?: string
}
