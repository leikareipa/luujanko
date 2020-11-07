/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: Luujanko
 *
 */

"use strict";

// RGB values in the range [0,255], alpha value in the range [0,1].
Luu.color = function(red = 128, green = 128, blue = 128, alpha = 1)
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

            return "gray";
        }
    };
    
    return publicInterface;
}
