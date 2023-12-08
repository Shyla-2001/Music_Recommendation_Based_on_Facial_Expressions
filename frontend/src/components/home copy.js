import { Helmet } from "react-helmet";


function HomePage() {
    return (
        <>
            <Helmet>

                <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
                {/* <script src="./ext.js" type="text/javascript" /> */}


            </Helmet >
            <div id="body">
                <div>
                    <h1 class="mmd">
                        Mood Music Recommender
                    </h1>
                </div>
                <div class="edc">
                    <h2 class="ed">Emotion Detector
                    </h2>
                    <div class="vid">
                        <img class="outer-shadow" id="bg" className="center img-fluid" src="{{ url_for('video_feed') }}" />
                    </div>
                </div>
                <div class="songr">
                    <h2>Song Recommendations
                    </h2>
                    <div class="outer-shadow" id="ResultArea">
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;