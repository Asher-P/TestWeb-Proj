const Route = ({ path, children }) => {
  console.log("path", path);
  console.log(window.location.pathname);
  return window.location.pathname === path ? children : null;
};

export default Route;
