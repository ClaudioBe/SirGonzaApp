import { useDispatch, useSelector } from "react-redux";
import { deleteCarouselImage } from "../../redux/actions/carouselImageActions";
import { Menu, Tag } from "antd";
import UploadCarouselImage from "../UploadCarouselImage/UploadCarouselImage";

function AdminCarousel() {
    const dispatch=useDispatch();
    const images=useSelector(state=>state.carouselImages);
    
    return(
        <div>
            {images.map(img=>
                <div>   
                    <img src={img.secure_url}/>
                    <Tag style={{cursor:'pointer'}} color="red" onClick={()=>dispatch(deleteCarouselImage(img.id))}>X</Tag>
                </div> )}
            <Menu  mode='inline'>
                <Menu.SubMenu title='Agregar imagen' >
                    <UploadCarouselImage/>
                </Menu.SubMenu>
            </Menu>
        </div>
    )
}

export default AdminCarousel;