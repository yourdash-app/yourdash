/*
 * Copyright (c) 2023 YourDash contributors.
 * YourDash is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Application as ExpressApplication } from "express"

type ITJson = boolean | number | string | null | TJson

type TJson = {
  [ key: string ]: ITJson
}

export const userDatabases = new Map<string, TJson>()

export default function defineUserDatabaseRoutes( exp: ExpressApplication ) {
  exp.get( "/core/user_db", async ( req, res ) => {
    const { username } = req.headers as { username: string }
    
    return res.json( userDatabases.get( username ) || {} )
  } )
  
  exp.post( "/core/user_db", async ( req, res ) => {
    const { username } = req.headers as { username: string }
    
    userDatabases.set( username, req.body )
    
    return res.json( { success: true } )
  } )
}