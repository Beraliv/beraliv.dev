import { Spotify } from "./widgets/Spotify"
import { Weather } from "./widgets/Weather"
import styles from './Random.module.css'

export const Random = () => {
    return (
        <>
            <h2>Random</h2>
            <div class={styles.random}>
                <Weather />
                <Spotify />
            </div>
        </>
    )
}