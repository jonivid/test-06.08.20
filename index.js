async function getAllCountries() {
    try {

        const response = await getAPI({ url: "https://restcountries.eu/rest/v2/all" })
        console.log(_getNumberOfCountries(response));
        console.log(_getNumberOfCountries(response));
        console.log(_getSumOfCountriesPopulation(response));
        console.log(_getAvgOfCountriesPopulation(response));
        drawStats(response)

    }
    catch (err) {
        console.log(err)
        alert(`message: ${err.statusText} , status: ${err.status}`)
    }


}

async function getCountryByName() {

    const name = $("#searchValue").val()


    try {
        if (!name) {
            alert("search value is empty")
            return
        }
        const response = await getAPI({ url: `https://restcountries.eu/rest/v2/name/${name}` })
        console.log(_getNumberOfCountries(response));
        console.log(_getSumOfCountriesPopulation(response));
        console.log(_getAvgOfCountriesPopulation(response));
        drawStats(response)


    }
    catch (err) {
        console.log(err)
        alert(`message: ${err.statusText} , status: ${err.status}`)
    }

}

$("#allCountriesBtn").on("click", getAllCountries)
$("#searchCountryByName").on("click", getCountryByName)


function _getNumberOfCountries(arrayOfCountries) {
    const NumberOfCountries = arrayOfCountries.length
    return NumberOfCountries
}

function _getSumOfCountriesPopulation(arrayOfCountries) {
    let SumOfCountryPopulation = arrayOfCountries.reduce((acc, item) => {
        acc += item.population
        return acc;
    }, 0);
    return SumOfCountryPopulation
};

function _getAvgOfCountriesPopulation(arrayOfCountries) {

    const avg = _getSumOfCountriesPopulation(arrayOfCountries) / _getNumberOfCountries(arrayOfCountries)

    return avg
}

function _showCountryNameAndPopulation(arrayOfCountries) {
    let CountryNameAndPopulation = arrayOfCountries.reduce((acc, item) => {
        acc[item.name.toUpperCase()] = {
            population: item.population
        };
        return acc;
    }, {});
    return CountryNameAndPopulation

}


// function _counterByRegions(arrayOfCountries) {
//     const counterByRegions = arrayOfCountries.reduce((countedRegions, country) => {
//         const { region } = country.region;
//         const counter = countedRegions[region] | 0;
//         return { ...countedRegions, [region]: counter + 1 };
//     }, {});
//     return counterByRegions

// }

function drawStats(arrayOfCountries) {
    $("#allCountriesDiv").empty()
    const divA = $("<div></div>").text(`Total countries result ${_getNumberOfCountries(arrayOfCountries)}`)
    const divB = $("<div></div>").text(`total countries population ${_getSumOfCountriesPopulation(arrayOfCountries)}`)
    const divC = $("<div></div>").text(`avg population ${_getAvgOfCountriesPopulation(arrayOfCountries)}`)
    const divD = $("<div></div>").text(JSON.stringify(_showCountryNameAndPopulation(arrayOfCountries)))
    $("#allCountriesDiv").append(divA, divB, divC, divD)

    // const thead = $("<thead></thead>")
    // const thName = $("<th></th>").text("Name")
    // const thPopulation = $("<th></th>").text("Population")
    // thead.append(thName, thPopulation)
    // const tbody = $("<tbody></tbody>")
    // const countryObj = _showCountryNameAndPopulation(arrayOfCountries)
    // const trs = countryObj.reduce((country , population))
    // }




}
