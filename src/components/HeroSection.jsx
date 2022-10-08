const sourceCodeUrl = 'https://github.com/MoQuayson/college-finder/archive/refs/heads/master.zip';

export default function HeroSection(){
    return(
        <section id="heroSection" className="section">
            <div className="hero-intro">
                <div className="text-center text-wrap">
                    <h1 className="hero-title">Looking for a college to enroll?</h1>
                    <p className="hero-subtitle">Try the college finder app to view colleges in a country</p>
                    <a className="btn btn-primary shadow me-2" href="#collegeFinderApp">Try Finder App</a>
                    <a className="btn btn-outline-info shadow" href={sourceCodeUrl}>Get Source Code</a>
                </div>
            </div>
        </section>
    )
}

