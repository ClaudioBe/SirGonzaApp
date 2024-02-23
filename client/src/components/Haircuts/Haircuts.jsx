import React, { useEffect } from 'react';
import Haircut from '../Haircut/Haircut';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Haircut.module.css';
import { getAllHaircuts } from '../../redux/actions/haircutActions';

function Haircuts() {
    const haircuts=useSelector(state=>state.haircuts);
    const dispatch=useDispatch();

    useEffect(()=>{dispatch(getAllHaircuts())},[])
    
    return (
        <div className={styles.haircuts}>
                {haircuts?.map(h=>{
                    return(
                        <Haircut
                            key={h.id}
                            type={h.haircutTypeName}
                            images={h.images.map(img=>img.secure_url)}
                        />)})}
            </div>
    );
}

export default Haircuts;