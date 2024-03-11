import{r as o,j as e,e as n,R as s,a}from"./index-5bcd9038.js";import{C as i}from"./editor-3c445f98.js";const c=()=>{const r=o.useRef(null);return o.useEffect(()=>{if(!r.current)return;new i(r.current).loadRawCode("name.js","ts",`import { Component } from "react";

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
`).then(t=>{console.log(t.rootNode)}).catch(t=>{console.error(t)})},[]),e.jsx("div",{className:"overflow-auto h-full w-full bg-[#333333] p-2",ref:r})},l=()=>(n.useState([]),e.jsx("div",{className:"flex items-center justify-center h-8 bg-container-bg text-container-fg border-b border-container-border",children:"TabContainer component"})),d=()=>(n.useState([]),e.jsx("div",{className:"flex items-center justify-start h-6 bg-container-bg text-container-fg border-t border-container-border overflow-hidden text-sm pl-1 pr-1",children:"StatusBar component"})),m=()=>e.jsx("section",{className:"border-r border-r-container-border bg-container-bg h-full p-2",children:e.jsx("div",{children:"FileManager"})}),u=()=>e.jsx("section",{className:"border-l border-l-container-border bg-container-bg h-full p-2",children:e.jsx("div",{children:"Symbols"})}),f=()=>e.jsxs("main",{className:"grid grid-rows-[auto,1fr,auto] h-full",children:[e.jsx("section",{children:e.jsx(l,{})}),e.jsxs("section",{className:"grid grid-cols-[auto,1fr,auto] h-full overflow-hidden",children:[e.jsx("section",{children:e.jsx(m,{})}),e.jsx(c,{}),e.jsx("section",{children:e.jsx(u,{})})]}),e.jsx("section",{children:e.jsx(d,{})})]}),b=()=>e.jsx(s,{children:e.jsx(a,{index:!0,element:e.jsx(f,{})})});export{b as default};
