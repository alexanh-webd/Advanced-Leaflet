let migrationDataSet = null;
// Fetch Migration_query.json
const fetchMigration = async (url, body) => {
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
    const migrationData = await (await fetch("migration_query.json")).json();
    //console.log(migrationData);
    const dataSet = await fetchMigration("https://pxdata.stat.fi/PxWeb/api/v1/fi/StatFin/muutl/statfin_muutl_pxt_11a2.px", migrationData)
    migrationDataSet = dataSet;

}
// Fetch geoJson URL
const fetchData = async () => {
    const url = "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326";
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    console.log(migrationDataSet);
    const index = migrationDataSet.dimension.Alue.category.index;
    const label = migrationDataSet.dimension.Alue.category.label;
    const migrationValues = migrationDataSet.value
    const indexArray = Object.values(index);
    const labelArray = Object.values(label);
    const migrationValueArr = Object.values(migrationValues);
    let combined = {};
    indexArray.forEach((key, i) => {
        combined[key] = {
            name: labelArray[i],
            Coming: migrationValueArr[i*2],
            Going: migrationValueArr[i*2+1]
            
        }
    })
    const combinedArr = Object.values(combined);
    console.log(combinedArr);
    initMap(data, combinedArr)
};




// Initialize map and add geoJSON to map
const initMap = (data, combined) => {
    let map = L.map('map', {
        minZoom: -3
    })

    let geoJson = L.geoJson(data, {
        onEachFeature: (feature, layer) => getFeature(feature, layer, combined),
        style: (feature, layer) => getStyle(feature, layer, combined)
    }).addTo(map)

    // add open street map to map
    let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 20,
        attribution: "© OpenStreetMap"
    }).addTo(map);


    map.fitBounds(geoJson.getBounds())

}
const getFeature = (feature, layer, combined) => {
    if (!feature.properties || !feature.properties.name) return;
    const name = feature.properties.name;
    let going = 0;
    let coming = 0;
    combined.forEach((element) => {
        if (name === element.name) {
            going += element.Going;
            coming += element.Coming;
            //console.log(element.Coming);
            //console.log(element.Going);
        }
    })
    
    console.log(feature)
    // Tooltip always visible
    layer.bindTooltip(feature.properties.name, {
        permanent: false,
        direction: "auto"
    });

    layer.bindPopup(
        `<ul>
            <li>Name: ${name}</li>
            <li>Positive: ${coming}</li>
            <li>Negative: ${going}</li>
        </ul>`
    )
};
const getStyle = (feature, layer,combined) => {
    const name = feature.properties.name;
    let going = 0;
    let coming = 0;
    combined.forEach((element) => {
        if (name === element.name) {
            going += element.Going;
            coming += element.Coming;
            //console.log(element.Coming);
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
// Using the migration data to add features to the pop up
//const getFeature = (feature, layer, combined) => {
//  if (!feature.properties.id) return;
//    const id = feature.properties.id;
//    console.log(feature.properties)
//    console.log(combined[id+1])

//    let dataAtId = null;
//    dataAtId = migrationDataSet.dimension.Alue.category.index;
    
//    layer.bindTooltip(feature.properties.name, {
//        permanent: true,
//        direction: "center",
//        className: "map-tooltip"
//    })
        //`<ul>
          //  <li>Name: ${feature.properties.name}</li>
            //<li>Net Migration: ${combined[id+1]}</li>
        //</ul>`
        
//}

//fetchMigration();
window.addEventListener("DOMContentLoaded", async () => {
    await initializeData();
    await fetchData();
});
