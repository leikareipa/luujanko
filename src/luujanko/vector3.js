/*
 * 2019 Tarpeeksi Hyvae Soft
 * 
 * Software: Luujanko
 *
 */

"use strict";

Luu.vector3 = function(x = 0, y = 0, z = 0)
{
    Luu.assert && ((typeof x === "number") &&
                   (typeof y === "number") &&
                   (typeof z === "number"))
               || Luu.throw("Expected numbers as parameters to the vector3 factory.");

    const publicInterface =
    {
        x,
        y,
        z,
    };

    return publicInterface;
}

// Convenience semantic aliases for vector3.
Luu.translation = Luu.vector3;
Luu.rotation    = Luu.vector3;
Luu.scaling     = Luu.vector3;

// Transforms the vector by the given 4x4 matrix.
Luu.vector3.transform = function(v, m = [])
{
    Luu.assert && (m.length === 16)
               || Luu.throw("Expected a 4 x 4 matrix to transform the vector by.");
    
    const x_ = ((m[0] * v.x) + (m[4] * v.y) + (m[ 8] * v.z));
    const y_ = ((m[1] * v.x) + (m[5] * v.y) + (m[ 9] * v.z));
    const z_ = ((m[2] * v.x) + (m[6] * v.y) + (m[10] * v.z));

    v.x = x_;
    v.y = y_;
    v.z = z_;
}

Luu.vector3.normalize = function(v)
{
    const sn = ((v.x * v.x) + (v.y * v.y) + (v.z * v.z));

    if (sn != 0 && sn != 1)
    {
        const inv = (1 / Math.sqrt(sn));
        v.x *= inv;
        v.y *= inv;
        v.z *= inv;
    }
}

Luu.vector3.dot = function(v, other)
{
    return ((v.x * other.x) + (v.y * other.y) + (v.z * other.z));
}

Luu.vector3.cross = function(v, other)
{
    const c = Luu.vector3();

    c.x = ((v.y * other.z) - (v.z * other.y));
    c.y = ((v.z * other.x) - (v.x * other.z));
    c.z = ((v.x * other.y) - (v.y * other.x));

    return c;
}

Luu.vector3.invert = function(v)
{
    v.x *= -1;
    v.y *= -1;
    v.z *= -1;
}
