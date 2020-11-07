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
    lineColor: Luu.color(128, 128, 128, 1),
    allowTransform: true,
};
