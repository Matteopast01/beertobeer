import * as React from "react";
import {useNavigate} from "react-router-dom";
import {CardList} from "./CardList";
import useCardList from "../hooks/useCardList";
import DropDown from "./DropDown";
import {useEffect, useState} from "react";
import {load_ordered_docs, requestBeersById} from "../services/persistence_manager.js";
import BeerCardDescription from "./BeerCardDescription";
import {useSelector} from "react-redux";

export function BeerContainer(){
    //Hooks
        //Hook State

    const [selection, setSelection] = useState({label: "Most Popular", value: "number_calls"});
    const [items, setItems] = useState([])
    const render_like = useSelector((state) => state.like.rerender)


        // Hook Navigate

    const navigate = useNavigate();


        // Hook CardList

    const [cardItems, cardFeature] = useCardList(items,
        (item)=>{return item.id},
        (item)=>{return item.image_url},
        (item)=>{
            return (<BeerCardDescription beer = {item} />)
        },
        "default:350--181-8",
        (item)=>{navigate(`/product/${item.id}`)}
    )



        //Hook Effect

    useEffect(() => {
        (async  ()=> {
            setItems(await getBeers("number_calls"))
        })()
    }, []);

    useEffect(() => {
        (async  ()=> {
            if(selection.value === "number_likes"){
                setItems(await getBeers(selection.value))
            }
        })()
    }, [render_like]);



    // Props definition

    const options = [
        {label: "Most Popular", value: "number_calls"},
        {label: "Most Liked", value: "number_likes"}
    ]


    // Handle Functions

    const getBeers = async function (order_parameter) {
        let arrayOfId = await load_ordered_docs("Beer_Id", order_parameter, "desc", 6)
        let beers = []
        for (let obj of arrayOfId) {
            let beer = await requestBeersById(obj.id)
            beers.push(beer[0])
        }
        return beers
    }

    const handleSelect = async (option) => {
        setItems(await getBeers(option.value))
        setSelection(option);
    };

    // Return JSX

    return (
        <div>
            <br/>
            <div style={{margin: "auto", width:"10%", display: "flex", justifyContent: "center" }}>
                <DropDown options={options} value={selection} onChange={handleSelect} />
            </div>
            <CardList maxColumn={3} cardFeature={cardFeature} items={cardItems}></CardList>
        </div>
    )



}
