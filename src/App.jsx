import React, { Component } from 'react';
import { Button, Card, Col, Container, FormControl, InputGroup, Row, Stack, Table } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../src/app.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ReactPaginate from "react-paginate";

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isloaded:false,
            data:[],
            activePage: 1,
            itemsPerPage: 0,
            totalItemsCount: 0,
            pageRangeDisplayed: 0,
            value : 'Ghana',
            numberOfRecordsVisited:0
        };

        this.TextValueChanged = this.TextValueChanged.bind(this);
    }

    FormSubmit=(e)=>{
        e.preventDefault();
    }

    TableHeader(){
        return(
            <thead className='table-dark'>
            <tr >
                <th scope="col">#</th>
                <th scope="col">Website</th>
                <th scope="col">Name</th>
                <th scope="col">Country</th>
                <th scope="col">Domains</th>                            
            </tr>
            </thead>
        );
    }

    TableDetails(props){
        const data = props.data;
        const isloaded = props.isloaded;
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
        else{
            if(data.length === 0){
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
                            <td>{index+1}</td>
                            <td><a target='_blank' href={item.web_pages}>{item.web_pages}</a></td>
                            <td><strong>{item.name}</strong></td>
                            <td>{item.country}</td>
                            <td>{item.domains}</td>
                        </tr>
                    ))

                    /*data.slice(
                        this.state.numberOfRecordsVisited,
                        this.state.numberOfRecordsVisited + this.state.itemsPerPage
                    )
                    .map((item,index)=>(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td><a target='_blank' href={item.web_pages}>{item.web_pages}</a></td>
                            <td><strong>{item.name}</strong></td>
                            <td>{item.country}</td>
                            <td>{item.domains}</td>
                        </tr>
                    ))*/
                );
            }
        }
        
    }

    DataFetch(){
        //console.log(this.state.value);
        var url = 'http://universities.hipolabs.com/search?country='+ this.state.value;
        fetch(url)
        .then(res=>res.json())
        .then(
            (result) =>{
                this.setState({
                    isloaded: true,
                    data: result,
                    totalItemsCount: result.length,
                    itemsPerPage: 5,
                    pageRangeDisplayed: Math.ceil(result.length / 5),
                    numberOfRecordsVisited:this.state.activePage * 5
                });
                console.log(this.state.numberOfRecordsVisited);
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

    changePage = ({ selected }) => {
        //setPage(selected);
        this.setState({activePage:selected});
      };

     ButtonClicked=()=>{
        this.DataFetch();
        <this.TableDetails items={this.state.data} isloaded={this.state.isloaded} error={this.state.error}/>
    }

    TextValueChanged=(e)=> {
        var value = e.target.value;
        this.setState({value: value});
    }

    componentDidMount(){
        this.DataFetch();
    }
    render(){
        const { data, error, isloaded, value} = this.state;
        return(
            <Container className='p-5 mt-5'>
                <Stack gap='1'>
                <h2 className='text-center mb-4'>Welcome to University Information Portal</h2>
                <Row>
                    <Col className="mb-3">
                    <form onSubmit={this.FormSubmit.bind(this)}>
                        <div className="input-group" hidden>
                            <input type="text" className="form-control form-control-lg" id="country" name="country" 
                            placeholder="Enter Country Name" aria-describedby="searchbtn" onChange={this.TextValueChanged} required/>

                            <button className="btn btn-success" id="searchbtn" onClick={this.ButtonClicked}>Search Country</button>
                        </div>

                        <InputGroup className='shadow'>
                            <FormControl type='text' size='lg' placeholder='Search by country name' onChange={this.TextValueChanged}/>
                            <Button variant="primary" id="searchbtn" onClick={this.ButtonClicked.bind(this)}>
                            <i className="bi bi-search me-2"></i>Search</Button>
                        </InputGroup>
                    </form>
                    </Col>
                </Row>

                <Card className='shadow'>
                    <Card.Body className='p-0'>
                    <Table responsive='lg' hover>
                        <this.TableHeader/>
                        <tbody>
                        <this.TableDetails isloaded={isloaded} data={data}/>
                        </tbody>
                    </Table>
                    </Card.Body>

                    <Card.Footer>
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        
                        containerClassName={"navigationButtons"}
                        previousLinkClassName={"previousButton"}
                        nextLinkClassName={"nextButton"}
                        disabledClassName={"navigationDisabled"}
                        activeClassName={"navigationActive"}
                        />
                    </Card.Footer>
                </Card>
                </Stack>
            </Container>
        )
    }
}

export default App;