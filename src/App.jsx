import React, { Component } from 'react';
import { Button, Card, Col, Container, Form, FormControl, InputGroup, Navbar, Row, Table } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import './../src/app.css';

class App extends Component{
    constructor(props){
        super(props);
        this.state={
            isloaded:false,
            error:null,
            data:[],
            activePage: 1,
            itemsCountPerPage: 15,
            totalItemsCount: 0,
            pageRangeDisplayed: 0,
            isDataFetched:false,
            search:'',
            isSearchBtnClicked:false,
        }

        this.handlePageChange = this.handlePageChange.bind(this);
    }


    FormSubmit=(e)=>{
        e.preventDefault();
        this.handleSearchBtnClick();
    }

    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
    }

    handleSearchBtnClick(){
        //document.getElementById('app-card').classList.add('active');
        this.setState({
            isSearchBtnClicked:true,
            isloaded:false,
            isDataFetched:true,
            totalItemsCount:0,
        })
    }

    //NavBar Header
    AppNavNar = ()=>{
        return(
            <Navbar id='app-navbar' expand='lg' bg='white' variant='light' className='shadow-sm' sticky='top'>
                <Container>
                    <Navbar.Brand >UniSearch</Navbar.Brand>
                </Container>
            </Navbar>
        )
    }

    AppSearchPanel=()=>{
        return(
            <div id='app-search-panel' className="d-block w-100 text-center mb-3">
                <h4 className='app-title'>UniSearch</h4>
                <p className='app-desc text-black-50'>An online university search engine</p>
                <Row>
                    <Col>
                        <Form onSubmit={this.FormSubmit.bind(this)}>
                            <InputGroup className='shadow-sm'>
                                <FormControl type='text' size='lg' placeholder='Search by country' onInput={(e)=>this.setState({search:e.target.value})}/>
                                <Button variant="success" id="searchbtn" size='lg' onClick={this.handleSearchBtnClick.bind(this)}>
                                <i className="bi bi-search me-2"></i>Search</Button>
                            </InputGroup>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }

    TableHeader=()=>{
        return(
            <thead>
            <tr >
                <th scope="col" hidden>#</th>
                <th scope="col">Name</th>
                <th scope="col">Website</th>
                <th scope="col">Domains</th>  
                <th scope="col">Country</th>                          
            </tr>
            </thead>
        );

    }

    TableDetails(props){
        const {data,isloaded} = props;

        if(isloaded === false){
            return (
                <tr>
                    <td className="text-center mx-auto" colSpan="12" style={{ color: 'blue' }}>
                        <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
                        </div>
                        <span className='fs-5'>Please Wait....</span>
                    </td>
                </tr>
            );
        }
        else if(data.length === 0){
                return(
                    <tr>
                    <td className="text-center" colSpan="12" style={{color:'red'}}>
                        No Universities found
                    </td>
                    </tr> 
                );
        }
            else{
                return(
                    data.map((item,index)=>(
                        <tr key={index}>
                            <td hidden>{index+1}</td>
                            <td className='fw-bold'>{item.name}</td>
                            <td><a target='_blank' href={item.web_pages}>{item.web_pages}</a></td>
                            <td>{item.domains}</td>
                            <td>{item.country}</td>
                        </tr>
                    ))
                );
            }
        
        
    }


    AppSearchResults=(props)=>{
        const{isDataFetched,data,isloaded} = props;
        if(isDataFetched)
        {
            return(
                <Card id='app-card' className='shadow-sm border-0'>
                    <Card.Header>
                        <h5>Universities ({this.state.totalItemsCount})</h5>
                    </Card.Header>            
                    <Card.Body className='p-1'>
                        <div className='table-responsive-lg'>
                            <Table responsive='lg' hover striped>
                                <this.TableHeader/>
                                <tbody>
                                <this.TableDetails data={data} isloaded={isloaded}/>
                                </tbody>
                            </Table>
                        </div>
                    </Card.Body>

                    <Card.Footer className='d-flex justify-content-end align-items-end bg-white pt-1'>
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.itemsCountPerPage}
                            totalItemsCount={this.state.totalItemsCount}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange}
                            itemClass='page-item'
                            linkClass='page-link'
                        />
                    </Card.Footer>
                </Card>
            )
        }
        else{
            return null;
        }
        
    }

    handleUniDataFetch(){
        var url = 'http://universities.hipolabs.com/search?country='+ this.state.search;
        fetch(url)
        .then(res=>res.json())
        .then(
            (response) =>{
                this.setState({
                    isloaded: true,
                    data: response,
                    pageRangeDisplayed:5,
                    totalItemsCount:response.length,
                    isSearchBtnClicked:false,
                    totalItemsCount:response.length
                });
            },
            (error)=>{
                this.setState({
                    isLoaded: true,
                    error:error
                });

                //console.log(this.state.error);
            }
        )

    }

    componentDidUpdate(){
        if(this.state.isSearchBtnClicked){
            this.handleUniDataFetch();
        }
    }

    render(){
        const{data,isloaded,isDataFetched,activePage,itemsCountPerPage} = this.state;
        let items = data.slice((activePage - 1) * itemsCountPerPage, activePage * itemsCountPerPage);
        return(
            <>
                <this.AppNavNar/>
                <div id="main">
                    <Container>
                        <this.AppSearchPanel/>
                        <this.AppSearchResults isDataFetched={isDataFetched} data={items} isloaded={isloaded}/>
                    </Container>
                </div>
            </>
        )
    }
}

export default App;