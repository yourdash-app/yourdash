export default function parseArguments( args: string[] ): { [ arg: string ]: string | boolean } {
  const parsedArguments: { [ arg: string ]: string | boolean } = {}

  args.map( ( a, ind ) => {
    if ( a.startsWith( "--" ) ) {
      if ( args[ind + 1] && !args[ind + 1].startsWith( "-" ) ) {
        parsedArguments[a] = args[ind + 1]
        delete args[ind + 1]
      } else {
        parsedArguments[a] = true
      }
      return null
    }
    if ( a.startsWith( "-" ) ) {
      a.split( "" ).forEach( split => {
        if ( split !== "-" ) {
          parsedArguments[`-${ split }`] = true
        }
      } )
    }
    return null
  } )

  return parsedArguments
}
