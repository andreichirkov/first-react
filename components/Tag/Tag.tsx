import { TagProps } from "./Tag.props"
import cn from "classnames"
import styles from "../Tag/Tag.module.css"

export const Tag = ({
  size = "s",
  color = "ghost",
  children,
  href,
  className,
  ...props
}: TagProps): JSX.Element => {
  return (
    <div
      className={cn(styles.tag, className, {
        [styles.s]: size == "s",
        [styles.m]: size == "m",
        [styles.ghost]: color == "ghost",
        [styles.green]: color == "green",
        [styles.red]: color == "red",
        [styles.primary]: color == "primary",
        [styles.grey]: color == "grey"
      })}
      {...props}>
      {href ? <a href={href}>{children}</a> : <>{children}</>}
    </div>
  )
}
