
import { useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function FinderAppSection(){
    const [data,setData] = useState([]);//college data
    const [country,setCountry] = useState("");
    const [loading,setLoading] = useState(false); // loading feature
    const [focus,setFocus] = useState(false);

    async function fetchCollegeData(){
        //set loading to true
        setLoading(true);

        //url
        var url = 'http://universities.hipolabs.com/search?country='+ country;
        
        //get response and data
        const response = await fetch(url);
        const collegeData = await response.json(response);

        setData(collegeData);
        setCountry('')
        setFocus(false);
        setLoading(false);
    }

    //when search value is changed
    const handleSearchInputChange = (event)=>{
        setCountry(event.target.value);
        setFocus(true);
    }

    const handleSearchInputKeyDown =(event)=>{
        if(event.key === 'Enter'){
            fetchCollegeData();
        }
    }

    const websiteBodyTemplate = (rowData)=>{
        return(
            <a href={rowData.web_pages[0]} target='_blank' rel="noreferrer">{rowData.web_pages[0]}</a>
        )
    }

    //search box
    const SearchBox = ()=>{
        return(
            <div className="search-panel mt-5">
                <div className="text-center">
                    <h1>College Finder</h1>
                    <p className='app-desc text-black-50'>An online college search engine</p>
                    <div className="row">
                        <div className="col">
                            <div className="input-group mb-3">
                                <input id="searchInput" type="text" className="form-control shadow-sm form-control-lg" 
                                placeholder="Search by country" autoFocus={focus} value={country}  
                                onChange={handleSearchInputChange} onKeyDown={handleSearchInputKeyDown}/>

                                <button id="submitBtn" className="btn btn-primary" onClick={fetchCollegeData}>
                                    Search
                                    <i className="bi bi-search ms-1"></i>
                                </button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }

    //college info table
    const CollegeInfoTable = ()=>{
        return(
            <div>
                <div className="card shadow-sm border">
                <DataTable size="small" value={data}  stripedRows responsiveLayout="scroll" paginator loading={loading}
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,50]}>
                        <Column field="name" header="Name" sortable></Column>
                        <Column field="web_pages" header="Website" body={websiteBodyTemplate} sortable></Column>
                        <Column field="domains" header="Domains" sortable></Column>
                        <Column field="country" header="Country" sortable></Column>
                    </DataTable>
                </div>
            </div>
        )
    }
    

    return(
        <section id="collegeFinderApp" className="container mb-5">
            <SearchBox/>
            <hr />
            <CollegeInfoTable/>
        </section>
    )
}