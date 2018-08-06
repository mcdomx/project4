// ########################  begin DOMContentLoaded ########################
document.addEventListener('DOMContentLoaded', () => {
  // wait till page loads before setting up javascript elements

  // enable display post review button when text is entered
  txt = document.querySelector('#txt_add_post');
  btn = document.querySelector('#btn_add_post');
  txt.onkeyup = () => {
      if (txt.value.length > 1)
          btn.disabled = false;
      else
          btn.disabled = true;
  } // end onkeyup

  btn.onclick = () => {
    add_post();
  }

  load_posts(ride_id)

});
// ########################  end DOMContentLoaded ########################

function add_post() {
    const add_comment = new XMLHttpRequest();

    add_comment.open('POST', '/add_comment');
    add_comment.setRequestHeader("X-CSRFToken", CSRF_TOKEN);

    t = document.getElementById('txt_add_post');
    text = t.value

    //when request is completed
    add_comment.onload = () => {
      //extract JSON data from request
      const response = JSON.parse(add_comment.responseText);


      if (response.success == true) {

        console.log(response.success);
        // clear form
        t.value="";

        // clear reviews and then re-get reviews
        load_posts(ride_id);
      }
    }; // end onload

    // Add route id to request sent to server
    const data = new FormData();
    data.append('text', text);
    data.append('ride_id', ride_id);

    // Send request
    add_comment.send(data);
    return false; // avoid sending the form and creating an HTTP POST request
} // end add_comment()


// load posts for channel name sent as parameter
function load_posts(ride_id) {

    // initialize new request
    const get_ride_comments = new XMLHttpRequest();

    get_ride_comments.open('POST', '/get_ride_comments');
    get_ride_comments.setRequestHeader("X-CSRFToken", CSRF_TOKEN);

    //when request is completed
    get_ride_comments.onload = () => {
      //extract JSON data from request
      const response = JSON.parse(get_ride_comments.responseText);

        //clear any posts that are already on the screen
        listing = document.querySelector('#post_listing');
        while (listing.firstChild) {
          listing.removeChild(listing.firstChild);
        }

        //add comments
        for (post in response.comments) {
            add_post_to_window(response.comments[post], true);
        } // end for loop

    }; // end onload

    // Add route id to request sent to server
    const data = new FormData();
    data.append('ride_id', ride_id);

    // Send request
    get_ride_comments.send(data);
    return false; // avoid sending the form and creating an HTTP POST request

} // end load_posts()


// append a new post to the current post_listing window
function add_post_to_window(post, full_loading=false) {

  const post_listing = document.querySelector('#post_listing');

  const post_div = document.createElement('div');

  if (post.user_id === user_id) {
    // if post is from owner, put on the right side
    post_div.className = "col-8 offset-4  rounded mb-2 py-1 self_chatbox";
  } else {
    // put on left side
    post_div.className = "col-8           rounded mb-2 py-1 other_chatbox";
  } // end if-else

  //post text for display
  post_time = disp_time(post.date, true);
  post_div.innerHTML = `${post.user} (${post_time}): ${post.text}`;

  //add the newly created posting to the chat listing
  post_listing.appendChild(post_div);
  post_listing.scrollTop = post_listing.scrollHeight


} // end add_post_to_window()

// convert epoch time to human readbale time for display
function disp_time(epoch_time, short=false) {
    t = new Date(epoch_time);
    y = t.getFullYear().toString().slice(-2);
    m = t.getMonth()+1;
    d = t.getDate();
    h = t.getHours();
    mm = ("0" + (t.getMinutes())).slice(-2);

    if (short) {
      return `${m}/${d}/${y} ${h}:${mm}`; //short form
    } else {
      return `${m}/${d}/${y} ${h}:${mm}`; //long form
  }
}
