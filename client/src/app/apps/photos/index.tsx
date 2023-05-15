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
