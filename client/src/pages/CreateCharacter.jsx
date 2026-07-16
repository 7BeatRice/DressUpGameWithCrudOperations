import React from "react";
import '../css/Create_Character.css'
import { useState, useEffect } from "react";
import SkinApi from "../services/SkinApi";
import HairApi from "../services/HairApi"
import BottomApi from "../services/BottomApi"
import TopApi from "../services/TopApi"
import DressApi from "../services/DressApi"

const CreateCharacters = () => {

    const [options, setOptions] = useState([]);


    const getSkinTones = async() => {
        try{
            const skins = await SkinApi.getAllSkins();
            setOptions(skins)
        }
        catch (error){
            console.error(error)
        }

    }

    const getHairs = async() => {
        try{
            const hairs = await HairApi.getAllHairs() ;
            setOptions(hairs)
        }
        catch (error){
            console.error(error)
        }

    }



    const getTops = async() => {
        try{
            const tops = await TopApi.getAllTops();
            setOptions(tops)
        }
        catch(error){
            console.error(error)
        }
    }

    const getBottoms = async() => {
        try{
            const bottoms = await BottomApi.getAllBottoms()
            setOptions(bottoms)
        }
        catch(error){
            console.error(error)
        }
    }

    const getDresses = async() => {
        try{
            const dresses =await  DressApi.getAllDresses()
            setOptions(dresses)
        }
        catch(error){
            console.error(error)
        }
    }





    return(
        <div id="create_character">
            <div id="character_preview_background">
                <div id="Character_preview">
                    <img src="../public/assets/skinTone/base_body.png" alt="chracter preview"/>
                </div>
            </div>
           
            
            <div id="selection_area">
                <div className="icon_display">
                <div className="icons">
                    <img src="../public/assets/icons/skintone_icon.png" alt="skin tone icon" onClick={getSkinTones}/>
                      <p>Skin tone</p>
                </div>
                <div className="icons">
                    <img src="../public/assets/icons/hair_icon.png" alt="hair icon" onClick={getHairs}/>
                    <p>Hair</p>
                </div>
                <div className="icons">
                    <img src="../public/assets/icons/shirt_icon.png" alt="top icon" onClick={getTops}/>
                    <p>Top</p>
                </div>
                <div className="icons">
                    <img src="../public/assets/icons/bottoms_icon.png" alt="bottoms icon" onClick={getBottoms}/>
                    <p>Bottom</p>
                </div>
                <div className="icons">
                    <img src="../public/assets/icons/dress_icon.png" alt="dress icon" onClick={getDresses} />
                    <p>Dress</p>
                </div>
            </div>
            <div id="options_display">
                {options.map(option => (
                    <div className="single_option">
                     <img src={option.image}></img>
                    <p>{option.name}</p>
                    </div>
                   
                    )

                )}
            </div>

            </div>
       
        </div>
    )
}
export default CreateCharacters