const ComponentsLayout: React.FC = ({ children }) => {
  return (
    <div style={
        {
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "var(--container-fg)",
          backgroundColor: "var(--background)"
        }
      }
    >
      {children}
    </div>
  )
};

export default ComponentsLayout;
