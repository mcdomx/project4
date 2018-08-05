// ########################  begin DOMContentLoaded ########################
document.addEventListener('DOMContentLoaded', () => {
  // wait till page loads before setting up javascript elements
  // document.getElementById('btn_create_ride').onclick = create_ride;

  load_reviews()

});
// ########################  end DOMContentLoaded ########################


// load posts for channel name sent as parameter
function load_reviews() {

    // initialize new request
    const get_reviews = new XMLHttpRequest();

    get_reviews.open('POST', '/get_reviews');
    get_reviews.setRequestHeader("X-CSRFToken", CSRF_TOKEN);

    //when request is completed
    get_reviews.onload = () => {
      //extract JSON data from request
      const response = JSON.parse(get_reviews.responseText);

      for (review in response.reviews){
        console.log(response.reviews[review])
        add_review_to_listing(response.reviews[review])
      }

    }; // end onload

    // Add route id to request sent to server
    const data = new FormData();
    data.append('route_id', route_id);

    // Send request
    get_reviews.send(data);
    return false; // avoid sending the form and creating an HTTP POST request

} // end load_posts()


// append a new post to the current post_listing window
function add_review_to_listing(review) {

  const reviews_listing = document.querySelector('#reviews_listing');
  const review_div = document.createElement('div');

  // CARD
  const card = document.createElement('div');
  card.className = "card";
  card.style["width"] = "100%";

  // CARD BODY
  const card_body = document.createElement('div');
  card_body.className = "card-body";

  // CARD TITLE LINES
  const card_head1 = document.createElement('div');
  card_head1.className = "card-subtitle mb-2 text-muted";
  card_head1.innerHTML = `${review.user} (${review.date})`
  const card_head2 = document.createElement('div');
  card_head1.className = "card-subtitle mb-2 text-muted";
  card_head2.innerHTML = `Rating: ${review.rating}`
  //TODO - add rating text

  // CARD TEXT
  const card_text = document.createElement('div');
  var card_text_attr = document.createAttribute("class");
  card_text.className = "card-text";


  //BUILD CARD
  card_body.appendChild(card_head1);
  card_body.appendChild(card_head2);
  card_body.appendChild(card_text);

  card_text.appendChild(p_owner);
  card_text.appendChild(p_lastpost);
  card_body.appendChild(card_text);
  anchor.appendChild(card_head);
  anchor.appendChild(card_body);
  card.appendChild(anchor);
  row.appendChild(card);

  //add the new row to the top of the channel listing
  chat_window = document.querySelector('#channel_listing');
  chat_window.insertBefore(row, chat_window.firstChild);

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
      return `${m}/${d} ${h}:${mm}`; //short form
    } else {
      return `${m}/${d}/${y} ${h}:${mm}`; //long form
  }
}
