import React from "react";
import banners from "../banner.jpg";

function UserProfilePage() {
  const banner = {
    backgroundImage: `url(${banners})`,
  };

  return (
    <div className="container my-fluid ">
      <div className="columns is-multiline  is-centered">
        <div
          className="column is-12 p-0 m-0 profile-banner has-background-primary"
          style={banner}
        ></div>
        <div className="column is-10 box is-flex is-flex-direction-column is-flex-gap-lg">
          <h3 className="is-title is-size-4 has-text-weight-bold has-text-centered my-2">
            Profile
          </h3>
          <div className="is-flex is-justify-content-space-between is-align-items-center ">
            <div className="is-flex is-align-items-center is-flex-gap-md">
              <figure class="image is-128x128">
                <img
                  class="is-rounded"
                  src="https://bulma.io/images/placeholders/128x128.png"
                  alt=""
                />
              </figure>
              <div className="is-flex is-flex-direction-column is-flex-gap-sm">
                <h3 className="is-title is-size-5 has-text-weight-bold">
                  User Name
                </h3>
                <h3 className="is-title is-size-6 has-text-weight-semibold">
                  @test123
                </h3>
              </div>
            </div>
            {/* END PROFILE LEFT */}
            <div className="button-action is-flex is-flex-direction-column is-flex-gap-sm">
            <button class="button is-link is-outlined is-title is-size-6 is-small">Follow</button>
            <button class="button is-link is-outlined is-title is-size-6 is-small">Send Message</button>
            </div>
          </div>
          {/* END PROFILE */}
 <div className="is-flex is-flex-direction-column is-flex-gap-sm is-align-items-start my-4">
          <nav class="level is-mobile">
  <div class="level-item has-text-centered">
    <div>
      <p class="heading">Post</p>
      <p class="title">3,456</p>
    </div>
  </div>
  <div class="level-item has-text-centered">
    <div>
      <p class="heading">Following</p>
      <p class="title">123</p>
    </div>
  </div>
  <div class="level-item has-text-centered">
    <div>
      <p class="heading">Followers</p>
      <p class="title">456K</p>
    </div>
  </div>
  <div class="level-item has-text-centered">
  </div>
</nav>
          </div>
          {/* END PROFILE */}
        </div>
        {/* END COLUMN */}
        <div className="column is-10 ">
          <div class="tabs is-centered">
            <ul>
              <li class="is-active">
                <a>
                  <span class="icon is-small">
                    <i class="fa fa-picture-o" aria-hidden="true"></i>
                  </span>
                  <span>Pictures</span>
                </a>
              </li>
              <li>
                <a>
                  <span class="icon is-small">
                    <i class="fa fa-video-camera" aria-hidden="true"></i>
                  </span>
                  <span>Videos</span>
                </a>
              </li>
              <li>
                <a>
                  <span class="icon is-small">
                    <i class="fa fa-file-text" aria-hidden="true"></i>
                  </span>
                  <span>Documents</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="columns is-multiline">
            <div className="column">
              <div class="card post-card">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img
                      src="https://bulma.io/images/placeholders/1280x960.png"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img
                          src="https://bulma.io/images/placeholders/96x96.png"
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <div class="media-content">
                      <p class="title is-4">John Smith</p>
                      <p class="subtitle is-6">@johnsmith</p>
                    </div>
                  </div>

                  <div class="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                    <a href="#">#css</a> <a href="#">#responsive</a>
                    <br />
                    <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div class="card post-card">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img
                      src="https://bulma.io/images/placeholders/1280x960.png"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img
                          src="https://bulma.io/images/placeholders/96x96.png"
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <div class="media-content">
                      <p class="title is-4">John Smith</p>
                      <p class="subtitle is-6">@johnsmith</p>
                    </div>
                  </div>

                  <div class="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                    <a href="#">#css</a> <a href="#">#responsive</a>
                    <br />
                    <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* END COLUMN CONTENT*/}
      </div>
      {/* END COLUMNS */}
    </div>
  );
}

export default  UserProfilePage;
