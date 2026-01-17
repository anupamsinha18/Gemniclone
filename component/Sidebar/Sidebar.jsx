import "./sidebar.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { Context } from "../../Context/context";

const Sidebar = () => {
    // Controls if the sidebar is open (true) or closed (false)
    const [extended, setExtended] = useState(false);
    
    // Access global state from Context
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

    // Function to load a past chat from history
    const loadPreviousPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

    return (
        // DYNAMIC CLASS: Adds "extended" class when state is true.
        // This allows CSS to toggle visibility on mobile.
        <div className={`sidebar ${extended ? "extended" : ""}`}>
            
            <div className="top">
                {/* Menu Icon - Toggles the sidebar */}
                <img
                    src={assets.menu_icon}
                    className="menu"
                    alt="menu-icon"
                    onClick={() => setExtended((prev) => !prev)}
                />
                
                {/* New Chat Button */}
                <div onClick={() => newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                
                {/* Recent History Section */}
                <div className="recent">
                    
                    {/* Only show "Recent" title if sidebar is open */}
                    {extended ? <p className="recent-title">Recent</p> : null}
                    
                    {prevPrompts.map((item, index) => {
                        return (
                            <div 
                                key={index}
                                onClick={() => loadPreviousPrompt(item)} 
                                className="recent-entry"
                            >
                                <img src={assets.message_icon} alt="" />
                                {/* Only show text if sidebar is open */}
                                {extended ? <p>{item.slice(0, 18)}...</p> : null}
                            </div>
                        );
                    })}
                </div>

            </div>
            
            {/* Bottom Menu Items */}
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;