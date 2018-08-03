// ########################  begin DOMContentLoaded ########################
document.addEventListener('DOMContentLoaded', () => {
  // wait till page loads before setting up javascript elements
  document.getElementById('btn_create_route').onclick = create_route;

});
// ########################  end DOMContentLoaded ########################


// send current cart to server
function create_route() {

  console.log("running create_route function")
  const create_route = new XMLHttpRequest();
  create_route.open('POST', '/create_new_route');
  create_route.setRequestHeader("X-CSRFToken", CSRF_TOKEN);

  create_route.onload = () => {
    const message = JSON .parse(create_route.responseText)
    console.log(message)
    if (message.success == true) {
      alert(`Route created: ${message.route_id}: ${message.route_name}`)
    }

  } //end onload

  // Add data to send with request
  const data = new FormData();

  data.append('route_name', document.getElementById('route_name').value);
  data.append('miles', document.getElementById('miles').value);
  data.append('vertical_feet', document.getElementById('vertical_feet').value);
  data.append('origin', document.getElementById('origin').value);

  create_route.send(data); // Send request
  return false; // avoid sending the form

} // end place_order
