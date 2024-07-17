import styles from './button.module.css'

interface Props {
  title: string
  form?: string
  className?: string
}

export default function Button({ title, form, className }: Props) {
  return (
    <button className={`${className} ${styles.commonStyles}`} form={form}>
      {title}
    </button>
  )
}
