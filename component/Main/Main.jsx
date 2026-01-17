import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./main.css";
import { Context } from "../../Context/context";

const Main = () => {
    const {
        onSent,
        recentPrompt,
        showResults, // Note: standard Context usually uses 'showResult' (singular). Check your Context file variable name.
        loading,
        resultData,
        setInput,
        input,
    } = useContext(Context);

    // Function to handle card click: Sets input AND sends it immediately
    const handleCardClick = (promptText) => {
        setInput(promptText);
        onSent(promptText);
    };

    // Function to handle Enter key press
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && input) {
            onSent();
        }
    }

    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="User Profile" />
            </div>
            
            <div className="main-container">
                {/* Check if we should show the Greeting or the Results */}
                {!showResults ? (
                    <>
                        <div className="greet">
                            <p>
                                <span>Hello, Dev.</span>
                            </p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div
                                className="card"
                                onClick={() => handleCardClick("Suggest specific places to see on an upcoming road trip to India")}
                            >
                                <p>Suggest specific places to see on an upcoming road trip to India</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div
                                className="card"
                                onClick={() => handleCardClick("Explain the process of photosynthesis in simple terms")}
                            >
                                <p>Explain the process of photosynthesis in simple terms</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div
                                className="card"
                                onClick={() => handleCardClick("How do you create a responsive navbar using CSS?")}
                            >
                                <p>How do you create a responsive navbar using CSS?</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div
                                className="card"
                                onClick={() => handleCardClick("What are essential skills for a React Developer?")}
                            >
                                <p>What are essential skills for a React Developer?</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading ? (
                                <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            )}
                        </div>
                    </div>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown} // Listen for Enter key
                            value={input}
                            type="text"
                            placeholder="Enter a prompt here"
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {/* Only show send icon if there is text */}
                            {input ? (
                                <img
                                    src={assets.send_icon}
                                    alt=""
                                    onClick={() => onSent()}
                                />
                            ) : null}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so
                        double-check its responses. Your privacy and Gemini Apps
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;