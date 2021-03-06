import React from 'react';
import Plot from 'react-plotly.js';

const Analyze = () => {
    const d1 = new Date(2022, 4, 25);
        const d2 = new Date(2022, 4, 26);
        const d3 = new Date(2022, 4, 27);
        var xArray = [d1, d2, d3];
        var yArray = [60.1, 12.2, 65.7];

        // Define Data
        var data1 = [
            {
                x: xArray,
                y: yArray,
                type: 'scatter'
            }
        ];

        // Define Layout
        var layout1 = {
            xaxis: { title: "Total Daily Carbon Emission" },
            yaxis: { range: [0, 70], title: "Date" },
            title: "Carbon Emission vs. Date"
        };

        var data2 = [
            {
                x: ['chicken', 'vegetables', 'beef'],
                y: [18.3, 0.5, 119.2],
                type: 'bar'
            }
        ];

        var layout2 = {
            xaxis: { title: "Total Carbon Emission" },
            yaxis: { title: "Food" },
            title: "Carbon Emission vs. Food"
        };

        
    return (<div>
            <Plot data={data1} layout={layout1}/> 
            <Plot data={data2} layout={layout2}/>
        </div>);
}
  export default Analyze;
