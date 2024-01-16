import SimpleSlider from "./SimpleSlider";
import PubReviewContainer from "./PubReviewContainer";
import {useDispatch, useSelector} from "react-redux";
import CustomIconButton from "./CustomIconButton";
import CloseIcon from '@mui/icons-material/Close';
import {resetPubSelected} from "../store/App";
import * as React from "react";
import CustomButton from "./CustomButton";

function SinglePub(){

    const pubSelected = useSelector(state => state.pub.value);

    // if we are rendering singlePub it means that a pubSelected exists and so its properties images and description
    // however js needs a fallback value in case of null state

    //pubSelected.name  (nome)
    //pubSelected.img (immagine)
    //pubSelected.description (descrizione)
    //pubSelected.lat
    //pubSelected.lng

    let images = pubSelected?.img || [];
    let description = pubSelected?.description || "";

    let name = pubSelected?.name

     const dispatch = useDispatch();

     function handleClick(){
         console.log("ciao")
        dispatch(resetPubSelected(null))
    }

    return (

        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                <div style={{width: '70px'}}/>
                <div style={{flex: '1', textAlign: 'center', fontSize: '40px', fontFamily: 'Arial, sans-serif'}}>
                    <b>{name}</b>
                </div>
                <div style={{width: '70px'}}>
                    <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                        <CustomIconButton icon={<CloseIcon sx={{color: '#f30303'}}/>} handleClick={handleClick} size={"medium"}/>
                    </div>
                </div>
            </div>
            <div style={{textAlign: 'center', fontSize: '16px', fontFamily: 'Arial, sans-serif'}}>
                {description}
            </div>
        </div>


    );
}

export default SinglePub;