import React, { useEffect , useState} from 'react';
import styles from './Character_Selector.module.css';

let arr = new Array(38).fill().map((e,i)=>{return i+1});

export default function Character_Selector({props:{my, enemies, setMy, setEnemies, setRoute, setRoteId}}){

    function characterSelect(characterNum) {
        const enemiesTemp = enemies.slice();
        
        if(!my){
            setMy(characterNum);
            if(enemies[enemies.length - 1]){
                getRecommandRouteFromBackend(enemiesTemp, characterNum)
            } else{
                getRecommandRouteFromBackend(enemiesTemp, my)
            }
         }else if(!enemies[enemies.length - 1]){
            enemiesTemp[enemiesTemp.length - 1] = characterNum;
            enemiesTemp.sort((a, b) => b - a);
            setEnemies(enemiesTemp);
            getRecommandRouteFromBackend(enemiesTemp, my)
         }

    }

    function getRecommandRouteFromBackend(enemiesTemp, characterNum) {  
        if(!characterNum) return
        const enemy_character_count = new Array(100).fill(0);

        enemiesTemp.forEach((e)=>{
            enemy_character_count[e] = enemy_character_count[e] + 1;
        });

        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query: `{
                getRecommandRoute(input:{
                  season:${5},
                  character:${characterNum},
                  enemy_character_count:[${enemy_character_count.toString()}]
                }
                ){
                  route
                  routeId
                }
              }`})
        }
        fetch(`http://${process.env.host}/graphql`, option).then(
            res=> res.json()
        ).then(
            data => {
                setRoteId(data.data?.getRecommandRoute?.routeId);
                setRoute(data.data?.getRecommandRoute?.route.split(', ').map((e)=> Number(e)));
        }
        );
    }

    function message() {
        if(!my){
            return "아래 목록에서 나의 실험체를 선택하세요. "
        }else if(!enemies[enemies.length - 1]){
            return "아래 목록에서 상대편 실험체를 선택하세요. (취소 하려면 위에 이미지를 클릭하세요)"
        }else{
            return "추천 루트를 확인 하세요!"
        }
    }

    return (
        <div>
            <h1 className={styles.message} >{message()}</h1>
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
