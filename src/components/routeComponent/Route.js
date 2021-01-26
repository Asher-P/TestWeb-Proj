const Route = ({ path, children }) => {
  console.log("path",path);
  return window.location.pathname === path ? children : null;
};

export default Route;
