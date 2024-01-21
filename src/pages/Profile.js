import Header from "../components/Header";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import Footer from "../components/Footer";
import FavoritesContainer from "../components/FavoritesContainer"
import CustomCard from "../components/CustomCard";
import Popup from "../components/Popup";

import {AuthContext} from "../contexts/Auth";

import {count_docs, get_docs_by_attribute, pull_img_url} from "../services/persistence_manager";
import CustomButton from "../components/CustomButton";
import DeleteIcon from "@mui/icons-material/Delete";

const Profile = function (){

    const {currentUser} = useContext(AuthContext);

    const [currentUserImage, setCurrentUserImage] = useState("")
    const [username, setUsername] = useState("")
    const [numberRew, setNumberRew] = useState(0)


    const provideUserInformation = async function () {

        const result = {}

        const id_user = currentUser.uid
        result["number_rew"] = await count_docs(id_user, "Review", "uid_author")

        const user = await get_docs_by_attribute(id_user, "User", "uid")
        const defaultImage = await get_docs_by_attribute("default_user_img",
            "Default_Images", "type")
        result["username"] = user[0].username
        const link_img = user[0].link_img


        result["img"] = !!link_img ? await pull_img_url(link_img) : await pull_img_url(defaultImage[0].link_img)
        return result
    }

    const changeUploadedImage = async function (image) {

        if (image === null) {
            const defaultImage = await get_docs_by_attribute("default_user_img",
                "Default_Images", "type")
            const defaultImg =  await pull_img_url(defaultImage[0].link_img)
            console.log (defaultImg)
            setCurrentUserImage(defaultImg)

        }
        else {
            setCurrentUserImage(image)
            console.log (image)

        }
    }


    useEffect(() => {
        (async  ()=> {

            const result =  await provideUserInformation()

            setUsername(result.username)
            setNumberRew(result.number_rew)
            setCurrentUserImage(result.img)
        })()
    }, []);

    const changeUpdatedUsername = function ( updatedUsername){
        setUsername(updatedUsername)
    }


    return (
        <div>
            <div style={{ display: 'block', marginBottom: '10px'}}>
                <Header />
            </div>
            <div style={{  textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontFamily: 'Arial, sans-serif', marginBottom: '10px' }}>
                    <b>Favorites</b>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1, marginRight: '15px' }}>
                    <CustomCard
                        horizontal={false}
                        maxWidth="300px"
                        contentWidth="100%"
                        numberContentRow="12"
                        img={typeof currentUserImage === "string" ? currentUserImage : URL.createObjectURL(currentUserImage)}
                        onClick={null}
                        children={
                            <>
                                <div style={{textAlign: 'center'}}>
                                    <b> Username: </b> {username}
                                    <br/>
                                    <b> Number Reviews: </b> {numberRew}
                                    <br/>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <Popup  username={username}
                                            changeUploadedImage={ changeUploadedImage}
                                            changeUpdatedUsername = {changeUpdatedUsername}/>
                                </div>
                            </>
                        }/>
                </div>
                <div style={{ borderRight: '1px solid #ccc', height: '100%' }}/>
                <FavoritesContainer />
            </div>
            <Footer />
        </div>
    )
}

export default Profile;
