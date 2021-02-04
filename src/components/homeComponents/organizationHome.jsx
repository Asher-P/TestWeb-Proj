import Navigation from "../Navigation/navigation";

function OrganizationHome(props) {
  if (props.location.organizationProps === undefined)
    window.location.replace("/");
  return (
    <div>
      <Navigation
        organization={props.location.organizationProps.organization}
      />
      <div>
        <h1>Welcome to {props.location.organizationProps.organization.Name}</h1>
        <p>Feel free to explore the site!</p>
      </div>
    </div>
  );
}
export default OrganizationHome;
