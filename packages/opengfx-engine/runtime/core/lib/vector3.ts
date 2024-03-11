/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default class Vector3 {
  x: number;
  y: number;
  z: number;
  
  constructor( x: number, y: number, z: number ) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  
  set( x: number, y: number, z: number ): this {
    this.x = x;
    this.y = y;
    this.z = z;
    
    return this;
  }
  
  add( x: number, y: number, z: number ): this {
    this.x += x;
    this.y += y;
    this.z += z;
    
    return this;
  }
  
  sub( x: number, y: number, z: number ): this {
    this.x -= x;
    this.y -= y;
    this.z -= z;
    
    return this;
  }
  
  mul( x: number, y: number, z: number ): this {
    this.x *= x;
    this.y *= y;
    this.z *= z;
    
    return this;
  }
  
  div( x: number, y: number, z: number ): this {
    this.x /= x;
    this.y /= y;
    this.z /= z;
    
    return this;
  }
  
  addVector( vector: Vector3 ): this {
    this.x += vector.x;
    this.y += vector.y;
    this.z += vector.z;
    
    return this;
  }
  
  subVector( vector: Vector3 ): this {
    this.x -= vector.x;
    this.y -= vector.y;
    this.z -= vector.z;
    
    return this;
  }
  
  mulVector( vector: Vector3 ): this {
    this.x *= vector.x;
    this.y *= vector.y;
    this.z *= vector.z;
    
    return this;
  }
  
  divVector( vector: Vector3 ): this {
    this.x /= vector.x;
    this.y /= vector.y;
    this.z /= vector.z;
    
    return this;
  }
  
  clone(): Vector3 {
    return new Vector3( this.x, this.y, this.z );
  }
  
  copy( vec: Vector3 ): this {
    this.x = vec.x;
    this.y = vec.y;
    this.z = vec.z;
    
    return this;
  }
  
  addScaledVector( vector: Vector3, scale: number ): this {
    this.x += vector.x * scale;
    this.y += vector.y * scale;
    this.z += vector.z * scale;
    
    return this;
  }
  
  scale( scale: number ): this {
    this.x *= scale;
    this.y *= scale;
    this.z *= scale;
    
    return this;
  }
  
  random(): Vector3 {
    this.x = Math.random();
    this.y = Math.random();
    this.z = Math.random();
    
    return this;
  }
  
  toRawArray(): Float32Array {
    return new Float32Array( [ this.x, this.y, this.z ] );
  }
  
  toString(): string {
    return `(${ this.x }, ${ this.y }, ${ this.z })`;
  }
}
