$(document).ready(function(){
    
    $.getJSON('../data/data.json', function(data){
        $('#dataTable').DataTable({
            data: data,
            columns: [
                { data: 'assetid' },
                { data: 'componenttype' },
                { data: 'systemname' },
                { data: 'material' },
                { data: null, render: function(data, type, row) {
                    if (typeof(data.diameter) === 'undefined') return data.nominaldiameter;
                    return data.diameter;
                } },
                { data: 'volume' },
                { data: 'operatingpressure' },
                { data: 'lifecyclestatus' },
                { data: null, render: function(data, type, row) {
                    const date = new Date(data.installationdate);
                    return date.toLocaleDateString('es');
                } },
                { data: null, render: function(data, type, row) {
                    const date = new Date(data.lastupdate);
                    return date.toLocaleDateString('es');
                } },
            ]
        });
        let color = {
            component:[],
            system: [],
            installation: []
        };
        const label = {
            component: [],
            system: [],
            installation: []
        };
        const count = {
            component: [],
            system: [],
            installation: []
        };
        label.component = data.map(item => item.componenttype)
                    .filter((value, index, self) => self.indexOf(value) === index);
        label.system = data.map(item => item.systemname)
                    .filter((value, index, self) => self.indexOf(value) === index);
        label.installation = data.map(item => item.installationdate)
                    .filter((value, index, self) => self.indexOf(value) === index);
        
        count.component = _.countBy(data.map((item => item.componenttype)));
        count.system = _.countBy(data.map((item => item.systemname)));
        count.installation = _.countBy(data.map((item => item.installationdate)));

        label.component.map((item) => {
            color.component.push(dynamicColors());
        });
        label.system.map((item) => {
            color.system.push(dynamicColors())
        });
        label.installation.map((item) => {
            color.installation.push(dynamicColors())
        });
        const ctxComp = document.getElementById("componentChart");
        const ctxSys = document.getElementById("systemChart");
        const ctxInst = document.getElementById("installationChart");

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
var dynamicColors = function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
 };