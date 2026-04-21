import earth from '../assets/planet-earth.svg';

function Earth() {
    return (
        <div className="hover-3d">
        {/* content */}
            <figure className="w-60 rounded-2xl">
                <img src={earth} alt="Earth" />
            </figure>
            {/* 8 empty divs needed for the 3D effect */}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>         
    )
}

export default Earth;