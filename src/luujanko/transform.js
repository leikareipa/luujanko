/*
 * 2019 Tarpeeksi Hyvae Soft
 * 
 * Software: Luujanko
 *
 */

"use strict";

// Applies lighting to the given n-gons, and transforms them into screen space
// for rendering. The processed n-gons are stored in the internal n-gon cache.
Luu.transform_and_clip = function(ngon,
                                  objectMatrix = [],
                                  clipSpaceMatrix,
                                  screenSpaceMatrix = [])
{
    // Ignore fully transparent polygons.
    if (!ngon.material.lineColor.alpha)
    {
        return null;
    }

    const transformedNgon = Luu.ngon();

    // Copy the ngon into the internal n-gon cache, so we can operate on it without
    // mutating the original n-gon's data.
    {
        transformedNgon.vertices.length = ngon.vertices.length;

        for (let v = 0; v < ngon.vertices.length; v++)
        {
            transformedNgon.vertices[v] = Luu.vertex(ngon.vertices[v].x,
                                                     ngon.vertices[v].y,
                                                     ngon.vertices[v].z);
        }

        transformedNgon.material = ngon.material;
        transformedNgon.isActive = true;
    }

    // Transform vertices into screen space and apply clipping. We'll do the transforming
    // in steps: first into object space, then into clip space, and finally into screen
    // space.
    {
        // Object space. Any built-in lighting is applied, if requested by the n-gon's
        // material.
        {
            Luu.ngon.transform(transformedNgon, objectMatrix);

            /// TODO: Apply a vertex shader here.
        }

        // Clip space. If none of the n-gon's vertices are inside the viewport, the n-gon
        // will be culled.
        {
            Luu.ngon.transform(transformedNgon, clipSpaceMatrix);

            Luu.ngon.clip_to_viewport(transformedNgon)

            if (!transformedNgon.vertices.length)
            {
                return null;
            }
        }

        // Screen space. Vertices will be transformed such that their XY coordinates
        // map directly into XY pixel coordinates in the rendered image (although
        // the values may still be in floating-point).
        {
            Luu.ngon.transform(transformedNgon, screenSpaceMatrix);
            Luu.ngon.perspective_divide(transformedNgon);
        }
    }

    return transformedNgon;
}
