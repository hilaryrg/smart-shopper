import React from "react"

const Home = (props) => {
    return (
        <div className="home-page-image-and-text">
            <div className="home-page-text-section">
                <div className="home-page-text-title">
                    Smart Shopper
                </div>
                <p className="home-page-text-body">
                    The app that helps you create, manage, and organize your lists.
                </p>
            </div>
            {/* <div className="home-page-image-container"> */}
                <img className="home-page-image" src="https://smart-shopper-production.s3.amazonaws.com/torbjorn-helgesen-C4FbCe4L_pw-unsplash.jpg"/>
            {/* </div> */}
        </div>
    )
}

export default Home