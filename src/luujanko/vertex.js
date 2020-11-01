/*
 * 2019 Tarpeeksi Hyvae Soft
 * 
 * Software: Luujanko
 *
 */

"use strict";

Luu.vertex = function(x = 0, y = 0, z = 0, w = 1)
{
    Luu.assert && ((typeof x === "number") &&
                   (typeof y === "number") &&
                   (typeof z === "number") &&
                   (typeof w === "number"))
               || Luu.throw("Expected numbers as parameters to the vertex factory.");

    const publicInterface =
    {
        x,
        y,
        z,
        w,
    };

    return publicInterface;
}

// Transforms the vertex by the given 4x4 matrix.
Luu.vertex.transform = function(v, m = [])
{
    Luu.assert && (m.length === 16)
                    || Luu.throw("Expected a 4 x 4 matrix to transform the vertex by.");
    
    const x_ = ((m[0] * v.x) + (m[4] * v.y) + (m[ 8] * v.z) + (m[12] * v.w));
    const y_ = ((m[1] * v.x) + (m[5] * v.y) + (m[ 9] * v.z) + (m[13] * v.w));
    const z_ = ((m[2] * v.x) + (m[6] * v.y) + (m[10] * v.z) + (m[14] * v.w));
    const w_ = ((m[3] * v.x) + (m[7] * v.y) + (m[11] * v.z) + (m[15] * v.w));

    v.x = x_;
    v.y = y_;
    v.z = z_;
    v.w = w_;
}

// Applies perspective division to the vertex.
Luu.vertex.perspective_divide = function(v)
{
    v.x /= v.w;
    v.y /= v.w;
}
