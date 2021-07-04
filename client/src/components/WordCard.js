import React, { Component } from 'react'
import {Button, Modal,Container, Row, Col} from 'react-bootstrap';
import WordEntry from './WordEntry'
import axios from 'axios';
export default class WordCard extends Component {
    constructor(){
        super()
        this.state = {
            wordDetails : [],
            detailsBox : false
        }
    }
    fetchDetails = async () => {
        this.setState({detailsBox:true})
        const url = 'http://localhost:8000/home/'+this.props.data.word
        //api call to fetch word details
        await axios.get(url).then(res=>{
            console.log(res.data.results[0].lexicalEntries)
            this.setState({wordDetails : res.data.results[0].lexicalEntries})
        }).catch(error=>{
            console.log(error)
        })
    }
   
    render() {
        const { data } = this.props;
        const { wordDetails } = this.state
        return (
            <>
            <Col xl = {5}  lg = {5} md = {5} sm = {10} xs = {10} onClick = {this.fetchDetails} className = "word-card">
                <Row>
                    <Col><h4 >{data.word}</h4></Col>
                </Row>
                <Row>
                    <Col><p>({data.type}){data.definition}</p></Col>
                </Row>
                <Row>
                    <Col><p>Example : {data.example}</p></Col>
                </Row>
            </Col>
                   <Modal 
                   
                   show={this.state.detailsBox} 
                   animation={false} 
                   onHide={()=>this.setState({ detailsBox: false })}
                   aria-labelledby="example-modal-sizes-title-lg"
               >
                   <Modal.Header closeButton>
                        <Modal.Title>{data.word}</Modal.Title>
                   </Modal.Header>
       
                   <Modal.Body>
                       {wordDetails.length > 0 ? wordDetails.map((entry,index)=><WordEntry key = {index}data = {entry} />) : "Loading..."}                  
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
                                
                               </Col>
                           </Row>
                       }
                   </Modal.Body>
       
                   <Modal.Footer className="text-center mb-3 d-flex justify-content-center">
   
                   </Modal.Footer>
               </Modal>
            </>
        )
    }
}
