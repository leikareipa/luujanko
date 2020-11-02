/*
 * 2020 Tarpeeksi Hyvae Soft
 * 
 * Software: Luujanko
 * 
 */

"use strict";

Luu.rasterize = function(ngon, svgPolygonElement)
{
    Luu.assert && (ngon &&
                   (ngon.material) &&
                   (ngon.vertices) &&
                   (ngon.vertices.length >= 2))
               || Luu.throw("Invalid n-gon for rasterization.");

    svgPolygonElement.setAttribute("points", ngon.vertices.reduce((string, v)=>(string += `${v.x},${v.y} `), ""));

    return;
}
