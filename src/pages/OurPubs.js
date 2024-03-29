import Header from "../components/Header";
import Footer from "../components/Footer";
import PageSwitch from "../components/PageSwitch";
import Maps from "../components/Maps";

function OurPubs (){
    return (
        <>
            <>
                <Header pub page={"Our Pubs"}/>
                <br/>
            </>
            <div style={{display: "flex", minHeight: "73vh", marginTop: "5px"}}>
                <div style={{width: "60%", marginRight: "5px"}}>
                    <PageSwitch/>
                </div>
                <div style={{width: "40%", marginTop: "7px"}}>
                    <Maps/>
                </div>
            </div>
            <>
                <Footer/>
            </>
        </>
    );
}

export default OurPubs;