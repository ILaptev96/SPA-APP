loading()



window.onload = function () {

    let aActors;
    let fnRender = function (Actors) {
        let html = `
        <table class="table table-dark table-striped table-hover custom-table shadow">
            <thead>
                <tr>
                    <th scope="col">Имя персонажа</th>
                    <th scope="col">Пол</th>
                    <th scope="col">Год рождения</th>
                    <th scope="col">Рост</th>
                    <th scope="col">Вес</th>
                    <th scope="col">Домашняя планета</th>
                </tr>
            </thead>
            <tbody>
            ${Actors.map(oActor => oActor.renderTableRow()).join('')}
            </tbody>
        </table>
        `
        document.querySelector('#app').innerHTML = html

    }
    $.ajax({
        url: "https://swapi.dev/api/people/",
        success: (Response) => {
            let aActorsData = Response.results
            aActors = aActorsData.map((aActorsData, index) => {
                return new Actor(aActorsData, index)
            })
            fnRender(aActors)
            loading()
            // console.log(aActors)
        }
    });

    fnHandlePress = function (event) {
        let oTableRow = event.currentTarget;
        let sId = oTableRow.getAttribute("id");
        let oSelectedActor = aActors.find(function(oActor) {
          return oActor.index == sId;
        });
        oSelectedActor.renderDetail();
      }

}

function loading() {
    document.getElementById('loading').classList.toggle('d-none');
}



/*let oActor = new Actor(   {
    "name": "Luke Skywalker",
    "height": "172",
    "mass": "77",
    "hair_color": "blond",
    "skin_color": "fair",
    "eye_color": "blue",
    "birth_year": "19BBY",
    "gender": "male",
    "homeworld": "https://swapi.dev/api/planets/1/",
    "films": [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/6/"
    ],
    "species": [],
    "vehicles": [
        "https://swapi.dev/api/vehicles/14/",
        "https://swapi.dev/api/vehicles/30/"
    ],
    "starships": [
        "https://swapi.dev/api/starships/12/",
        "https://swapi.dev/api/starships/22/"
    ],
    "created": "2014-12-09T13:50:51.644000Z",
    "edited": "2014-12-20T21:17:56.891000Z",
    "url": "https://swapi.dev/api/people/1/"
}) */

//oActor.getHomeworld();
//oActor.getFilms();
//oActor.getStarships();
