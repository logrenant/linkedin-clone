import React from "react";
import {Avatar} from "@mui/material";
import './Sidebar.css';

function Sidebar() {

    const recentItem = (topic) => (
        <div className="sidebar_recentItem">
            <span className="sidebar_hash">#</span>
            <p>{topic}</p>
        </div>
    )

    return <div className="sidebar">
        <div className="sidebar_top">
            <img src="https://images.unsplash.com/photo-1442406964439-e46ab8eff7c4?q=80&fm=jpg&s=7728059c0751fd7df335656ba33789d3" alt=""/>
            <Avatar className="sidebar_avatar"/>
            <h2> Logrenant </h2>
            <h4> salihdevran9@gmail.com </h4>
        </div>

        <div className="sidebar_stats">
            <div className="sidebar_stat">
                <p>Who viewed you</p>
                <p className="sidebar_statNumber">2.011</p>
            </div>
            <div className="sidebar_stat">
                <p>Views on post</p>
                <p className="sidebar_statNumber">2.003</p>
            </div>
        </div>

        <div className="sidebar_bottom">
            <p>Recent</p>
            {recentItem("reactjs")}
            {recentItem("programing")}
            {recentItem("softwareengineering")}
            {recentItem("design")}
            {recentItem("developer")}
        </div>
    </div>
}

export default Sidebar