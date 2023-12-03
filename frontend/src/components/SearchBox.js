//Frontend component - SearchBox.js

//This file is responsible for implementing the search box and search functionality on the website. 

//All required components are imported here.
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

/*The below code defines the properties of the search box (such as it being embedded in the header) and also defines how it should behave (such as show the product details if keyword matches, else show blank page)*/
const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
      <tab></tab>
		<i
style={{ color: '#95a5a6' }}
className='fas fa-search'
/>
<tab></tab>
Search
      </Button>
    </Form>
  )
  }

export default SearchBox
