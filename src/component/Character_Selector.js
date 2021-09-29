import React, { useEffect , useState} from 'react';
import styles from './Character_Selector.module.css';

let arr = new Array(38).fill().map((e,i)=>{return i+1});

export default function Character_Selector({props:{my, enemies, setMy, setEnemies}}){

    function characterSelect(characterNum) {
        const enemiesTemp = enemies.slice();
        if(!my){
            setMy(characterNum);
         }else if(!enemies[enemies.length - 1]){
            enemiesTemp[enemiesTemp.length - 1] = characterNum;
            enemiesTemp.sort((a, b) => b - a);
            setEnemies(enemiesTemp);
         }
    }

    function message() {
        if(!my){
            return "아래 목록에서 내 실험체를 선택하세요"
        }else if(!enemies[enemies.length - 1]){
            return "아래 목록에서 상대편 실험체를 선택하세요"
        }else{
            return "추천 루트를 확인 하세요!"
        }
    }

    return (
        <div>
            <div className={styles.message} >{message()}</div>
            <div className={styles.outerGrid}>
                <div></div>
                <div className={styles.inerGrid} >
                    {
                        arr.map( (e,i)=>{return (
                                <div key={i}>
                                    <img src={`/character/${e}/Mini.png`} className={styles.profile} onClick={() => {characterSelect(e)}}/>
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
