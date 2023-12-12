import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import Haircut from "../Haircut/Haircut";
import styles from "./Home.module.css";
import { getAllHaircuts } from "../../redux/actions";

const Home=()=>{
    const dispatch=useDispatch();
    const haircuts=useSelector(state=>state.haircuts);
    useEffect(()=>{dispatch(getAllHaircuts())},[dispatch])
   
    return (
        <div className={styles.container}>
            {haircuts.map(h=>
                <Haircut
                    TypeId={h.haircutTypeId}
                    image={h.image.public_id}
                />)}
        </div>
    )
}

export default Home;