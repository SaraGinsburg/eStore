import React from 'react'
import { Helmet } from 'react-helmet'
const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <meta name="keyword" content={keywords}></meta>
    </Helmet>
  )
}
Meta.defaultProps = {
  title: 'Welcome to eStore',
  description: 'find the best electronics here, and the price is reasonable',
  keywords: 'electronics, best price electronics',
}

export default Meta
