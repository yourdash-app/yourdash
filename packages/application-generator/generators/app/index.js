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

const Generator = require( "yeoman-generator" );

module.exports = class extends Generator {
  constructor( args, opts ) {
    super( args, opts );

    this.log("WARNING! REMEMBER TO ONLY RUN THIS GENERATOR WHILE INSIDE OF THE `packages/applications` DIRECTORY!!!")

    return
  }

  prompting() {
    return this.prompt( [{
      type: "input",
      name: "applicationName",
      message: "Your directory name",
      default: "my_yourdash_application" // Default directory name
    }] ).then( ( answers ) => {
      this.directoryName = answers.applicationName;
    } );
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath( "template_application" ),
      this.destinationPath( this.directoryName ),
      { title: 'Copying template' }
    );
  }
};