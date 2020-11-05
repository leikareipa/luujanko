/*
 * 2020 Tarpeeksi Hyvae Soft
 * 
 * Software: Luujanko
 * 
 */

"use strict";

Luu.rasterize = function(ngon, svgPolygonElement, svgElement)
{
    Luu.assert && (ngon &&
                   (ngon.material) &&
                   (ngon.vertices) &&
                   (ngon.vertices.length >= 2))
               || Luu.throw("Invalid n-gon for rasterization.");

    svgPolygonElement.setAttribute("stroke", ngon.material.color.string());
    svgPolygonElement.setAttribute("points", ngon.vertices.reduce((string, v)=>(string += `${v.x},${v.y} `), ""));

    svgElement.appendChild(svgPolygonElement);

    return;
}
