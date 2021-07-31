loading()

let oRouter = new Router()
let oModel = new Model();
let sHash = window.location.hash
if (!sHash)
    sHash = '#actors'

let oActorsAjax = $.ajax({
    url: "https://swapi.dev/api/people/",
    success: (Response) => {
        let aActorsData = Response.results
        oModel.actors = aActorsData.map((aActorsData, index) => {
            return new Actor(aActorsData, index)
        })
        //fnRender(aActors)
        // loading()
        // console.log(aActors)
    }
});
let oStarshipsAjax = $.ajax({
    url: "https://swapi.dev/api/starships/",
    success: function (oResponse) {
        let aStarshipsData = oResponse.results;
        oModel.starships = aStarshipsData.map((oStarshipData, index) => {
            return new Starship(oStarshipData, index);
        });
    }
});

Promise.all([oActorsAjax, oStarshipsAjax]).then(() => {
    oRouter.init(sHash)
    loading()
})

window.onload = function () {
    fnHandlePress = function (event) {
        let oTableRow = event.currentTarget;
        let sId = oTableRow.getAttribute("id");
        let fnDefinaRoute = function (sCurrentHash) {
            switch (sCurrentHash) {
                case "#actors":
                    return "#actorDetails"
                case "#starships":
                    return "#starshipDetails"

            }
        }
        let sHash = window.location.hash
        let sRoute = fnDefinaRoute(sHash)
        oRouter.navigateTo(sRoute, true, sId)
        /* let oSelectedActor = oModel.actors.find(function (oActor) {
             return oActor.index == sId;
         });
         oSelectedActor.renderDetail();*/
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
