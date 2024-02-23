import React ,{useState, useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getAllCarouselImages } from '../../redux/actions/carouselImageActions';
import styles from './Home.module.css';

const Home=()=>{
  const dispatch=useDispatch();
    const images=useSelector(state=>state.carouselImages);
    const [currentIndex,setCurrentIndex]=useState(0);
    const [selectedImage,setSelectedImage]=useState(images[0]);

    //cuando cambie el estado carouselImages, se re-renderizará el componente
    useEffect(()=>{},[images])
    useEffect(()=>{dispatch(getAllCarouselImages())} ,[]);

    const prev=()=>{
        const next= currentIndex>0?currentIndex-1:images.length-1;
        setCurrentIndex(next) 
        setSelectedImage(images[next]);
    }

    const next=()=>{
        const next=currentIndex<images.length-1?currentIndex+1:0;
        setCurrentIndex(next);
        setSelectedImage(images[next]);
    }

    return ( 
        <div className={styles.container}>
            <p className={styles.leftArrow} onClick={prev}>{'<'}</p>
            <p className={styles.rightArrow} onClick={next}>{'>'}</p>
            <img className={styles.image} src={selectedImage?.image.secure_url} alt="" />)
        </div>
    )
}

export default Home;