import React, { Component } from 'react'
import {Button, Modal,Container, Row, Col, Form} from 'react-bootstrap';
import * as Fab from 'react-floating-action-button'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import axios from 'axios'

import WordCard from './components/WordCard'


export default class App extends Component {
  constructor(){
    super()
    this.state = {
      dictionary : [],
      searchvisible : false,
      searchInput : "",
      showDialogBox : false,
      word : "",
      error : "",
      isLoading : false
    }
  }
  componentDidMount(){
    this.fetchWords()
  }

  render() {
    const { searchvisible, dictionary, isLoading } = this.state
    return (
      <div className="App">
       <Container className = "topbar" fluid>
        <Row className = "topbar-row">
            <Col xl = {6} lg = {6} md = {6} sm = {6} xs = {6} className = "title">
              <h2 className = "title-heading">Vocab</h2>
            </Col>
            <Col  xl = {5} lg = {5} md = {5} sm = {5} xs = {5} className = "searchbar">
              {searchvisible ?
               <input type = "text"
                      className = "search" 
                      placeholder = "Search..."
                      onChange = {(e)=>this.setInputValue(e,"searchInput")}
                      onBlur = {this.toggleSearch}
                      onFocus = {this.onInputFocus}></input>: 
               <i className="fa fa-search search-icon" aria-hidden="true" onClick = {this.toggleSearch}></i>}
            </Col>
          </Row>
       </Container>
       <Container className = "body" fluid>
          <Row >
            <Col style = {{borderBottom : '0.1px solid grey',boxSizing : 'border-box',marginBottom : '0'}}>
                <p className = "sub-title">Words List</p>
            </Col>
          </Row>
          <br />
          <Row>
            {dictionary.length === 0? <h4>Loading...</h4> : ""}
            {this.renderWordCards()}
                {/* {dictionary.length > 0 ? dictionary.map((data,index)=><WordCard key = {index} data = {data} />) : null} */}
          </Row>
       </Container>

      
       <Modal 
            className = "modal"
            show={this.state.showDialogBox} 
            animation={false} 
            onHide={()=>this.setState({ showDialogBox: false })}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title><h4>Add New Word</h4></Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label><p>Word *</p></Form.Label>
                            <Form.Control 
                                className = "modal-input"
                                type="text" 
                                placeholder="Enter New Word..."
                                value={this.state.name}
                                onChange={(event)=>this.setInputValue(event,"word")}
                                onFocus = {()=>this.setState({error:""})}
                            />
                        </Form.Group>
                    </Col>
                </Row>                       
                {
                    this.state.error?
                    <Row className="text-center mt-1 mb-1 d-flex justify-content-center">
                        <Col style={{ color: "red" }}>
                            {this.state.error}
                        </Col>
                    </Row>
                    :
                    <Row className="text-center mt-1 mb-1 d-flex justify-content-center">
                        <Col>
                            <p>Fields marked * are mandatory</p>
                        </Col>
                    </Row>
                }
            </Modal.Body>

            <Modal.Footer className="text-center mb-3 d-flex justify-content-center">
                <Button 
                    style={{ width: "30%",backgroundColor : '#5c1349',border:'none' }} 
                    className="pt-2 pb-2" 
                    variant="primary"
                    onClick={()=>this.validateForm()}
                    className = "modal-button"
                >
                    {isLoading ? "Loading..." : "Add"}
                </Button>
            </Modal.Footer>
        </Modal>

       <Fab.Container>
                    <Fab.Button
                        styles={{backgroundColor: '#5c1349', color: Fab.lightColors.white, width: 30, height: 30 }}
                        tooltip="Add New Word"
                        icon="fa fa-plus"
                        onClick={()=>this.addWord()}
                        className="btn-block z-depth-1a"
                    />
                </Fab.Container>
      </div>
    )
  }

  //methods..

  fetchWords = async () => {
    this.setState({isLoading:true})
    const url = 'http://localhost:8000/home'
    //api call to fetch words from database
    await axios.get(url).then(res=>{
      console.log(res)
      this.setState({dictionary : res.data,isLoading:false})
    }).catch(err=>{
      console.log(err)
    })
  }
  toggleSearch = () => {
    this.setState((prevState)=>({searchvisible : !prevState.searchvisible}))
    // this.setState({searchInput:""})
  }
  setInputValue = (event,key) => {
    this.setState({ [key]: event.target.value });
  }
  onInputFocus = () => {
    this.setState({searchInput:""})
  }
  addWord = () => {
    this.setState({ showDialogBox: true });
  }
  validateForm = () => {
    if(this.state.word === ""){
      this.setState({error : "Please Enter a Word"})
    }else{
      this.searchApi();
    }
  }
  searchApi = async () => {
    const { word } = this.state
    this.setState({isLoading:true})

    const url = 'http://localhost:8000/add/' + word
    //api call to add a new word in database
     await axios.get(url).then(res => {
      console.log(res.data)
      if(res.data!=="success"){
        this.setState({error : "No Entry Found",isLoading:false})
      }else{
        this.setState({ showDialogBox: false,isLoading:false });
        this.fetchWords()
      }
    }).catch(err=>this.setState({error : "Something Went Wrong. Please Try Again"}))
  }
  renderWordCards = () => {
    const { dictionary, searchInput } = this.state

    const filteredwords = dictionary.filter(
      (word) => {
        if(word.word !== undefined)
          return word.word.indexOf(searchInput.toLocaleLowerCase()) !== -1 ;
      }
    )
    return filteredwords.map((data,index)=><WordCard key = { index } data = { data } />)

  }
}
