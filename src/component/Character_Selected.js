import styles from './Character_Selected.module.css';



export default function Character_Selected({props:{my, enemies, setMy, setEnemies}}){


    function cancel_My_Cahracter() {
        setMy(0);
    }

    function cancel_Enemy_Cahracter(i) {
        const enemiesTemp = enemies.slice();
        enemiesTemp[i] = 0;
        enemiesTemp.sort((a, b) => b - a);
        setEnemies(enemiesTemp);
    }


    return (
        <div>
            <div className={styles.outerGrid}>
                <div></div>
                <div>
                    <div className={styles.myCharacter} >
                        <img src={`/character/${my}/Half.png`} onClick={() => {cancel_My_Cahracter()}}/>
                    </div>
                </div>
                <div className={styles.inerGridVs} >
                    <div></div>
                    <div className={styles.vs}>vs</div>
                    <div></div>
                </div>
                <div className={styles.inerGrid}>
                    {
                        enemies.map( (e, i)=>{return (
                                <div key={i} >
                                    <img src={`/character/${e}/Mini.png`} className={styles.profile} onClick={() => {cancel_Enemy_Cahracter(i)}}/>
                                </div>
                            )
                        })

                    }        
                </div> 
                <div></div>
            </div>

        </div>
    )
}