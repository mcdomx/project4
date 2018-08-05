// ########################  begin DOMContentLoaded ########################
document.addEventListener('DOMContentLoaded', () => {
  // wait till page loads before setting up javascript elements
  // document.getElementById('btn_create_ride').onclick = create_ride;
  load_posts()

});
// ########################  end DOMContentLoaded ########################


// load posts for channel name sent as parameter
function load_posts(channel) {

    // initialize new request
    const get_route_comments = new XMLHttpRequest();

    get_route_comments.open('POST', '/get_route_comments');

    //when request is completed
    get_route_comments.onload = () => {
      //extract JSON data from request
      const response = JSON.parse(get_route_comments.responseText);

        for (post in response) {
          add_post_to_window(response[post], true);
        } // end for loop

    }; // end onload

    // Add route id to request sent to server
    const data = new FormData();
    data.append('route_id', route.route_id);

    // Send request
    get_route_comments.send(route_id);
    return false; // avoid sending the form and creating an HTTP POST request

} // end load_posts()


// append a new post to the current post_listing window
function add_post_to_window(post, full_loading=false) {

  const post_div = document.createElement('div');
  const post_listing = document.querySelector('#post_listing');


  if (post.user === localStorage.getItem('display_name')) {
    // if post is from owner, put on the right side
    post_div.className = "col-8 offset-4  rounded mb-2 py-1 self_chatbox";
  } else {
    // put on left side
    post_div.className = "col-8           rounded mb-2 py-1 other_chatbox";
  } // end if-else

  //post text for display
  post_time = disp_time(post.time, true);
  post_div.innerHTML = `${post.user} (${post_time}): ${post.txt}`;

  // add the animation
  // find the previous newpost id and remove that id from the element
  prev_post = document.getElementById('newpost');
  if (prev_post !== null) {
    prev_post.removeAttribute("id");
  }

  // now, add newpost id to the newly posted item
  post_div.setAttribute("id", `newpost`);

  //add the newly created posting to the chat listing
  chat_listing.appendChild(post_div);
  chat_listing.scrollTop = chat_listing.scrollHeight

  // run the animation, but only when not loading the full list
  if (full_loading) {
    post_div.style.animationDuration = "0s";
  }
  post_div.style.animationPlayState = 'running';

  //update header elements
  document.querySelector('#header_posts').innerHTML = post.num_posts;
  document.querySelector('#header_last').innerHTML = disp_time(post.time);

} // end add_post_to_window()
