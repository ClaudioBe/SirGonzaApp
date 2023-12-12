import React from "react";
import {styles} from './Paginated.module.css'

const Paginado=({haircutsPerPage,haircuts,paginated})=>{
    const pageNumbers=[]

    for(let i =0;i<Math.ceil(haircuts/haircutsPerPage);i++){
        pageNumbers.push(i+1);
    }
    return(
        <nav>
            {pageNumbers?.map(n=>(
                <button className="btnPaginated" onClick={()=>paginated(n)}>{n}</button>  
            ))}
        </nav>
    )
}

export default Paginado;