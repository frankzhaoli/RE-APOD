export function Header()
{
    return(
        <>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "10vh"}}>
                <h1>Astronomy Picture of the Day</h1>
            </div>

            <div style={{display: "flex", justifyContent:"center", alignItems: "center"}}>
                <p><a href="https://apod.nasa.gov/apod/archivepix.html" target={"_blank"} rel="noopener noreferrer">Discover the cosmos!</a> Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer. </p>
            </div>
        </>
    )
};