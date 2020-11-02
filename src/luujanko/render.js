/*
 * 2019, 2020 Tarpeeksi Hyvae Soft
 *
 * Software: Luujanko
 * 
 */

"use strict";

Luu.render = function(targetSVGElement,
                      meshes = [Luu.mesh()],
                      options = Luu.svg.defaultOptions)
{
    options = Object.freeze({
        ...Luu.render.defaultOptions,
        ...options
    });

    const renderWidth = Number(targetSVGElement.getAttribute("width"));
    const renderHeight = Number(targetSVGElement.getAttribute("height"));

    wipe(targetSVGElement);
    draw(meshes, targetSVGElement);

    return;

    function wipe(svgElement)
    {
        while (svgElement.firstChild)
        {
            svgElement.removeChild(svgElement.firstChild);
        }
    }

    function draw(meshes, svgElement)
    {
        const cameraMatrix = Luu.matrix44.multiply(Luu.matrix44.rotation(options.viewDirection.x,
                                                                         options.viewDirection.y,
                                                                         options.viewDirection.z),
                                                   Luu.matrix44.translation(-options.viewPosition.x,
                                                                            -options.viewPosition.y,
                                                                            -options.viewPosition.z));

        const perspectiveMatrix = Luu.matrix44.perspective((options.fov * (Math.PI / 180)),
                                                           (renderWidth / renderHeight),
                                                           options.nearPlane,
                                                           options.farPlane);

        const screenSpaceMatrix = Luu.matrix44.ortho((renderWidth + 1), (renderHeight + 1));

        const clipSpaceMatrix = Luu.matrix44.multiply(perspectiveMatrix, cameraMatrix);

        for (const mesh of meshes)
        {
            const objectSpaceMatrix = Luu.mesh.object_space_matrix(mesh);

            for (const ngon of mesh.ngons)
            {
                const transformedNgon = Luu.transform_and_clip(ngon,
                                                               objectSpaceMatrix,
                                                               clipSpaceMatrix,
                                                               screenSpaceMatrix);

                if (transformedNgon)
                {
                    Luu.rasterize(transformedNgon, svgElement);
                }
            }
        }

        return;
    }
}

Luu.render.defaultOptions = {
    viewPosition: Luu.vector3(0, 0, 0),
    viewDirection: Luu.vector3(0, 0, 0),
    nearPlane: 1,
    farPlane: 1000,
    fov: 43,
};
