# Statistic Portal Visualization

This project is a **dynamic data visualization portal** using open data from [Tilastokeskus (Statistics Finland)](https://statfin.stat.fi/PxWeb/pxweb/en/StatFin/). It provides interactive maps and charts for various statistics, including migration, population, and more. The application is designed to work on both **desktop and mobile screens**.

---

## Features

- **Interactive Map:**  
  Visualize migration, population, and other statistics on a map. Users can switch between different layers of data.

- **Dynamic Charts:**  
  Clicking a municipality on the map opens a popup with charts showing historical trends for that area. Users can switch between:
  - Total population
  - Births and deaths
  - Net birth
  - Migration (incoming and outgoing)
  - Net migration

- **Multiple Data Sources:**  
  Fetches data from multiple API endpoints, including migration and population statistics. Data is combined and processed for visualization.

- **User Control:**  
  Users can:
  - Select which data to visualize
  - Change chart types dynamically
  - Calculate net values (e.g., net migration or net births)
  
- **Download Option:**  
  Charts can be downloaded as PNG files.

- **Responsive Design:**  
  Designed to adapt to both desktop and mobile screens.

---

## Data Sources

1. **Migration Data** – `statfin_muutl`  
2. **Population Data** – `statfin_synt`  
3. **Municipality GeoJSON** – [Statistics Finland GeoServer](https://geo.stat.fi/geoserver/wfs)

---

## Technologies Used

- **JavaScript** – for fetching data and handling interactive features  
- **Frappe Charts** – for chart visualizations  
- **Leaflet.js** – for interactive maps  
- **HTML & CSS** – for structure and styling  

Optional: Bootstrap is used for styling dropdowns and buttons.

---

## Setup & Usage

1. Clone the repository or download the files.
2. Make sure you have internet access to fetch API data from Tilastokeskus.
3. Open `index.html` in a browser.
4. Interact with the map:
   - Click on a municipality to see detailed charts
   - Use dropdowns to switch chart views
   - Download charts as PNG files
5. Switch layers using the layer control in the map to see different datasets.

---

## File Structure

/project-root
│
├─ index.html # Main HTML file
├─ exWe5.js # JavaScript code for fetching and visualizing data
├─ styles.css # Styling for map and popups
├─ migration_query.json # JSON query for migration data
├─ migration_query_Going.json
├─ population_query.json # JSON query for population data
└─ README.md


---

## How It Works

1. **Fetch Data:**  
   Data is fetched from the Tilastokeskus PxWeb API using POST requests.  

2. **Process Data:**  
   Migration and population data are processed to create objects for each municipality, including incoming/outgoing migration and population trends.

3. **Initialize Map:**  
   Leaflet.js renders the GeoJSON of municipalities with multiple layers:
   - Migration (coming + going)
   - Coming migration only
   - Population

4. **Dynamic Popups:**  
   Clicking a municipality opens a popup showing:
   - Relevant statistics
   - Interactive charts (using Frappe Charts)
   - Dropdown to switch chart view
   - Download button to export the chart

---

## Notes

- Ensure CORS is allowed when fetching data from PxWeb API. Running on a local server (e.g., VS Code Live Server) is recommended.
- Some charts are **axis-mixed** type for combining line and bar charts.
- Users can dynamically switch data and chart types within the popup for more insights.

---

## Future Enhancements

- Add additional datasets like employment/unemployment rates, election results.
- Implement correlation analysis between migration, population, education, and political preferences.
- Export map + charts together as an image.
- Improve mobile responsiveness and styling for charts.

---

## Author

Nguyen Lam Duc Anh

