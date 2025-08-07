import React, { useState, useContext } from "react";
import { AppContext } from '../App';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import "./gameswiper.css";

// Import required modules
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";


function GameSwiper({ games }) {
    const [active, setActive] = useState(false);
    const [swiperInstance, setSwiperInstance] = useState(null);
    const { bag, setBag, showToast } = useContext(AppContext);

    const handleAddToBag = (game) => {
        if (bag.some(item => item._id === game._id)) return;
        setBag([...bag, game]);
        showToast && showToast('Added to your bag!');
    };

    const handleToggleVideo = () => {
        setActive((prev) => {
            const next = !prev;
            if (swiperInstance) {
                if (next) {
                    swiperInstance.autoplay.stop();
                } else {
                    swiperInstance.autoplay.start();
                }
            }
            return next;
        });
    };

    return (
        <Swiper
            effect={"coverflow"}
            grabCursor={true}
            navigation={true}
            loop={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
                rotate: 35,
                stretch: 200,
                depth: 250,
                modifier: 1,
                slideShadows: true,
            }}
            autoplay={{
                delay: 2000,
                disableOnInteractionChange: false,
            }}
            modules={[EffectCoverflow, Navigation, Autoplay]}
            className="gameSwiper"
            onSwiper={setSwiperInstance}
        >
            {games.map((game) => (
                <SwiperSlide key={game._id}>
                    <div className="gameSlider">
                        <img src={game.img} alt="Game Image" />
                        <div className={`video ${active ? 'active' : undefined}`}>
                            <iframe
                                width="1280"
                                height="720"
                                src={game.trailer}
                                title={game.title}
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                                allowFullScreen>
                            </iframe>
                        </div>
                        <div className="content">
                            <h2>{game.title}</h2>
                            <p>{game.description}</p>
                            <div className="buttons">
                                <a href="#" className="orderBtn" onClick={e => { e.preventDefault(); handleAddToBag(game); }}>
                                    Order Now
                                </a>
                                <a href="#" className={`playBtn ${active ? 'active' : undefined}`} onClick={handleToggleVideo}>
                                    <span className="pause">
                                        <i className="bi bi-pause-fill"></i>
                                    </span>
                                    <span className="play">
                                        <i className="bi bi-play-fill"></i>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default GameSwiper;
