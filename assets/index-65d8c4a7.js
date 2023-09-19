import{r,j as n,d as t,R as o,a as s}from"./index-01aaedfa.js";import{C as a,a as i}from"./editor-335f8fc2.js";const c=()=>{const e=r.useRef(null);return r.useEffect(()=>{if(!e.current)return;new a(e.current)._debugRenderParsedString(`import { Component } from "react";

// YourDash Javascript parser test script

module Greetings {
  export abstract class Greeter<T> {
    greetNTimes(
      to,
      {
        from,
        times
      }: {
        from: string[],
        times: number
      }
    ) {
      return range(times).map(item => this.greet(to, from));
    }
    
    abstract greet(to: string, from: string[]): T
  }
  
  export class ConsoleGreeter extends Greeter<string> {
    greet(to: string, from: string[]): string {
      return \`Hello, \${ to } from \${ from.join(",") }\`;
    }
  }
  
  export class ReactGreeter extends Greeter<JSX.Element> {
    greet(to, from): JSX.Element {
      return (<div className="greeting">
        Hello, { to } from
        { from.map(name => <Name>{ name }</Name>) }
      </div>);
    }
  }
  
  type Season = Winter | Spring | Summer | Autumn;
  
  type Foobar =
    {
      foo: string
    }
    & {
    bar: number
  }
  
  var g: Greetings.ReactGreeter = new ReactGreeter();
  
  function* fibonacci(current = 1, next = 1) {
    yield current;
    yield* fibonacci(next, current + next);
  }
  
  let [first, second, ...rest] = take(fibonacci(), 10);
  
  function foo(x, y, z) {
    var i = 0;
    var x = {
      0: "zero",
      1: "one"
    };
    var a = [0, 1, 2];
    var foo = function () {};
    var asyncFoo = async (x, y, z) => { };
    var v = x.map(s => s.length);
    if ( !i > 10 ) {
      for ( var j = 0; j < 10; j++ ) {
        switch ( j ) {
          case 0:
            value = "zero";
            break;
          case 1:
            value = "one";
            break;
        }
        var c = j > 5 ? "GT 5" : "LE 5";
      }
    } else {
      var j = 0;
      try {
        while ( j < 10 ) {
          if ( i == j || j > 5 ) {
            a[ j ] = i + j * 12;
          }
          i = (j << 2) & 4;
          j++;
        }
        do {
          j--;
        } while ( j > 0 );
      } catch ( e ) {
        alert("Failure: " + e.message);
      } finally {
        reset(a, i);
      }
    }
  }
}
`,new i("javascript"))},[]),n.jsx("div",{className:"overflow-auto h-full w-full bg-[#333333] p-2",ref:e})},l=()=>(t.useState([]),n.jsx("div",{className:"flex items-center justify-center h-8 bg-container-bg text-container-fg border-b border-container-border",children:"TabContainer component"})),d=()=>(t.useState([]),n.jsx("div",{className:"flex items-center justify-start h-6 bg-container-bg text-container-fg border-t border-container-border overflow-hidden text-sm pl-1 pr-1",children:"StatusBar component"})),u=()=>n.jsx("section",{className:"border-r border-r-container-border bg-container-bg h-full p-2",children:n.jsx("div",{children:"FileManager"})}),m=()=>n.jsx("section",{className:"border-l border-l-container-border bg-container-bg h-full p-2",children:n.jsx("div",{children:"Symbols"})}),f=()=>n.jsxs("main",{className:"grid grid-rows-[auto,1fr,auto] h-full",children:[n.jsx("section",{children:n.jsx(l,{})}),n.jsxs("section",{className:"grid grid-cols-[auto,1fr,auto] h-full overflow-hidden",children:[n.jsx("section",{children:n.jsx(u,{})}),n.jsx(c,{}),n.jsx("section",{children:n.jsx(m,{})})]}),n.jsx("section",{children:n.jsx(d,{})})]}),b=()=>n.jsx(o,{children:n.jsx(s,{index:!0,element:n.jsx(f,{})})});export{b as default};
