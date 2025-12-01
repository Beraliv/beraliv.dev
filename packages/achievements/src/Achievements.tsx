import { Leetcode } from "./widgets/Leetcode"
import { TsEssentials } from "./widgets/TsEssentials"
import styles from './Achievements.module.css'

export const Achievements = () => {
    return (
        <>
            <h2>Achievements</h2>
            <div class={styles.achievements}>
                <Leetcode />
                <TsEssentials />
            </div>
        </>
    )
}