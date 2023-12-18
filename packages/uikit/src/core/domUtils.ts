/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

class DomUtils {
  removeAllChildren( element: HTMLElement ) {
    while ( element.firstChild ) {
      element.removeChild( element.firstChild )
    }
  }

  removeElement( element: HTMLElement ) {
    if ( element.parentElement ) {
      element.parentElement.removeChild( element )
    }
  }

  removeClass( element: HTMLElement, className: string ) {
    element.classList.remove( className )
  }

  addClass( element: HTMLElement, className: string, { confilcts }: { confilcts?: string[] } = {} ) {
    if ( confilcts ) {
      confilcts.forEach( conflict => {
        if ( this.hasClass( element, conflict ) ) {
          this.removeClass( element, conflict )
        }
      } )
    }

    element.classList.add( className )
  }

  hasClass( element: HTMLElement, className: string ) {
    return element.classList.contains( className )
  }

  toggleClass( element: HTMLElement, className: string ) {
    if ( this.hasClass( element, className ) ) {
      this.removeClass( element, className )
    } else {
      this.addClass( element, className )
    }
  }

  getAttribute( element: HTMLElement, attribute: string ) {
    return element.getAttribute( attribute )
  }

  setAttribute( element: HTMLElement, attribute: string, value: string ) {
    element.setAttribute( attribute, value )
  }

  removeAttribute( element: HTMLElement, attribute: string ) {
    element.removeAttribute( attribute )
  }

  getBounds( element: HTMLElement ) {
    return element.getBoundingClientRect()
  }
}

const domUtils = new DomUtils()

export default domUtils
