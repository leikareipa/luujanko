/*
 * 2020 Tarpeeksi Hyvae Soft
 * 
 * Software: Luujanko
 * 
 */

"use strict";

// Luujanko's top-level namespace.
export const Luu = {
    version: {family:"alpha",major:"0",minor:"0",dev:true}
};

// Various small utility functions and the like.
{
    // Defined 'true' to allow for the conveniency of named in-place assertions, e.g.
    // Luu.assert && (x === 1) ||Luu.throw("X wasn't 1.").
    //
    // Note that setting this to 'false' won't disable assertions - for that,
    // you'll want to search/replace "Luu.assert &&" with "Luu.assert ||" and keep this
    // set to 'true'. The comparison against Luu.assert may still be done, though (I guess
    // depending on the JS engine's ability to optimize).
    Object.defineProperty(Luu, "assert", {value:true, writable:false});

    Luu.lerp = (x, y, interval)=>(x + (interval * (y - x)));

    Luu.throw = (errMessage = "")=>
    {
        throw Error("Luujanko error: " + errMessage);
    }

    Luu.log = (string = "Hello there.")=>
    {
        console.log("Luujanko: " + string);
    }
}
