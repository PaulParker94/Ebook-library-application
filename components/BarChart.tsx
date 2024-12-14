// Render the component client-side
'use client'; 

// Import React hooks and import d3 library for data visualization
import { useEffect, useRef } from 'react';
import * as d3 from 'd3'; 

// Define the data fetched from the API
interface Point {
  title: string;
  download_count: number;
}

// Specify that 'data' is an array of Point objects
const BarChart = ({ data }: { data: Point[] }) => {
  const svgRef = useRef<SVGSVGElement | null>(null); // Create a reference to the SVG element for drawing the bar chart

  useEffect(() => {
    // If data is empty do not render an empty bar chart
    if (data.length === 0) return;

    // Define bar chart dimensions and margins
    const width = 640;
    const height = 400;
    const marginTop = 20;
    const marginRight = 0;
    const marginBottom = 30;
    const marginLeft = 40;

    // Map book titles on the x-axis
    const x = d3.scaleBand()
      .domain(data.map(d => d.title)) // Use book titles for the x-axis
      .range([marginLeft, width - marginRight]) // Sets the scale from left margin to available width.
      .padding(0.3); // Padding between bars

    // Mapping download count to the y-axis
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.download_count) || 0]) // Use the max download count for y-axis
      .nice() // Adjusts the scale to use rounded values 
      .range([height - marginBottom, marginTop]); //Sets the scale from bottom margin to top margin.

    // Select the SVG element and set its attributes for size, style, and appearance
    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif; overflow: visible;");

    // Plot the 'data' array on the bar chart, using the 'title' as a unique identifier for each bar
    const bars = svg.selectAll("rect")
      // @ts-expect-error data type d is unknown[] causing typescript to raise error over title property not being guaranteed
      .data(data, d => d.title); 

    // Create and animate bars with transition effects
    bars.join("rect")
      // @ts-expect-error data type d is unknown[] causing typescript to raise error over title property not being guaranteed
      .attr("x", d => x(d.title))
      .attr("y", d => y(d.download_count))
      .attr("height", d => y(0) - y(d.download_count))
      .attr("width", x.bandwidth())
      .attr("fill", "red")
      .transition()
      .duration(750)
      .delay((d, i) => i * 20);

    // Add Y-axis and style the text
    svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      // @ts-expect-error data type d is unknown[] causing typescript to raise error over title property not being guaranteed
      .call(d3.axisLeft(y).tickFormat(d => `${d / 1000}k`))
      .call(g => g.select(".domain").remove())
      .selectAll("text")
      .style("fill", "white"); 

    // Remove x-axis labels to avoid overlapping text
    svg.selectAll(".x-axis").remove();

    // Style and position the information box
    const tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("background-color", "#212121")
      .style("color", "#fff")
      .style("padding", "10px")
      .style("font-size", "9px")
      .style("border-radius", "10px")
      .style("visibility", "hidden");

    // Show information box on hover
    bars.on("mouseenter", function (event, d) {
      tooltip
        .style("visibility", "visible")
        .html(`Book Title: ${d.title}<br>Downloads: ${d.download_count}`);
    })
    // Information box position on hover
    .on("mousemove", function (event) {
      tooltip
        .style("top", (event.pageY + 10) + "px")
        .style("left", (event.pageX - 40) + "px");
    })
    // Information box disappears on mouse off
    .on("mouseleave", function () {
      tooltip.style("visibility", "hidden");
    });

  }, [data]); // Re-run effect when `data` changes

  return (
    <div className='min-h-screen'>
      <svg ref={svgRef}></svg> {/* Render the bar chart */}
    </div>
  );
};

export default BarChart; // Export the BarChart component
