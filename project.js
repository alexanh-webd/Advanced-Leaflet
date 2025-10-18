let migrationDataSet = null;
let migrationGoingDataSet = null;
let populationDataSet = null;
let totalPopulationByMunicipalityInMigration = null;

// Fetch Migration_query.json
const fetchDataURL = async (url, body) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
    })
    //console.log(response)
    if (!response.ok) {
        throw new Error("Failed to fetch StatFin data: " + response.status);
    }
    return await response.json();
};


// Fetch the URL with the help of Migration_query.json
const initializeData = async () => {
    const migrationData = await (await fetch("query/migration_query.json")).json();
    const migrationGoingData = await (await fetch("query/migration_query_Going.json")).json();
    const populationData = await (await fetch("query/population_query.json")).json();
    //console.log(migrationData);
    const dataSet = await fetchDataURL("https://pxdata.stat.fi/PxWeb/api/v1/fi/StatFin/muutl/statfin_muutl_pxt_11a2.px", migrationData);
    const goingDataSet = await fetchDataURL("https://pxdata.stat.fi/PxWeb/api/v1/fi/StatFin/muutl/statfin_muutl_pxt_11a2.px", migrationGoingData);
    const populationDataFetch = await fetchDataURL("https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px", populationData);
    migrationDataSet = dataSet;
    migrationGoingDataSet = goingDataSet;
    populationDataSet = populationDataFetch;
    //console.log(populationDataSet)
    //console.log(dataSet)
    //console.log(goingDataSet)
    //migrationDataSet2023 = dataSet2023;

}
// Fetch geoJson URL
const fetchData = async () => {
    // Fetch the data from geoJson and add "data" to map
    const url = "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326";
    const res = await fetch(url);
    const data = await res.json();
    //console.log(data);
    //console.log(migrationDataSet);
    const index = migrationDataSet.dimension.Alue.category.index;
    //const goingIndex = migrationGoingDataSet
    const label = migrationDataSet.dimension.Alue.category.label;
    const migrationValues = migrationDataSet.value;
    const goingValue = migrationGoingDataSet.value;
    const indexArray = Object.values(index);
    const labelArray = Object.values(label);
    const migrationValueArr = Object.values(migrationValues);
    const goingValueArr = Object.values(goingValue);

    let migrationDataObject = {};
    let migrationDataComingObject = {};
    //let dataIn2023 = {};
    let comingData = [];
    let goingData = [];
    let comingIndex = 0;
    let goingIndex = 0;
    indexArray.forEach((key, i) => {
        while (comingIndex < i*25 + 25) {
            comingData.push(migrationValueArr[comingIndex]);
            comingIndex++
        }
        while (goingIndex < i*25 + 25) {
            goingData.push(goingValueArr[goingIndex]);
            goingIndex++
        }
        //console.log(comingData)
        //console.log(goingData)
        migrationDataObject[key] = {
            name: labelArray[i],
            Coming: comingData,
            Going: goingData
        }
        migrationDataComingObject[key] = {
            name: labelArray[i],
            Coming: comingData,
        }
        comingData = []
        goingData = []
    })
    const combinedArr = Object.values(migrationDataObject);
    const comingArr = Object.values(migrationDataComingObject);
    //console.log(combinedArr);


    //Now, we will take create a population object which will contains the data of each municipality (live births, deaths, population)
    let populationDataObject = {};
    let population_data = [];
    const population_index = populationDataSet.dimension.Alue.category.index;
    const population_label = populationDataSet.dimension.Alue.category.label;
    const populaiton_value = populationDataSet.value;
    const population_index_Arr = Object.values(population_index);
    const population_label_Arr = Object.values(population_label);
    const population_value_Arr = Object.values(populaiton_value);
    //console.log(population_value_Arr);
    const indexList = [];
    for (let i = 0; i < 25; i++) {
        indexList.push(i*927);
    }
    //console.log(indexList)
    population_index_Arr.forEach((key, h) => {
        for (let i = indexList[0]; i < indexList[0] + 3; i++) {
            population_data.push(population_value_Arr[i]);
        }
        indexList[0] += 3;

        for (let j = indexList[1]; j < indexList[1] + 3; j++) {
            population_data.push(population_value_Arr[j]);
        }
        indexList[1] += 3;
        
        for (let j1 = indexList[2]; j1 < indexList[2] + 3; j1++) {
            population_data.push(population_value_Arr[j1]);
        }
        indexList[2] += 3;

        for (let j2 = indexList[3]; j2 < indexList[3] + 3; j2++) {
            population_data.push(population_value_Arr[j2]);
        }
        indexList[3] += 3;
        for (let j3 = indexList[4]; j3 < indexList[4] + 3; j3++) {
            population_data.push(population_value_Arr[j3]);
        }
        indexList[4] += 3;

        for (let j4 = indexList[5]; j4 < indexList[5] + 3; j4++) {
            population_data.push(population_value_Arr[j4]);
        }
        indexList[5] += 3;

        for (let j5 = indexList[6]; j5 < indexList[6] + 3; j5++) {
            population_data.push(population_value_Arr[j5]);
        }
        indexList[6] += 3;

        for (let j6 = indexList[7]; j6 < indexList[7] + 3; j6++) {
            population_data.push(population_value_Arr[j6]);
        }
        indexList[7] += 3;

        for (let j7 = indexList[8]; j7 < indexList[8]+ 3; j7++) {
            population_data.push(population_value_Arr[j7]);
        }
        indexList[8] += 3;
        
        for (let j8 = indexList[9]; j8 < indexList[9] + 3; j8++) {
            population_data.push(population_value_Arr[j8]);
        }
        indexList[9] += 3;

        for (let j9 = indexList[10]; j9 < indexList[10] + 3; j9++) {
            population_data.push(population_value_Arr[j9]);
        }
        indexList[10] += 3;
        for (let j10 = indexList[11]; j10 < indexList[11] + 3; j10++) {
            population_data.push(population_value_Arr[j10]);
        }
        indexList[11] += 3;
        for (let j11 = indexList[12]; j11 < indexList[12] + 3; j11++) {
            population_data.push(population_value_Arr[j11]);
        }
        indexList[12] += 3;
        for (let j12 = indexList[13]; j12 < indexList[13] + 3; j12++) {
            population_data.push(population_value_Arr[j12]);
        }
        indexList[13] += 3;
        for (let j13 = indexList[14]; j13 < indexList[14] + 3; j13++) {
            population_data.push(population_value_Arr[j13]);
        }
        indexList[14] += 3;
        for (let j14 = indexList[15]; j14 < indexList[15] + 3; j14++) {
            population_data.push(population_value_Arr[j14]);
        }
        indexList[15] += 3;
        for (let j15 = indexList[16]; j15 < indexList[16] + 3; j15++) {
            population_data.push(population_value_Arr[j15]);
        }
        indexList[16] += 3;
        for (let j16 = indexList[17]; j16 < indexList[17] + 3; j16++) {
            population_data.push(population_value_Arr[j16]);
        }
        indexList[17] += 3;
        for (let j17 = indexList[18]; j17 < indexList[18] + 3; j17++) {
            population_data.push(population_value_Arr[j17]);
        }
        indexList[18] += 3;
        for (let j18 = indexList[19]; j18 < indexList[19] + 3; j18++) {
            population_data.push(population_value_Arr[j18]);
        }
        indexList[19] += 3;
        for (let j19 = indexList[20]; j19 < indexList[20] + 3; j19++) {
            population_data.push(population_value_Arr[j19]);
        }
        indexList[20] += 3;
        for (let j20 = indexList[21]; j20 < indexList[21] + 3; j20++) {
            population_data.push(population_value_Arr[j20]);
        }
        indexList[21] += 3;
        for (let j21 = indexList[22]; j21 < indexList[22] + 3; j21++) {
            population_data.push(population_value_Arr[j21]);
        }
        indexList[22] += 3;
        for (let j22 = indexList[23]; j22 < indexList[23] + 3; j22++) {
            population_data.push(population_value_Arr[j22]);
        }
        indexList[23] += 3;
        for (let j23 = indexList[24]; j23 < indexList[24] + 3; j23++) {
            population_data.push(population_value_Arr[j23]);
        }
        indexList[24] += 3;


        populationDataObject[key] = {
            name: population_label_Arr[h],
            dataPopulation: population_data,
        }
        population_data = [];
    })
    console.log(populationDataObject);
    const populationDataObjectToArr = Object.values(populationDataObject);

    totalPopulationByMunicipalityInMigration = populationDataObjectToArr;
    initMap(data, combinedArr, comingArr, populationDataObjectToArr);
};

// Initialize map and add geoJSON to map
const initMap = (data, combined, comingArr, populationDataObjectToArr) => {
    let map = L.map('map', {
        minZoom: -3
    })

    let geoJson = L.geoJson(data, {
        onEachFeature: (feature, layer) => getFeature(feature, layer, combined),
        style: (feature, layer) => getStyle(feature, layer, combined)
    }).addTo(map)

    let comingJson = L.geoJson(data, {
        onEachFeature: (feature, layer) => getFeatureForComingPeople(feature, layer, comingArr),
        style: (feature, layer) => getStyleForComing(feature, layer, comingArr)
    }).addTo(map)

    let populationJson = L.geoJson(data, {
        onEachFeature: (feature, layer) => getFeatureForPopulation(feature, layer, populationDataObjectToArr)
    }).addTo(map)

    // add open street map to map
    let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 20,
        attribution: "© OpenStreetMap"
    }).addTo(map);

    let baseMaps = {
        "OpenStreetMap": osm
    }

    let overlayMaps = {
        "Migration (Coming + leaving)": geoJson,
        "Coming": comingJson,
        "Population": populationJson
    }

    let layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);


    map.fitBounds(geoJson.getBounds());
    map.fitBounds(comingJson.getBounds());
    map.fitBounds(populationJson.getBounds());

}
const getFeature = (feature, layer, combined) => {
    if (!feature.properties || !feature.properties.name) return;
    const name = feature.properties.name;
    const migrationChart = document.createElement("div");
    migrationChart.id = "chart-" + name.replace(/\s + /g, "-");
    const migrationNetChart = document.createElement("div");
    migrationNetChart.id = "migrationNetchart-" + name.replace(/\s + /g, "-");

    const operationChart = document.createElement("div");
    operationChart.id = "operationChart-" + name.replace(/\s + /g, "-");

    let going = 0;
    let coming = 0;
    combined.forEach((element) => {
        if (name === element.name) {
            //going += element.Going;
            for (let eComing = 0; eComing < 25; eComing++) {
                coming += element.Coming[eComing];
                going += element.Going[eComing];
            }
            //console.log(coming)
            //console.log(element.Coming[0]);
            //console.log(element.Going);
        }
    })
    
    //console.log(feature)
    // Tooltip always visible
    layer.bindTooltip(feature.properties.name, {
        permanent: false,
        direction: "auto"
    });
    // This is the option for the user to choose to change the data they want to see
    const selectionInMigration = document.createElement("select");
    selectionInMigration.className = "form-select form-select-lg mb-3 customSelectInMigration";
    selectionInMigration.ariaLabel = "Large select example";
    selectionInMigration.id = "chartSelector1InMigration";
    const option11 = document.createElement("option");
    const option21 = document.createElement("option");
    const option00 = document.createElement("option");
    selectionInMigration.id = "migrationSelector";
    option11.value = "default";
    option11.innerText = "Default";
    option21.value = "migrationNet";
    option21.innerText = "Net migration";
    option00.value = "Seclect_data_to_display";
    option00.innerText = "Select data to display";
    selectionInMigration.appendChild(option00);
    selectionInMigration.appendChild(option11);
    selectionInMigration.appendChild(option21);
    //firstDropDownContainer.appendChild(selectionInMigration);

    // This is the option for the user to choose the operation that they want to do with the data
    const selectionOperationInMigration = document.createElement("select");
    selectionOperationInMigration.className = "form-select form-select-lg mb-3 customSelectInMigration";
    selectionOperationInMigration.ariaLabel = "Large select example";
    selectionOperationInMigration.id = "operationInMigration"
    const operation1 = document.createElement("option");
    const operation2 = document.createElement("option");
    const operation3 = document.createElement("option");
    const operation4 = document.createElement("option");
    operation1.value = "Nothing";
    operation1.innerText = "Nothing";
    operation2.value = "percentage";
    operation2.innerText = "percentage coming over total population";
    operation3.value = "goingPercentage";
    operation3.innerText = "percentage going over total population";
    selectionOperationInMigration.appendChild(operation1);
    selectionOperationInMigration.appendChild(operation2);
    selectionOperationInMigration.appendChild(operation3);
    

    // Create download buutton for migration
    const dowloadBtnInMigration = document.createElement("button");
    dowloadBtnInMigration.type = "button";
    dowloadBtnInMigration.className = "btn btn-outline-secondary";
    dowloadBtnInMigration.id = "downloadBtnInMigration";
    dowloadBtnInMigration.innerText = "Click to download";
    // This is the pop up when user click to the municipality which is from GeoJson
    layer.on("popupopen", () => {
        let comingData = null;
        let goingDataLayer = null;
        combined.forEach((municipality) => {
            if (name === municipality.name) {
                comingData = municipality.Coming;
                goingDataLayer = municipality.Going;

            }
        })
        // Taking the data out from the object arr
        let populationDataInMigration = [];
        totalPopulationByMunicipalityInMigration.forEach((municipality) => {

            if (name === municipality.name) {
                let population_index_in_migration = 0;
                while (population_index_in_migration < 75) {
                    populationDataInMigration.push(municipality.dataPopulation.slice(population_index_in_migration, population_index_in_migration + 3));
                    population_index_in_migration += 3;
                }
            }
        })

        const populationByRegionInMigration = populationDataInMigration.map(y => y[2]);
        console.log(populationByRegionInMigration);

        let migrationNetData = [];
        for (let i = 0; i < 25; i++) {
            migrationNetData.push(comingData[i] - goingDataLayer[i])
        }

        // Calculate the percentage
        let percentageRes = [];
        for (let i = 0; i < 25; i++) {
            if (populationByRegionInMigration[i] === 0) {
                percentageRes.push(0);
            } else {
                res = comingData[i]/populationByRegionInMigration[i]
                percentageRes.push(res*100);
            }
        }
        // Initialize data before visulization
        let goingPerRes = [];
        for (let i = 0; i < 25; i++) {
            if (populationByRegionInMigration[i] === 0) {
                goingPerRes.push(0);
            } else {
                goingPerRes.push((goingDataLayer[i]/populationByRegionInMigration[i])*100);
            }
        }
        //console.log("Coming: " + comingData)
        //console.log("test:" + percentageRes);
        //console.log(migrationNetData);
        let data = {
        labels: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010",
            "2011","2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"
        ],
        datasets: [
                {
                    name: "Amount Coming", type: "bar",
                    values: comingData
                },
                {
                    name: "Amount Going", type: "line",
                    values: goingDataLayer
                }
            ]
        }

        let chart = new frappe.Chart(migrationChart, {  // or a DOM element,
                                                // new Chart() in case of ES6 module with above usage
        title: "Migration from 2000 to 2024",
        data: data,
        type: 'axis-mixed', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
        height: 250,
        colors: ['#7cd6fd', '#743ee2']
        
        })
        let downloadedChart = null;
        let downloadedChart2 = null;
        selectionInMigration.addEventListener("change", function(e) {
            let value = e.target.value;
            console.log(value)

            if (value === "migrationNet") {
                let newMigrationDta = {
                    labels: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010",
                        "2011","2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"
                        ],
                    datasets: [
                        {
                            name: "Net migration in " + name,
                            type: "line",
                            values: migrationNetData
                        }
                    ]
                }
                let migrationNetChartDis = new frappe.Chart(migrationNetChart, {  // or a DOM element,
                                                // new Chart() in case of ES6 module with above usage
                    title: "Net migration from 2000 to 2024",
                    data: newMigrationDta,
                    type: 'axis-mixed', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
                    height: 250,
                    colors: ['#7cd6fd', '#743ee2']
                })
                downloadedChart = migrationNetChartDis;  
            } else if (value === "default") {
                migrationNetChart.innerHTML = "";
                downloadedChart = null;
                
                downloadedChart = chart
            }
        })

        

        // Selection of operation
        // Initialize data for eah case of the operation
        selectionOperationInMigration.addEventListener("change", function(e) {
            let operationValue = e.target.value;
            console.log(operationValue);

            if (operationValue === "Nothing") {
                let operationData = {
                    labels: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010",
                        "2011","2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"
                        ],
                    datasets: [
                        {
                            name: "Net migration in " + name,
                            type: "line",
                            values: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                        }
                    ]
                }

                let operationChartShow = new frappe.Chart(operationChart, {
                    title: "Net migration from 2000 to 2024",
                    data: operationData,
                    type: 'axis-mixed', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
                    height: 250,
                    colors: ['#303030', '#ff3434']
                })
                downloadedChart2 = operationChartShow;
            } else if (operationValue === "percentage") {
                operationChart.innerHTML = "";
                let comingOverTotalpop = {
                    labels: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010",
                        "2011","2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"
                        ],
                    datasets: [
                        {
                            name: "Percentage of coming over total population in " + name,
                            type: "line",
                            values: percentageRes
                        }
                    ]
                }
                let comingPercentageChart = new frappe.Chart(operationChart, {
                    title: "Percentage of coming over total population from 2000 to 2024",
                    data: comingOverTotalpop,
                    type: 'bar', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
                    height: 250,
                    colors: ['#363636', '#e23e3e']
                })
                downloadedChart2 = null;
                downloadedChart2 = comingPercentageChart;
            } else if (operationValue === "goingPercentage") {
                operationChart.innerHTML = "";
                let goingOverTotalpop = {
                    labels: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010",
                        "2011","2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"
                        ],
                    datasets: [
                        {
                            name: "Percentage of going over total population in " + name,
                            type: "line",
                            values: goingPerRes
                        }
                    ]
                }
                let goingPercentageChart = new frappe.Chart(operationChart, {
                    title: "Percentage of coming over total population from 2000 to 2024",
                    data: goingOverTotalpop,
                    type: 'bar', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
                    height: 250,
                    colors: ['#1f1f1f', '#743ee2']
                })
                downloadedChart2 = null;
                downloadedChart2 = goingPercentageChart;
            }

        })
        // Download btn for migration
        dowloadBtnInMigration.addEventListener("click", function() {
            downloadedChart.export();
            downloadedChart2.export();
        })
    
    })

    //console.log(layer)
    const popUp = document.createElement("ul");
    const nameRow = document.createElement("li");
    const positiveRow = document.createElement("li");
    const negativeRow = document.createElement("li");
    //const selectionRow = document.createElement("li");
    const chartRow = document.createElement("li");
    const operationRow = document.createElement("li");
    const firstRow = document.createElement("li");
    const operationChartRow = document.createElement("li");
    const questionRow = document.createElement("p");
    //const chartBox = document.createElement("div");
    //chartBox.id = "chart";
    nameRow.innerText = "Name: " + name;
    positiveRow.innerText = "Total coming: " + coming;
    negativeRow.innerText = "Total leaving: " + going;
    questionRow.innerText = "What operations do you want to do with the data?"
    //chartRow.innerHTML = chart;
    firstRow.appendChild(selectionInMigration)
    chartRow.appendChild(migrationChart);
    chartRow.appendChild(migrationNetChart);
    //selectionRow.appendChild(selectionInMigration);
    operationRow.appendChild(questionRow);
    operationRow.appendChild(selectionOperationInMigration);
    operationChartRow.appendChild(operationChart)
    popUp.appendChild(firstRow);
    popUp.appendChild(nameRow);
    popUp.appendChild(positiveRow);
    popUp.appendChild(negativeRow);
    popUp.appendChild(chartRow);
    popUp.appendChild(operationRow);
    popUp.appendChild(selectionOperationInMigration);
    popUp.appendChild(operationChartRow);
    popUp.appendChild(dowloadBtnInMigration)
    layer.bindPopup(
        popUp
    )
};

const getFeatureForComingPeople = (feature, layer, comingArr) => {
    if (!feature.properties || !feature.properties.name) return;
    const name = feature.properties.name;

    const comingChart = document.createElement("div");
    comingChart.id = "comingChart-" + name.replace(/\s + /g, "-");

    //download btn
    const downloadBtnInComing = document.createElement("button");
    downloadBtnInComing.type = "button";
    downloadBtnInComing.className = "btn btn-outline-secondary customBtn";
    downloadBtnInComing.id = "downloadBtnInComing";
    downloadBtnInComing.innerText = "Click to download";
    
    //let going = 0;
    let coming = 0;
    comingArr.forEach((element) => {
        if (name === element.name) {
            //going += element.Going;
            for (let eComing = 0; eComing < 25; eComing++) {
                coming += element.Coming[eComing];
                //going += element.Going[eComing];
            }
            //console.log(coming)
            //console.log(element.Coming[0]);
            //console.log(element.Going);
        }
    })
    
    //console.log(feature)
    // Tooltip always visible
    layer.bindTooltip(feature.properties.name, {
        permanent: false,
        direction: "auto"
    });

    // AI Help with the pop up
    
    layer.on("popupopen", () => {
        let comingData = null;
        //let goingDataLayer = null
        comingArr.forEach((municipality) => {
            if (name === municipality.name) {
                comingData = municipality.Coming;
                //goingDataLayer = municipality.Going;

            }
        })

        let populationDataInComing = [];
        totalPopulationByMunicipalityInMigration.forEach((municipality) => {
            if (name === municipality.name) {
                let population_index_in_coming = 0;
                while (population_index_in_coming < 75) {
                    populationDataInComing.push(municipality.dataPopulation.slice(population_index_in_coming, population_index_in_coming + 3));
                    population_index_in_coming += 3;
                }
            }
        })

        const populationByRegionInComing = populationDataInComing.map(y => y[2]);
        //console.log(populationByRegionInComing);

        const data = {
        labels: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010",
            "2011","2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"
        ],
        datasets: [
            {
                name: "Amount Coming in " + name,
                values: comingData
            },
            {
                name: "Total population in " + name,
                values: populationByRegionInComing
            }
        ]
    }

        const chart = new frappe.Chart(comingChart, {  // or a DOM element,
                                                // new Chart() in case of ES6 module with above usage
        title: "Migration from 2000 to 2024",
        data: data,
        type: 'bar', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
        height: 250,
        colors: ['#262626', '#ff991d']
        })
        downloadBtnInComing.addEventListener("click", function() {
            chart.export();
        })
    })
    //console.log(layer)
    const containerForComingPop = document.createElement("div");
    const popUp = document.createElement("ul");
    const nameRow = document.createElement("li");
    const positiveRow = document.createElement("li");
    const negativeRow = document.createElement("li");
    //const chartRow = document.createElement("li");
    nameRow.innerText = "Name: " + name;
    positiveRow.innerText = "Total coming: " + coming;
    //negativeRow.innerText = "Total leaving: " + going;
    //chartRow.innerHTML = chart;
    //chartRow.appendChild(comingChart);
    popUp.appendChild(nameRow);
    popUp.appendChild(positiveRow);
    popUp.appendChild(comingChart);
    //popUp.appendChild(chartRow);
    popUp.appendChild(downloadBtnInComing);
    containerForComingPop.appendChild(popUp);
    layer.bindPopup(
        containerForComingPop
    )
    containerForComingPop.style.margin = "10px";
};

const getFeatureForPopulation = (feature, layer, populationDataObjectToArr) => {

    if (!feature.properties || !feature.properties.name) return;
    const name = feature.properties.name;
    const populationChart = document.createElement("div");
    populationChart.id = "chart-" + name.replace(/\s+/g,"-");
    const birthChart = document.createElement("div");
    birthChart.id = "birth-" + name.replace(/\s+/g, "-");
    //console.log(feature)
    // Tooltip always visible
    //let goingDataLayer = null
    
    layer.bindTooltip(feature.properties.name, {
        permanent: false,
        direction: "auto"
    });

    const selection = document.createElement("select");
    selection.className = "form-select form-select-lg mb-3 customSelectInPopulation";
    selection.ariaLabel = "Large select example";
    const option = document.createElement("option");
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");
    const option3 = document.createElement("option");
    selection.id = "chartSelector";
    option.selected
    option.innerText = "Open this select menu";
    option1.value = "default";
    option1.innerText = "Default";
    option2.value = "births";
    option2.innerText = "Births";
    option3.value = "birthNet";
    option3.innerText = "Birth Net"

    selection.appendChild(option);
    selection.appendChild(option1);
    selection.appendChild(option2);
    selection.appendChild(option3);


    //download btn
    const downloadBtn = document.createElement("button");
    downloadBtn.type = "button";
    downloadBtn.id = "downloadBtnInPopulation";
    downloadBtn.innerText = "Click to download";
    downloadBtn.className = "btn btn-outline-secondary"
    
    layer.on("popupopen", () => {
        
        //populationDataSlicing.forEach((index) => {
          //  total_population_data_set.push(populationDataSlicing[index][0]);
        //})
        let populationDataSlicing = [];
        populationDataObjectToArr.forEach((municipality) => {
        
        if (name === municipality.name) {
            
            let population_index_slicing = 0
            while (population_index_slicing < 75) {
                populationDataSlicing.push(municipality.dataPopulation.slice(population_index_slicing, population_index_slicing + 3))
                population_index_slicing += 3
            }
                //goingDataLayer = municipality.Going;
            }
        
        })
        //console.log(populationDataSlicing)
        const populationByRegion = populationDataSlicing.map(yearTriplet => yearTriplet[2])
        const birthByRegion = populationDataSlicing.map(yearTriplet => yearTriplet[0])
        const deathByRegion = populationDataSlicing.map(yearTriplet => yearTriplet[1])
        console.log("Birth:" + birthByRegion[0])
        console.log("death: " + deathByRegion )
        const birthNet = []
        for (let i = 0; i < 25; i++) {
            birthNet.push(birthByRegion[i] - deathByRegion[i]);
        }
        console.log(birthNet)
        let data = {
            labels: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010",
                "2011","2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"
            ],

            datasets: [
                {
                        name: "Total Population in " + name,
                        type: "line",
                        values: populationByRegion
                    }
                    //{
                      //  name: "Total Death in " + name,
                        //type: "bar",
                        //values: deathByRegion
                    //}
            ]
        }
        

        let chart = new frappe.Chart(populationChart, {  // or a DOM element,
                                                // new Chart() in case of ES6 module with above usage
            title: "Population from 2000 to 2024",
            data: data,
            type: 'axis-mixed', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
            height: 250,
            colors: ['#0077ff', '#743ee2']
        })
        let current_chart = null;
        selection.addEventListener("change", function(e) {
            let value = e.target.value;
            console.log(value)
            //let newDataSets = null
            if (value === "births") {
                let newDataSets = {
                    labels: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010",
                        "2011","2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"
                        ],
                    datasets: [
                        {
                            name: "Total Birth in " + name,
                            type: "line",
                            values: birthByRegion
                        },
                        {
                            name: "Total Death in " + name,
                            type: "line",
                            values: deathByRegion
                        }
                    ]
                }
                let birthDeathchartDis = new frappe.Chart(birthChart, {  // or a DOM element,
                                                // new Chart() in case of ES6 module with above usage
                    title: "Birth and Death from 2000 to 2024",
                    data: newDataSets,
                    type: 'bar', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
                    height: 250,
                    colors: ['#272727', '#e83333']
                })
                current_chart = birthDeathchartDis;
            } else if (value === "birthNet") {
                birthChart.innerHTML = "";
                let newDataSets = {
                    labels: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010",
                        "2011","2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"
                        ],
                    datasets: [
                        {
                            name: "Birth net in " + name,
                            type: "line",
                            values: birthNet
                        }
                    ]
                }
                let birthNetchartDis = new frappe.Chart(birthChart, {  // or a DOM element,
                                                // new Chart() in case of ES6 module with above usage
                    title: "Birth Net from 2000 to 2024",
                    data: newDataSets,
                    type: 'line', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
                    height: 250,
                    colors: ['#1a1a1a', '#743ee2']
                })  
                current_chart = null;
                current_chart = birthNetchartDis;
            } else if (value === "default") {
                birthChart.innerHTML = "";
                current_chart = null;
                current_chart = chart;
            }
        });
        downloadBtn.addEventListener("click", function() {
            current_chart.export();
        })
    })

    const popUp = document.createElement("ul");
    const header1 = document.createElement("p");    
    const nameRow = document.createElement("li");
    const selecitonRow = document.createElement("li");
    //const positiveRow = document.createElement("li");
    //const negativeRow = document.createElement("li");
    const chartRow = document.createElement("li");

    nameRow.innerText = "Name: " + name;
    header1.innerText = "Select to visualize"

    //positiveRow.innerText = "Total coming: " + coming;
    //negativeRow.innerText = "Total leaving: " + going;
    //chartRow.innerHTML = chart;
    chartRow.appendChild(populationChart);
    chartRow.appendChild(birthChart);
    selecitonRow.appendChild(header1);
    selecitonRow.appendChild(selection);
    //popUp.appendChild(selection);
    popUp.appendChild(selecitonRow);
    //popUp.appendChild(positiveRow);
    //popUp.appendChild(negativeRow);
    popUp.appendChild(chartRow);
    popUp.appendChild(downloadBtn)
    layer.bindPopup(
        popUp
    )
};

const getStyle = (feature, layer,combined) => {
    const name = feature.properties.name;
    let going = 0;
    let coming = 0;
    combined.forEach((element) => {
        if (name === element.name) {
            //going += element.Going;
            for (let eComing = 0; eComing < 25; eComing++) {
                coming += element.Coming[eComing];
                going += element.Going[eComing];
            }
            //console.log(coming)
            //console.log(element.Coming[0]);
            //console.log(element.Going);
        }
    })
    if (going === 0) {
        let r = 120
        return {
            fillColor: `hsl(${r}, 75%, 50%)`,
            weight: 1,
            color: "#333",
            fillOpacity: 0.7
        };
    } else {
        let res = Math.min((Math.pow((coming/going),3))*60,120);
        return {
            fillColor: `hsl(${res}, 75%, 50%)`,
            weight: 1,
            color: "#333",
            fillOpacity: 0.7
        };
    }

}

const getStyleForComing = (feature, layer, comingArr) => {
    const name = feature.properties.name;
    //let going = 0;
    let coming = 0;
    comingArr.forEach((element) => {
        if (name === element.name) {
            //going += element.Going;
            for (let eComing = 0; eComing < 25; eComing++) {
                coming += element.Coming[eComing];
                //going += element.Going[eComing];
            }
            //console.log(coming)
            //console.log(element.Coming[0]);
            //console.log(element.Going);
        }
    })
    if (coming === 0) {
        let r = 120
        return {
            fillColor: `hsl(${r}, 75%, 50%)`,
            weight: 1,
            color: "#333",
            fillOpacity: 0.7
        };
    } else {
        let res = Math.min((Math.pow((coming/10000),3))*60,120);
        return {
            fillColor: `hsl(${res}, 75%, 50%)`,
            weight: 1,
            color: "#333",
            fillOpacity: 0.7
        };
    }
}

window.addEventListener("DOMContentLoaded", async () => {
    await initializeData();
    await fetchData();
});
