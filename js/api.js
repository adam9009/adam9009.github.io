var base_url = "https://api.football-data.org/v2/";

function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);

        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : " + error);
}

function getMatch() {

    if ('caches' in window) {
        caches.match(base_url + "competitions/PL/matches")
            .then(function (response) {
                if (response) {
                    response.json()
                        .then(function (data) {
                            var match = "";
                            data.matches.forEach(function (competition) {
                                match += `
                                    <div class="row">
                                        <a href="./match.html?id=${competition.id}">
                                            <div class="waves-effect waves-block waves-light center">
                                                <p>${competition.stage}</p>
                                                <p>${competition.homeTeam.name} (${competition.score.fullTime.homeTeam}) VS (${competition.score.fullTime.awayTeam}) ${competition.awayTeam.name}</p>
                                            </div>
                                        </a>
                                        <hr>
                                    </div>
                                `;
                            });
                            document.getElementById("match").innerHTML = match;
                        }).catch(error);
                }
            })
    } else {
        event.respondWith(
            caches.match(event.request, {ignoreSearch: true})
                .then(function (response) {
                    return response || fetch(event.request);
                })
        )
    }

    fetch(base_url + "competitions/PL/matches", {
        headers: {
            'X-Auth-Token': "5feb29e9319245fe95efb85f8b7be3b9"
        }
    })
        .then(status)
        .then(json)
        .then(function (data) {
            var match = "";
            data.matches.forEach(function (competition) {
                match += `
                    <div class="row">
                        <a href="./match.html?id=${competition.id}">
                            <div class="waves-effect waves-block waves-light center">
                                <p>${competition.stage}</p>
                                <p>${competition.homeTeam.name} (${competition.score.fullTime.homeTeam}) VS (${competition.score.fullTime.awayTeam}) ${competition.awayTeam.name}</p>
                            </div>
                        </a>
                        <hr>
                    </div>
                `;
            });
            document.getElementById("match").innerHTML = match;
        })
        .catch(error);
}

function getMatchId() {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    fetch(base_url + "matches/" + idParam, {
        headers: {
            'X-Auth-Token': "5feb29e9319245fe95efb85f8b7be3b9"
        }
    })
        .then(status)
        .then(json)
        .then(function (data) {

            var matchHTML = `    
                <ul class="collection with-header">
                  <li class="collection-item">
                    <div>
                        ${data.match.homeTeam.name}
                        <a href="./team.html?id=${data.match.homeTeam.id}" class="secondary-content">
                            <i class="material-icons">Go to team</i>
                        </a>
                        </div>
                  </li>
                </ul>
                <ul class="collection with-header">
                  <li class="collection-item">
                    <div>
                        ${data.match.awayTeam.name}
                        <a href="./team.html?id=${data.match.awayTeam.id}" class="secondary-content">
                            <i class="material-icons">Go to team</i>
                        </a>
                        </div>
                  </li>
                </ul>
            `;
            document.getElementById("body-content").innerHTML = matchHTML;
        });
}

function getTeamById() {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    fetch(base_url + "teams/" + idParam, {
        headers: {
            'X-Auth-Token': "5feb29e9319245fe95efb85f8b7be3b9"
        }
    })
        .then(status)
        .then(json)
        .then(function (data) {

            var i, players = "";
            for (i in data.squad) {
                players += data.squad[i].name + "<br>";
            }

            var team = `
                <div class="row">
                    <div class="col s12 m6">
                      <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                          <span class="card-title">${data.name}</span>
                          <p>Short name : ${data.shortName}</p>
                          <p>Founded : ${data.founded}</p>
                          <p>Address : ${data.address}</p>
                          <p>Club colors : ${data.clubColors}</p>
                          <p>
                            Players : 
                            <div class="collection">
                                <a href="#!" class="collection-item">${players}</a>
                            </div>
                          </p>
                        </div>
                        <div class="card-action">
                          <div class="s6">
                            <a href="${data.website}">Website</a> ${data.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            `;
            document.getElementById("body-content").innerHTML = team;
        });
}