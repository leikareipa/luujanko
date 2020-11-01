/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: Luujanko
 *
 */

"use strict";

// Values in the range [0,1].
Luu.color = function(red = 0.5, green = 0.5, blue = 0.5, alpha = 1)
{
    const publicInterface =
    {
        red,
        green,
        blue,
        alpha,

        string: function()
        {
            /// TODO.

            return "lightgray";
        }
    };
    
    return publicInterface;
}
