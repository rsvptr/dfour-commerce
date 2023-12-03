//Frontend component - Meta.js

//This file is responsible for implementing the custom page title and meta functionality by using react helmet. 

//All required components are imported here.
import React from 'react'
import { Helmet } from 'react-helmet'

//The below code takes in the props title, description and keywords as input and generates meta tags and also sets the title of each page appropriately (according to the product).
const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}
//Default props incase no data is provided
Meta.defaultProps = {
  title: 'DFour-C Shop',
  description: 'We sell the best products for cheap',
  keywords: 'electronics, buy electronics, cheap electroincs',
}

export default Meta
