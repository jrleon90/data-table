$(document).ready(function(){
    // Retrieve data from JSON file
    $.getJSON('../data/data.json', function(data){
        // Create Datatable with data get from the JSON file
        $('#dataTable').DataTable({
            data: data,
            columns: [
                { data: 'assetid' },
                { data: 'componenttype' },
                { data: 'systemname' },
                { data: 'material' },
                // If no diameter, set nominaldiameter
                { data: null, render: function(data, type, row) {
                    if (typeof(data.diameter) === 'undefined') return data.nominaldiameter;
                    return data.diameter;
                } },
                { data: 'volume' },
                { data: 'operatingpressure' },
                { data: 'lifecyclestatus' },
                // Set date format
                { data: null, render: function(data, type, row) {
                    const date = new Date(data.installationdate);
                    return date.toLocaleDateString('es');
                } },
                // Set date format
                { data: null, render: function(data, type, row) {
                    const date = new Date(data.lastupdate);
                    return date.toLocaleDateString('es');
                } },
            ]
        });
        // Object to store colors for the Charts
        let color = {
            component:[],
            system: [],
            installation: []
        };
        // Object to store the labels of the data
        const label = {
            component: [],
            system: [],
            installation: []
        };
        // Object to get the total of elements for each label
        const count = {
            component: [],
            system: [],
            installation: []
        };
        // Create array with the Components and then filter with Unique values to get the Labels
        label.component = data.map(item => item.componenttype)
                    .filter((value, index, self) => self.indexOf(value) === index);
        label.system = data.map(item => item.systemname)
                    .filter((value, index, self) => self.indexOf(value) === index);
        label.installation = data.map(item => item.installationdate)
                    .filter((value, index, self) => self.indexOf(value) === index);
        
        // Get the total of elements for each label
        count.component = _.countBy(data.map((item => item.componenttype)));
        count.system = _.countBy(data.map((item => item.systemname)));
        count.installation = _.countBy(data.map((item => item.installationdate)));

        // Set one color for each label that was found
        label.component.map((item) => {
            color.component.push(dynamicColors());
        });
        label.system.map((item) => {
            color.system.push(dynamicColors())
        });
        label.installation.map((item) => {
            color.installation.push(dynamicColors())
        });

        // Get Canvas element from the index
        const ctxComp = document.getElementById("componentChart");
        const ctxSys = document.getElementById("systemChart");
        const ctxInst = document.getElementById("installationChart");

        // New instance for the Chart
        const componentChart = new Chart(ctxComp, {
            type: 'pie',
            data: {
                labels: label.component,
                datasets:[{
                    data: Object.values(count.component),
                    backgroundColor: color.component,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'Components Chart',
                    fontColor: 'white',
                },
                legend: {
                    labels: {
                        fontColor: 'white'
                    }
                }
            }
        });
        // New instance for the Chart
        const systemChart = new Chart(ctxSys, {
            type: 'polarArea',
            data: {
                labels: label.system,
                datasets:[{
                    data: Object.values(count.system),
                    backgroundColor: color.system,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'Systems Chart',
                    fontColor: 'white',
                },
                legend: {
                    labels: {
                        fontColor: 'white'
                    }
                }
            }
        });
        // New instance for the Chart
        const instChart = new Chart(ctxInst, {
            type: 'doughnut',
            data: {
                labels: label.installation,
                datasets:[{
                    data: Object.values(count.installation),
                    backgroundColor: color.installation,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'Installation Date Chart',
                    fontColor: 'white',
                },
                legend: {
                    labels: {
                        fontColor: 'white'
                    }
                }
            }
        });
    });
});

// Function to create random colors
var dynamicColors = function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
 };