loading()
let oRouter = new Router()
let oModel = new Model()
let sHash = window.location.hash || "#actors"


let oActorsAjax = $.ajax({
    url: "https://swapi.dev/api/people/",
    success: (Response) => {
        let aActorsData = Response.results
        oModel.actors = aActorsData.map((aActorsData) => {
           // return new Actor(aActorsData, index)
            return new Actor(aActorsData, parseInt(aActorsData.url.match(/\d+/)[0]))
        })
    }
});
let oStarshipsAjax = $.ajax({
    url: "https://swapi.dev/api/starships/",
    success: function (oResponse) {
        let aStarshipsData = oResponse.results;
        oModel.starships = aStarshipsData.map((oStarshipData) => {
            return new Starship(oStarshipData, parseInt(oStarshipData.url.match(/\d+/)[0]))
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
                    return "#actorDetail"
                case "#starships":
                    return "#starshipDetail"
                case "#starshipDetail":
                    return "#actorDetail"
                case "#actorDetail":
                    return "#starshipDetail"
            }
        }
/*         let sHash = window.location.hash  
        let sRoute = fnDefinaRoute(sHash)
        oRouter.navigateTo(sRoute, true, sId) */
        
    
        let sHash = window.location.hash

        let sRoute = fnDefinaRoute(sHash)
        oRouter.navigateTo(sRoute, true, sId)


    }

}

function loading() {
    document.getElementById('loading').classList.toggle('d-none');
}

 