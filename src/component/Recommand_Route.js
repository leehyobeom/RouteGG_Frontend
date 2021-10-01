import styles from './Recommand_Route.module.css';
import ko from '../lang/ko';
import { useState } from 'react';
import Router from "next/router";



export default function Recommand_Route({props:{my, enemies, setMy, setEnemies, route, routeId}}){
    const area = ko.area;
    const mapArr = new Array(72).fill("");

    area.forEach((e)=>{
        mapArr[e.mapNum] = e.name;
    })

    function checkSelected(){
        return (enemies[enemies.length - 1] && my)? true : false;
    }

    function getRouteId(){
        if(!checkSelected()) return "";
        if(enemies[enemies.length - 1] && my){
            return (<div>
                    <span className={styles.routeIdx}>{`Route ID: `}</span>
                    <span className={styles.routeName}>{routeId}</span>
                    </div>
                );
        }
    }

    function getRoutePath(index) {

        if(!checkSelected()) return "";
   
        const mapIdx = area.findIndex((e,i)=> e.mapNum === index);
    
        if(mapIdx === -1){
            return ""
        }

        const pathNum = route.findIndex((e,i)=> e === mapIdx + 1);


        if(pathNum === -1){
            return ""
        }else{
            return (
            <div>
                {getRouteLine(pathNum, index)}
                <span className={styles.placePath}>{pathNum + 1}</span>
            </div>
            )
        }
        
    }

    function getRouteLine(pathNum, index){
        if(route.length -1 === pathNum ) return "";
        const mapNextIdx = area[route[pathNum+1]-1].mapNum;

        const lineStartPoint = {
            x: index % 8,
            y: Math.floor(index/8) 
        }

        const lineEndPoint ={
            x: mapNextIdx % 8,
            y: Math.floor(mapNextIdx/8) 
        }

        const line ={
            x: lineEndPoint.x - lineStartPoint.x,
            y: lineEndPoint.y - lineStartPoint.y
        }

        return (<svg  className={styles.test}>
                    <line x1="0" y1="0" x2={line.x * 100} y2={line.y * 100} className={styles.test2} ></line>
                </svg>
                 )
        }


    function getRecommandRoute(){
        

        if(!checkSelected()) return "";
   
        return route.map((e,i)=>{
            return (<div key={i} className={styles.route}>
                        <span className={styles.routeIdx}>{i+1}</span>
                        <span className={styles.routeName}>{area[e-1].name}</span>
                        <br/><br/>
                    </div>)
        })

    }

    return (
        <div className={styles.outerGrid}> 
            <div></div>
            <div className={styles.infoGrid}>
                <div>
                    <span>{getRouteId()}</span>
                </div>
                <div>
                    {getRecommandRoute()}
                </div>
                <div></div>
            </div>
            <div>
                <div className={styles.mapGrid} >
                    {mapArr.map((e,i)=>{
                        return (<div key={i}>
                                    {getRoutePath(i)}
                                    {e?<span className={styles.placeName}>{e}</span>:""}
                                </div>)
                    })}
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}