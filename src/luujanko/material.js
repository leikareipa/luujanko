/*
 * 2019 Tarpeeksi Hyvae Soft
 * 
 * Software: Luujanko
 *
 */

"use strict";

Luu.material = function(options = Luu.material.default)
{
    options =
    {
        ...Luu.material.default,
        ...options
    };

    const publicInterface = 
    {
        ...options,
    };

    return publicInterface;
}

Luu.material.default = {
    color: Luu.color(0.5, 0.5, 0.5, 1),
    allowTransform: true,
};
