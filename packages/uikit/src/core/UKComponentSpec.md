# UKComponent Spec

State:
    State is the primary way in which a UKComponent should store data
    
- Using state is not required but is recommended as a common practice
- State is to be used in place of props in e.g: React
- state will not dynamically update the component but UKComponent provides an update function which will re-render 
  the component, this will help stop re-renders from occurring when they are not needed and allows further control 
  from component and project developers
