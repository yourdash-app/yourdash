# CodeStudio UI Toolkit

CoreUI
    - Component

# Rules
1. CoreUI will be the parent for 1st level children
2. all subsequent Components will be children of their parent Component
3. A Component can only be a child of a Component or CoreUI 
4. Children do not re-render unless a custom component calls render() on it's children
5. All components have a render() function
6. All components have a firstParameter of their parent Component or CoreUI if they're a 1st level child

Basic Components
    container
    tabbed
    resizeable
    text
    button
    image
    heading
    subtext
    Input
        text
        file
        date
        time
        color
