import styles from './paragraph.module.scss'


export default function Paragraph({children}) {
    return (
        <p className={styles.Paragraph}>{children}</p>
    )
}