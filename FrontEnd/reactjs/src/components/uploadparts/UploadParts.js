import React from 'react'
import Header from '../Header'
import FileUpload from '../fileupload/FileUpload'
import MenuContainer from '../menu/MenuContainer'

const UploadParts = () => {
  return (
    <div>

    <Header>
        <MenuContainer></MenuContainer>
        Upload Parts
    </Header>

    <FileUpload></FileUpload>
    </div>
  )
}

export default UploadParts