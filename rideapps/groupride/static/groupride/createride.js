// ########################  begin DOMContentLoaded ########################
document.addEventListener('DOMContentLoaded', () => {
  // wait till page loads before setting up javascript elements
  document.getElementById('btn_create_ride').onclick = create_ride;

});
// ########################  end DOMContentLoaded ########################


// send current cart to server
function create_ride() {

  const create_ride = new XMLHttpRequest();
  create_ride.open('POST', '/create_new_ride');
  create_ride.setRequestHeader("X-CSRFToken", CSRF_TOKEN);

  ride_name = document.getElementById('ride_name').value;

  rd = document.getElementById('ride_date').value;
  rd_split = rd.split('-');

  rt = document.getElementById('ride_time').value;
  rt_split = rt.split(':');
  ride_date = rd_split.concat(rt_split);

  r = document.getElementById('route');
  route_id = r.options[r.selectedIndex].value;

  // ensure no null fields. return if null exists.
  // server will do remaining data validation.
  fields_to_validate = {"Name":ride_name,
          "Date":ride_date,
          "Time":ride_time,
          "Route":route};
  validation_result = test_for_null(fields_to_validate);
  if (validation_result) {
    display_message("create_ride_message",false, "Fill in all fields! ", `A value for '${validation_result}' is missing.`);
    return;
  }

  // upon response from server...
  create_ride.onload = () => {
    const message = JSON .parse(create_ride.responseText)
    display_message("create_ride_message",message.success, message.headline, message.message);

    // clear form if form operation was successful
    if ( message.success == true ) {
      document.getElementById("frm_create_ride").reset();
    }
  } //end onload

  // Add data to send with request
  const data = new FormData();
  data.append('ride_name', ride_name);
  data.append('ride_date', ride_date);
  data.append('route_id',route_id);
  create_ride.send(data); // Send request

  return false; // avoid sending the form

} // end place_order

// accepts a dictionary of fields and their values
// returns the first null element
// if no elements are null, returns false
function test_for_null (elements) {
  for (e in elements) {
    if (elements[e] == "") { return (e) }
  }
  return false

} // end validate_entry

//will unhide alert on screen
//args.  (text divid for alert, bool, bold text, error text)
//the bool value drives the alert being red or green
function display_message(divid, success, headline, message) {
  alert = document.getElementById(divid);

  if (success == true){
    alert.className = "alert alert-success";
  } else {
    alert.className = "alert alert-danger";
  }

  document.getElementById("headline").innerHTML = headline;
  document.getElementById("error").innerHTML = message;
  alert.hidden = false;

} // end display_message()
