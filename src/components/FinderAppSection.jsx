
import { useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect } from "react";

//fetch data
/*const fetchCollegeData = ()=>{
    useEffect(()=>{
        async function fetchColleges(){
            const response = await fetch()
        }
    })
}*/


export default function FinderAppSection(){
    const [data,setData] = useState([]);//college data
    const [country,setCountry] = useState("");
    const [loading,setLoading] = useState(false); // loading feature

    useEffect(()=>{
        
    })

    async function fetchCollegeData(){
        var url = 'http://universities.hipolabs.com/search?country='+ country;
        const response = await fetch(url);
        const collegeData = await response.json(response);
       setData(collegeData);
       setCountry(null)
       //console.log(collegeData);
    }

    const handleSearchInputChange = (event)=>{
        setCountry(event.target.value);
        //console.log(country)
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
                                <input id="searchInput" type="text" className="form-control shadow-sm form-control-lg" placeholder="Search by country"
                                onChange={handleSearchInputChange} value={country} autoFocus  />
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
    const CollegeInfoTable = (props)=>{
        //const {data} = props;
        return(
            <div>
                <div className="card shadow">
                <DataTable size="small" value={data} lazy  stripedRows responsiveLayout="scroll" paginator
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,50]}>
                        <Column field="name" header="Name" sortable></Column>
                        <Column field="web_pages" header="Website" sortable></Column>
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
            <CollegeInfoTable data={data}/>
        </section>
    )
}