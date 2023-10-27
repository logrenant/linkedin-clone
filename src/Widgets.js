import React from "react";
import "./Widgets.css"
import {
    FiberManualRecord,
    Info
} from "@mui/icons-material";

function Widgets() {

    const newsArticle = (heading, subtitle) => (
        <div className="widgets_article">
            <div className="widgets_article_left">
                <FiberManualRecord/>
            </div>
            <div className="widgets_article_right">
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
    )

    return <div className="widgets">
        <div className="widgets_header">
            <h2>LinkedIn News</h2>
            <Info/>
        </div>
        {newsArticle("Challenges He Faces", "Ukraine Aid in Doubt as Johnson Moves to Drop It From Israel Assistance Bill")}
        {newsArticle("FTX Founder’s Reckoning", "Sam Bankman-Fried Acknowledges ‘Significant Oversights’ Before FTX Failed")}
        {newsArticle("Israel", "Israel Says It Is Expanding Operations as It Steps Up Gaza Bombardment")}
        {newsArticle("Kanye West’s relationship with Adidas.", "Kanye and Adidas: Money, Misconduct and Appeasement")}
    </div>
}

export default Widgets