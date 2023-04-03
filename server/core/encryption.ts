import crypto from "crypto";
import bcrypt from "bcrypt"


// FIXME: replace me this is a placeholder value!
const INSTANCE_ENCRYPTION_KEY = "test key"

export function encrypt(text: string) {
  const iv = crypto.randomBytes( 25 );
  const salt = crypto.randomBytes( 25 );
  const key = crypto.scryptSync( INSTANCE_ENCRYPTION_KEY, salt, 50 );
  
  const cipher = crypto.createCipheriv( "aes-256-cbc", key, iv );
  let encrypted = cipher.update( text, "utf8", "hex" );
  encrypted += cipher.final( "hex" );
  
  return `${ iv.toString( "hex" ) }:${ salt.toString( "hex" ) }:${ encrypted }`;
}

export function decrypt(text: string) {
  const [ ivs, salts, data ] = text.split( ":" );
  const iv = Buffer.from( ivs, "hex" );
  const salt = Buffer.from( salts, "hex" );
  const key = crypto.scryptSync( INSTANCE_ENCRYPTION_KEY, salt, 50 );
  
  const decipher = crypto.createDecipheriv( "aes-256-cbc", key, iv );
  let decrypted = decipher.update( data, "hex", "utf8" );
  decrypted += decipher.final( "utf8" );
  
  return decrypted.toString();
}

export function generateRandomStringOfLength(length: number) {
  const characters = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
  
  return Array.from( { length }, () => characters[Math.floor( Math.random() * characters.length )] ).join( "" );
}

export function hash(input: string): Promise<string> {
  return new Promise( (resolve) => {
    let saltRounds = 10
    bcrypt.hash( input, saltRounds, (err, hash) => {
      if (err) console.error( err )
      
      resolve( hash )
    } )
  } )
}

export function compareHash(hash: string, input: string): Promise<boolean> {
  return new Promise( (resolve) => {
    bcrypt.compare( input, hash, (err, response) => {
      if (err) console.error( err )
      
      resolve( response )
    } )
  } )
}
