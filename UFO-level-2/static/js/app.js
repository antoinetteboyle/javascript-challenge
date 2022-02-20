// from data.js
var tableData = data;

// From data.js iterate through values
var tableData = data;
Object.values(tableData).forEach(value => console.log(value));

//Appends table rows for all UFO sighting
var tbody = d3.select("tbody");
tableData.forEach((tableData) => {
    var row = tbody.append("tr");
    Object.entries(tableData).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
});

//*BONUS* multi input options

// Populate new filter inputs in form
d3.select("#datetime.form-control").remove();
var options = [{fromDate:'1/1/2010 - 1/13/2010'},{City:'City e.g. benton'},{State:'State e.g. ar'},{Country:'Country e.g. us'},{Shape:'Shape e.g. triangle'}];
for (let i = 0; i < options.length; i++) {
    let item = options[i];
    console.log(`item${item}`);
    let input = d3.select("li.filter.list-group-item");
    Object.entries(item).forEach(([key, value]) => 
    (input.append("input").attr("class","form-control").attr("id",key).attr("placeholder",value)),
    )
  }

//on filter button click run filter
var form = d3.selectAll("input");
form.on("submit",runEnter);
var button = d3.select("#filter-btn.btn.btn-default");
button.on("click",runEnter);
// Event handler function for the input selected
function runEnter() {
    d3.event.preventDefault();
    // Select the input element and get value property
    var fromDate = d3.select("#fromDate").property("value");
    var City = d3.select("#City").property("value");
    var State = d3.select("#State").property("value");
    var Country = d3.select("#Country").property("value");
    var Shape = d3.select("#Shape").property("value");

    console.log(`filter selected value: ${fromDate},${City},${State},${Country},${Shape}`);
    //Filter based on input data
    var filteredDate = tableData.filter(t => fromDate===t.datetime || String(City).length == 0 );
    var filteredCity = filteredDate.filter(t => t.city === String(City) || String(City).length == 0 );
    var filteredState = filteredCity.filter(t => t.state === String(State) || String(State).length == 0);
    var filteredCountry = filteredState.filter(t => t.country === String(Country) || String(Country).length == 0);
    var filteredData = filteredCountry.filter(t => t.shape === String(Shape) || String(Shape).length == 0);

    if (filteredData.length != 0 ) {
    Object.values(filteredData).forEach(value => console.log(value));
    //Repopulate table
    var tbody = d3.select("tbody");
    tbody.select("tr").remove();
    tbody.selectAll("td").remove();
    filteredData.forEach(filteredData => { 
         var row = tbody.append("tr");
         Object.values(filteredData).forEach(value => {
           var cell = row.append("td");
           cell.text(value);
          console.log("filter table event complete");
         });
   });
  } 
  else {
    alert("Not found! Select exact criteria")
    console.log("Not found! Select exact criteria")}  
}