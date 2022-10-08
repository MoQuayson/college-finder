export default function AppHeader(){
    return(
        appNavBar()
    )
}


//web app github link
const appGitHubLink = 'https://github.com/MoQuayson/college-finder';

//web app navbar
const appNavBar = ()=>{
    return(
        <nav id="nav" className="navbar navbar-expand-lg navbar-light sticky-top bg-white shadow-sm">
            <div className="container">
                <a className="navbar-brand" href="/">College Finder</a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href='#heroSection'>Home</a>
                        </li>
                        
                        <li className="nav-item">
                            <a className="nav-link" href={appGitHubLink}>
                                <i className="bi bi-github"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}