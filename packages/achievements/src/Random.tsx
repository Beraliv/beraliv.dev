import { Spotify } from "./widgets/Spotify"
import styles from './Achievements.module.css'

export const Random = () => {
    return (
        <>
            <h2>Random</h2>
            <div class={styles.random}>
                <Spotify />
            </div>
        </>
    )
}