export default function AppFooter(){
    const twitterUrl = 'https://twitter.com/moquayson';
    const whastsAppUrl = 'https://twitter.com/moquayson';
    const gitHubUrl = 'https://github.com/moquayson';
    const linkedInUrl = 'https://linkedin.com/in/moquayson';


    return(
        <footer className="border-top footer  text-muted">
            <div className="container">
                <div className="d-flex justify-content-between">
                    &copy; 2022 - College Finder
                    <div className="fw-bold">
                    Powered by CM Technologies
                    </div>
                    <div className="socials fs-4">
                        <a className="text-dark" target="_blank" rel="noreferrer" href={gitHubUrl} ><i className="bi bi-github"></i></a>
                        <a target="_blank" rel="noreferrer"  href={twitterUrl}><i className="bi bi-twitter"></i></a>
                        <a className="text-primary" rel="noreferrer" target="_blank" href={linkedInUrl}><i className="bi bi-linkedin"></i></a>
                        <a hidden className="text-success" rel="noreferrer" target="_blank" href={whastsAppUrl}><i className="bi bi-whatsapp"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}