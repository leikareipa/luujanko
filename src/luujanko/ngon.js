/*
 * 2019 Tarpeeksi Hyvae Soft
 * 
 * Software: Luujanko
 *
 */

"use strict";

// A single n-sided ngon.
Luu.ngon = function(vertices = [Luu.vertex()], material = Luu.material.default)
{
    Luu.assert && (vertices instanceof Array)
               || Luu.throw("Expected an array of vertices to make an ngon.");

    Luu.assert && (material instanceof Object)
               || Luu.throw("Expected an object containing user-supplied options.");

    // Combine default material options with the user-supplied ones.
    material =
    {
        ...Luu.material.default,
        ...material
    };

    const publicInterface =
    {
        vertices,
        material,
    };

    return publicInterface;
}

Luu.ngon.perspective_divide = function(ngon)
{
    for (const vert of ngon.vertices)
    {
        Luu.vertex.perspective_divide(vert);
    }
},

Luu.ngon.transform = function(ngon, matrix44)
{
    for (const vert of ngon.vertices)
    {
        Luu.vertex.transform(vert, matrix44);
    }
},

// Returns true if at least one of the given n-gon's vertices is inside the viewport;
// false otherwose.
Luu.ngon.is_inside_viewport = function(ngon)
{
    for (const vertex of ngon.vertices)
    {
        // If this vertex is inside the viewport. In that case, at least one of the
        // n-gon's vertices is inside the viewport, and so the n-gon doesn't need to
        // be clipped.
        if (( vertex.x <= vertex.w) &&
            (-vertex.x <= vertex.w) &&
            ( vertex.y <= vertex.w) &&
            (-vertex.y <= vertex.w) &&
            ( vertex.z <= vertex.w) &&
            (-vertex.z <= vertex.w))
        {
            return true;
        }
    }

    return false;
}
