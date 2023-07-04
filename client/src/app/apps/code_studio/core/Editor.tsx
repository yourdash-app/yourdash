import React, {useEffect, useRef} from "react";
import CodeStudioEditor from "./editor/editor";
import CodeStudioLanguageParser from "./editor/languageParser/lang/javascript";

const Editor: React.FC = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const editor = new CodeStudioEditor(ref.current);

    editor._debugRenderParsedString(
      "import { Component } from \"react\";\n" +
      "\n" +
      "module Greetings {\n" +
      "  export abstract class Greeter<T> {\n" +
      "    greetNTimes(\n" +
      "      to,\n" +
      "      {\n" +
      "        from,\n" +
      "        times\n" +
      "      }: {\n" +
      "        from: string[],\n" +
      "        times: number\n" +
      "      }\n" +
      "    ) {\n" +
      "      return range(times).map(item => this.greet(to, from));\n" +
      "    }\n" +
      "    \n" +
      "    abstract greet(to: string, from: string[]): T\n" +
      "  }\n" +
      "  \n" +
      "  export class ConsoleGreeter extends Greeter<string> {\n" +
      "    greet(to: string, from: string[]): string {\n" +
      "      return `Hello, ${ to } from ${ from.join(\",\") }`;\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "  export class ReactGreeter extends Greeter<JSX.Element> {\n" +
      "    greet(to, from): JSX.Element {\n" +
      "      return (<div className=\"greeting\">\n" +
      "        Hello, { to } from\n" +
      "        { from.map(name => <Name>{ name }</Name>) }\n" +
      "      </div>);\n" +
      "    }\n" +
      "  }\n" +
      "  \n" +
      "  type Season = Winter | Spring | Summer | Autumn;\n" +
      "  \n" +
      "  type Foobar =\n" +
      "    {\n" +
      "      foo: string\n" +
      "    }\n" +
      "    & {\n" +
      "    bar: number\n" +
      "  }\n" +
      "  \n" +
      "  var g: Greetings.ReactGreeter = new ReactGreeter();\n" +
      "  \n" +
      "  function* fibonacci(current = 1, next = 1) {\n" +
      "    yield current;\n" +
      "    yield* fibonacci(next, current + next);\n" +
      "  }\n" +
      "  \n" +
      "  let [first, second, ...rest] = take(fibonacci(), 10);\n" +
      "  \n" +
      "  function foo(x, y, z) {\n" +
      "    var i = 0;\n" +
      "    var x = {\n" +
      "      0: \"zero\",\n" +
      "      1: \"one\"\n" +
      "    };\n" +
      "    var a = [0, 1, 2];\n" +
      "    var foo = function () {};\n" +
      "    var asyncFoo = async (x, y, z) => { };\n" +
      "    var v = x.map(s => s.length);\n" +
      "    if ( !i > 10 ) {\n" +
      "      for ( var j = 0; j < 10; j++ ) {\n" +
      "        switch ( j ) {\n" +
      "          case 0:\n" +
      "            value = \"zero\";\n" +
      "            break;\n" +
      "          case 1:\n" +
      "            value = \"one\";\n" +
      "            break;\n" +
      "        }\n" +
      "        var c = j > 5 ? \"GT 5\" : \"LE 5\";\n" +
      "      }\n" +
      "    } else {\n" +
      "      var j = 0;\n" +
      "      try {\n" +
      "        while ( j < 10 ) {\n" +
      "          if ( i == j || j > 5 ) {\n" +
      "            a[ j ] = i + j * 12;\n" +
      "          }\n" +
      "          i = (j << 2) & 4;\n" +
      "          j++;\n" +
      "        }\n" +
      "        do {\n" +
      "          j--;\n" +
      "        } while ( j > 0 );\n" +
      "      } catch ( e ) {\n" +
      "        alert(\"Failure: \" + e.message);\n" +
      "      } finally {\n" +
      "        reset(a, i);\n" +
      "      }\n" +
      "    }\n" +
      "  }\n" +
      "}\n",
      new CodeStudioLanguageParser()
    );
  }, []);

  return (
    <div ref={ref}/>
  );
};

export default Editor;
