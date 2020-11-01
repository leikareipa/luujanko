/*
 * 2019, 2020 Tarpeeksi Hyvae Soft
 *
 * Software: Luujanko
 * 
 */

"use strict";

Luu.svg = function(meshes = [Luu.mesh()],
                   options = Luu.svg.defaultOptions)
{
    options = Object.freeze({
        ...Luu.svg.defaultOptions,
        ...options
    });

    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute("width", options.width);
    svgElement.setAttribute("height", options.height);

    draw(meshes, svgElement);

    return svgElement;

    function draw(meshes, svgElement)
    {
        const cameraMatrix = Luu.matrix44.multiply(Luu.matrix44.rotation(options.viewDirection.x,
                                                                         options.viewDirection.y,
                                                                         options.viewDirection.z),
                                                   Luu.matrix44.translation(-options.viewPosition.x,
                                                                            -options.viewPosition.y,
                                                                            -options.viewPosition.z));

        const perspectiveMatrix = Luu.matrix44.perspective((options.fov * (Math.PI / 180)),
                                                           (options.width / options.height),
                                                           options.nearPlane,
                                                           options.farPlane);

        const screenSpaceMatrix = Luu.matrix44.ortho((options.width + 1), (options.height + 1));

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

Luu.svg.defaultOptions = {
    viewPosition: Luu.vector3(0, 0, 0),
    viewDirection: Luu.vector3(0, 0, 0),
    nearPlane: 1,
    farPlane: 1000,
    fov: 43,
    width: 640,
    height: 480,
};
