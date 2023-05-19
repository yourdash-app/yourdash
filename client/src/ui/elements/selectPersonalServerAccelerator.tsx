import React, { useState, useEffect } from "react"
import csi from "helpers/csi"

const SelectPersonalServerAccelerator: React.FC = () => {
  const [personalServerAccelerators, setPersonalServerAccelerators] = useState( [] )

  useEffect( () => {
    csi.getJson( "/" )
  }, [] )

  return <div>selectPersonalServerAccelerator component</div>
}

export default SelectPersonalServerAccelerator
