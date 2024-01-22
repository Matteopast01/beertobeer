import CustomButton from "./CustomButton";
import CustomAccountButton from "./CustomAccountButton";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchBar from "./SearchBar";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts/Auth";
import {useContext, useState} from "react";
import {get_docs_by_attribute, query_by_preamble, requestBeersByName} from "../services/persistence_manager";
import {useDispatch} from "react-redux";
import {pubSelected, resetPubSelected, setSearchTerm} from "../store/App";

// disableSearchBar passed as prop disables the searchBar component
function Header({pub, disableSearchBar}) {

    const {currentUser} = useContext(AuthContext);
    const {handleLogout} = useContext(AuthContext);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [options, setOptions] = useState([]);

    const handleClickPub = async (value) => {
        console.log(value)
        if (value != null) {
            const pubFromDB = await get_docs_by_attribute(value, "Pub", "name");
            const {position, ...newObj} = pubFromDB[0];

            const pub = {
                ...newObj,
                lat: position.latitude,
                lng: position.longitude
            };
            dispatch(pubSelected(pub));
        }
    }

    const handleClickBeer = async (value) => {
        const beer = await requestBeersByName(value);   // it returns an array of one element
        const id = beer[0].id;
        dispatch(setSearchTerm(value));
        navigate(`/product/${id}`)
        navigate(0)
    };

    const propsSearch = {
        onSearch: async function (searchTerm) {

            const queryResult = await query_by_preamble(
                !!pub ? "Pub" : "Beer_Id",
                "name",
                searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1).toLowerCase(),
                5,
                true,       // attention!!! with false it orders by number_calls too (so many requests!)
                "number_calls"
            );
            setOptions(queryResult);
        },
        options: options,
        handleSubmit: (value, event) => {

            dispatch(setSearchTerm(value));
            if (!pub) {
                navigate(`/search/${value}`)
            }
            if (pub){
                event.preventDefault()
            }
        },
        label: !!pub ? "Search pub..." : "Search beer...",
        handleClick: !!pub ? handleClickPub : handleClickBeer
    };

    const propsLogin = {
        icon: <AccountCircleIcon/>,
        sx: { color: '#333333'},
        size: "large",
        // handleClick: ()=>{navigate("/login")},
    };

    const propsLogout = {
        icon: <AccountCircleIcon/>,
        sx: { color: '#333333'},
        size: "large",
        // handleClick: ()=>{handleLogout(navigate)},
    };

    // TODO Matteo: metterci query per recuperare la foto profilo e metterla al posto di null
    const propAccountButton = {
        img: null
    }

    const propsHome = {
        text: "Home",
        sx: { color: '#333333'},
        size: "large",
        handleClick: ()=>{navigate("/")}
    };

    const propsPubs = {
        text: "Our Pubs",
        sx: { color: '#333333'},
        size: "large",
        handleClick: ()=>{
            navigate("/ourpubs");
            dispatch(resetPubSelected(null));
        }
    };

    const propsAdvancedSearch = {
        text:"Advanced Search",
        sx: { color: '#333333'},
        size: "large",
        handleClick: ()=>{navigate("/search")},
        uploadButtonBoolean: true
    };

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{width: '70px'}}/>
                <div style={{flex: '1', textAlign: 'center', fontSize: '40px', fontFamily: 'Arial, sans-serif'}}>
                    <b>BeerToBeer</b>
                </div>
                <div style={{width: '70px'}}>
                    <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                        <CustomAccountButton {...propAccountButton}/>
                        {/*
                        {currentUser ?
                            <CustomIconButton {...propsLogout}/> :
                            <CustomIconButton {...propsLogin}/>}
                        */}
                    </div>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <div>
                    <CustomButton {...propsHome}/>
                    <CustomButton {...propsPubs}/>
                    <CustomButton {...propsAdvancedSearch}/>
                </div>
                {!!disableSearchBar ? <div></div> : <SearchBar {...propsSearch}/>}
            </div>
        </div>
    );
}

export default Header;