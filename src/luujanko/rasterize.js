/*
 * 2020 Tarpeeksi Hyvae Soft
 * 
 * Software: Luujanko
 * 
 */

"use strict";

Luu.rasterize = function(ngon, svgElement)
{
    const polyElement = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    const material = ngon.material;

    polyElement.setAttribute("stroke", material.color.string());
    polyElement.setAttribute("fill", "transparent");
    polyElement.setAttribute("stroke-width", "1");
    polyElement.setAttribute("shape-rendering", material.crispEdges? "crispEdges" : "geometricPrecision");
    polyElement.setAttribute("points", ngon.vertices.reduce((string, v)=>(string += `${v.x},${v.y} `), ""));

    svgElement.appendChild(polyElement);

    return;
}
