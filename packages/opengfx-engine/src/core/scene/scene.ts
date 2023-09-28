/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default class Scene {
  // Replace with Object[]
  objects: any[]
  
  constructor( props: { id: string, objects: Scene["objects"] } ) {
    this.objects = []
    
    return this
  }
  
  
}
