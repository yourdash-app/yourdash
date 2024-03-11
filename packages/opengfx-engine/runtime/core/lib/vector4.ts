/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default class Vector4 {
  x: number;
  y: number;
  z: number;
  w: number;
  
  constructor( x: number, y: number, z: number, w: number ) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
  
  set( x: number, y: number, z: number, w: number ): this {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    
    return this;
  }
  
  add( x: number, y: number, z: number, w: number ): this {
    this.x += x;
    this.y += y;
    this.z += z;
    this.w += w;
    
    return this;
  }
  
  sub( x: number, y: number, z: number, w: number ): this {
    this.x -= x;
    this.y -= y;
    this.z -= z;
    this.w -= w;
    
    return this;
  }
  
  mul( x: number, y: number, z: number, w: number ): this {
    this.x *= x;
    this.y *= y;
    this.z *= z;
    this.w *= w;
    
    return this;
  }
  
  div( x: number, y: number, z: number, w: number ): this {
    this.x /= x;
    this.y /= y;
    this.z /= z;
    this.w /= w;
    
    return this;
  }
  
  addVector( vector: Vector4 ): this {
    this.x += vector.x;
    this.y += vector.y;
    this.z += vector.z;
    this.w += vector.w;
    
    return this;
  }
  
  subVector( vector: Vector4 ): this {
    this.x -= vector.x;
    this.y -= vector.y;
    this.z -= vector.z;
    this.w -= vector.w;
    
    return this;
  }
  
  mulVector( vector: Vector4 ): this {
    this.x *= vector.x;
    this.y *= vector.y;
    this.z *= vector.z;
    this.w *= vector.w;
    
    return this;
  }
  
  divVector( vector: Vector4 ): this {
    this.x /= vector.x;
    this.y /= vector.y;
    this.z /= vector.z;
    this.w /= vector.w;
    
    return this;
  }
  
  clone(): Vector4 {
    return new Vector4( this.x, this.y, this.z, this.w );
  }
  
  copy( vec: Vector4 ): this {
    this.x = vec.x;
    this.y = vec.y;
    this.z = vec.z;
    this.w = vec.w;
    
    return this;
  }
  
  addScaledVector( vector: Vector4, scale: number ): this {
    this.x += vector.x * scale;
    this.y += vector.y * scale;
    this.z += vector.z * scale;
    this.w += vector.w * scale;
    
    return this;
  }
  
  scale( scale: number ): this {
    this.x *= scale;
    this.y *= scale;
    this.z *= scale;
    this.w *= scale;
    
    return this;
  }
  
  random(): Vector4 {
    this.x = Math.random();
    this.y = Math.random();
    this.z = Math.random();
    this.w = Math.random();
    
    return this;
  }
  
  toRawArray(): Float32Array {
    return new Float32Array( [ this.x, this.y, this.z, this.w ] );
  }
  
  toString(): string {
    return `(${ this.x }, ${ this.y }, ${ this.z }, ${ this.w })`;
  }
}
