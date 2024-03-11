/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default class Vector2 {
  x: number;
  y: number;
  
  constructor( x: number, y: number ) {
    this.x = x;
    this.y = y;
  }
  
  set( x: number, y: number ): this {
    this.x = x;
    this.y = y
    
    return this;
  }
  
  add( x: number, y: number ): this {
    this.x += x;
    this.y += y
    
    return this;
  }
  
  sub( x: number, y: number ): this {
    this.x -= x;
    this.y -= y
    
    return this;
  }
  
  mul( x: number, y: number ): this {
    this.x *= x;
    this.y *= y
    
    return this;
  }
  
  div( x: number, y: number ): this {
    this.x /= x;
    this.y /= y
    
    return this;
  }
  
  addVector( vector: Vector2 ): this {
    this.x += vector.x;
    this.y += vector.y
    
    return this;
  }
  
  subVector( vector: Vector2 ): this {
    this.x -= vector.x;
    this.y -= vector.y
    
    return this;
  }
  
  mulVector( vector: Vector2 ): this {
    this.x *= vector.x;
    this.y *= vector.y
    
    return this;
  }
  
  divVector( vector: Vector2 ): this {
    this.x /= vector.x;
    this.y /= vector.y
    
    return this;
  }
  
  clone(): Vector2 {
    return new Vector2( this.x, this.y );
  }
  
  copy( vec: Vector2 ): this {
    this.x = vec.x;
    this.y = vec.y;
    
    return this;
  }
  
  addScaledVector( vector: Vector2, scale: number ): this {
    this.x += vector.x * scale;
    this.y += vector.y * scale;
    
    return this;
  }
  
  scale( scale: number ): this {
    this.x *= scale;
    this.y *= scale;
    
    return this;
  }
  
  random(): Vector2 {
    this.x = Math.random();
    this.y = Math.random();
    
    return this;
  }
  
  toRawArray(): Float32Array {
    return new Float32Array( [ this.x, this.y ] );
  }
  
  toString(): string {
    return `(${ this.x }, ${ this.y })`;
  }
}
