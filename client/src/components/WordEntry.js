import React, { Component } from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import '../App.css'

export default class WordEntry extends Component {

    render() {
        const { data } = this.props;
        console.log("wordModal",this.props)
        return (
            <Container fluid>
                <Row>
                    <Col>                        
                        {data.entries[0].etymologies ? <p className = "grey">(Origin){data.entries[0].etymologies}</p> :""}
                        <p className = "grey">{data.lexicalCategory.text}</p>                        
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {data.entries ? data.entries[0].senses.map((sense,index)=>{
                            return <>
                            {sense.definitions ? sense.definitions.map((def,j) => <p key = {j}><strong>{def}</strong></p> ) : ""}
                            <ul>
                                {sense.examples ? sense.examples.map((example,i)=><li key ={i} >{example.text}</li>) : ""}
                            </ul>
                            </>
                        }) : ""}                      
                    </Col>
                </Row>
                {data.derivatives?<Row>
                                <Col>                        
                                    <p >(Derivatives)  {data.derivatives.map((w,k)=>(w.text+","))}</p>                        
                                </Col>
                            </Row> :""}
            </Container>
        )
    }
}
