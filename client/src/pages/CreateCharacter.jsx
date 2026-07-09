import React from "react";
import '../css/Create_Character.css'
const CreateCharacters = () => {




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
                    <img src="../public/assets/icons/skintone_icon.png" alt="skin tone icon" />
                      <p>Skin tone</p>
                </div>
                <div className="icons">
                    <img src="../public/assets/icons/hair_icon.png" alt="hair icon" />
                    <p>Hair</p>
                </div>
                <div className="icons">
                    <img src="../public/assets/icons/shirt_icon.png" alt="shirt icon" />
                    <p>Shirt</p>
                </div>
                <div className="icons">
                    <img src="../public/assets/icons/bottoms_icon.png" alt="bottoms icon" />
                    <p>Bottom</p>
                </div>
                <div className="icons">
                    <img src="../public/assets/icons/dress_icon.png" alt="dress icon" />
                    <p>Dress</p>
                </div>
            </div>
            <div id="options_display"></div>

            </div>
       
        </div>
    )
}
export default CreateCharacters