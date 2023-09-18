/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react"
import { Routes, Route } from "react-router"
import PhotosApplication from "./photosApplication"

const PhotosRouter: React.FC = () => {
  return (
    <Routes>
      <Route index element={ <PhotosApplication/> }/>
    </Routes>
  )
}

export default PhotosRouter
