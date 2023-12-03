//Frontend component - FormContainer.js

//This file is responsible for making form container component, as some forms will have the same styles.
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const FormContainer = ({ children }) => {
  return (<>
  
  <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  </>
    
  )
}

export default FormContainer
