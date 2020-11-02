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

// Clips all vertices against the sides of the viewport. Adapted from Benny
// Bobaganoosh's 3d software renderer, the source for which is available at
// https://github.com/BennyQBD/3DSoftwareRenderer.
Luu.ngon.clip_to_viewport = function(ngon)
{
    clip_on_axis("z", 1);
    clip_on_axis("z", -1);

    return;

    function clip_on_axis(axis, factor)
    {
        if (ngon.vertices.length < 2)
        {
            return;
        }

        let prevVertex = ngon.vertices[ngon.vertices.length - ((ngon.vertices.length == 2)? 2 : 1)];
        let prevComponent = (prevVertex[axis] * factor);
        let isPrevVertexInside = (prevComponent <= prevVertex.w);
        
        // The vertices array will be modified in-place by appending the clipped vertices
        // onto the end of the array, then removing the previous ones.
        let k = 0;
        let numOriginalVertices = ngon.vertices.length;
        for (let i = 0; i < numOriginalVertices; i++)
        {
            const curComponent = (ngon.vertices[i][axis] * factor);
            const thisVertexIsInside = (curComponent <= ngon.vertices[i].w);

            // If either the current vertex or the previous vertex is inside but the other isn't,
            // and they aren't both inside, interpolate a new vertex between them that lies on
            // the clipping plane.
            if (thisVertexIsInside ^ isPrevVertexInside)
            {
                const vertIdx = (numOriginalVertices + k++);
                const lerpStep = (prevVertex.w - prevComponent) /
                                  ((prevVertex.w - prevComponent) - (ngon.vertices[i].w - curComponent));

                ngon.vertices[vertIdx] = Luu.vertex(Luu.lerp(prevVertex.x, ngon.vertices[i].x, lerpStep),
                                                    Luu.lerp(prevVertex.y, ngon.vertices[i].y, lerpStep),
                                                    Luu.lerp(prevVertex.z, ngon.vertices[i].z, lerpStep));

                ngon.vertices[vertIdx].w = Luu.lerp(prevVertex.w, ngon.vertices[i].w, lerpStep);
            }
            
            if (thisVertexIsInside)
            {
                ngon.vertices[numOriginalVertices + k++] = ngon.vertices[i];
            }

            prevVertex = ngon.vertices[i];
            prevComponent = curComponent;
            isPrevVertexInside = thisVertexIsInside;
        }

        ngon.vertices.splice(0, numOriginalVertices);

        return;
    }
}
