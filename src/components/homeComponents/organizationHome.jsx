import Navigation from "../Navigation/navigation";

function OrganizationHome(props) {
  console.log(props.location.organizationProps);
  if (props.location.organizationProps === undefined)
    window.location.replace("/");
  const organization = props.location.organizationProps.organization;
  return (
    <div>
      <Navigation organization={organization} />
      <div>
        <h1>Welcome to {organization.Name}</h1>
        <p>Feel free to explore the site!</p>
      </div>
    </div>
  );
}
export default OrganizationHome;
