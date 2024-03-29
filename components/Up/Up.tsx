import styles from "./Up.module.css"
import cn from "classnames"
import UpIcon from "./up.svg"
import { useScrollY } from "../../hooks/useScrollY"
import { useAnimation, motion } from "framer-motion"
import { useEffect } from "react"
import { ButtonIcon } from "../ButtonIcon/ButtonIcon"

export const Up = (): JSX.Element => {
  const controls = useAnimation()
  const y = useScrollY()

  useEffect(() => {
    //Находясь в самом вверху будет opacity = 0, а внизу = 1 (хитро)
    //А переходы между состояниями будут анимированны
    controls.start({ opacity: y / document.body.scrollHeight }).then()
  }, [y, controls])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <motion.div
      className={styles.up}
      animate={controls}
      initial={{ opacity: 0 }}>
      <ButtonIcon icon={"up"} appearance={"primary"} onClick={scrollToTop} />
    </motion.div>
  )
}
