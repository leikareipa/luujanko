/*
 * 2019 Tarpeeksi Hyvae Soft
 * 
 * Software: Luujanko
 *
 */

"use strict";

// A collection of ngons, with shared translation and rotation.
Luu.mesh = function(ngons = [Luu.ngon()], transform = {})
{
    Luu.assert && (ngons instanceof Array)
               || Luu.throw("Expected a list of ngons for creating an ngon mesh.");

    Luu.assert && (transform instanceof Object)
               || Luu.throw("Expected an object with transformation properties.");

    Luu.assert && ((typeof Luu.mesh.defaultTransform.rotation !== "undefined") &&
                   (typeof Luu.mesh.defaultTransform.translation !== "undefined") &&
                   (typeof Luu.mesh.defaultTransform.scaling !== "undefined"))
               || Luu.throw("The default transforms object for mesh() is missing required properties.");

    // Combine default transformations with the user-supplied ones.
    transform =
    {
        ...Luu.mesh.defaultTransform,
        ...transform
    };

    const publicInterface =
    {
        ngons,
        rotation: transform.rotation,
        translation: transform.translation,
        scale: transform.scaling,
    };
    
    return publicInterface;
}

Luu.mesh.defaultTransform = 
{
    translation: Luu.translation(0, 0, 0),
    rotation: Luu.rotation(0, 0, 0),
    scaling: Luu.scaling(1, 1, 1)
};

Luu.mesh.object_space_matrix = function(m)
{
    const translationMatrix = Luu.matrix44.translation(m.translation.x,
                                                       m.translation.y,
                                                       m.translation.z);

    const rotationMatrix = Luu.matrix44.rotation(m.rotation.x,
                                                 m.rotation.y,
                                                 m.rotation.z);

    const scalingMatrix = Luu.matrix44.scaling(m.scale.x,
                                               m.scale.y,
                                               m.scale.z);

    return Luu.matrix44.multiply(Luu.matrix44.multiply(translationMatrix, rotationMatrix), scalingMatrix);
}
