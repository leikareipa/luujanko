/*
 * 2019, 2020 Tarpeeksi Hyvae Soft
 *
 * Software: Luujanko
 * 
 */

"use strict";

Luu.render = function(meshes = [Luu.mesh()],
                      targetSVGElement,
                      options = Luu.render.defaultOptions)
{
    const renderCallInfo = {
        numNgonsRendered: 0,
        totalRenderTimeMs: performance.now(),
    };

    options = Object.freeze({
        ...Luu.render.defaultOptions,
        ...options
    });

    const renderWidth = Number(targetSVGElement.getAttribute("width"));
    const renderHeight = Number(targetSVGElement.getAttribute("height"));

    prepare(targetSVGElement, meshes);
    wipe(targetSVGElement);
    draw(meshes, targetSVGElement);

    renderCallInfo.totalRenderTimeMs = (performance.now() - renderCallInfo.totalRenderTimeMs);

    return renderCallInfo;

    function wipe(svgElement)
    {
        for (const child of svgElement.children)
        {
            child.setAttribute("points", "");
        }
    }

    function draw(meshes, svgElement)
    {
        const cameraMatrix = Luu.matrix44.multiply(Luu.matrix44.rotation(options.viewRotation.x,
                                                                         options.viewRotation.y,
                                                                         options.viewRotation.z),
                                                   Luu.matrix44.translation(-options.viewPosition.x,
                                                                            -options.viewPosition.y,
                                                                            -options.viewPosition.z));

        const perspectiveMatrix = Luu.matrix44.perspective((options.fov * (Math.PI / 180)),
                                                           (renderWidth / renderHeight),
                                                           options.nearPlane,
                                                           options.farPlane);

        const screenSpaceMatrix = Luu.matrix44.ortho((renderWidth + 1), (renderHeight + 1));

        const clipSpaceMatrix = Luu.matrix44.multiply(perspectiveMatrix, cameraMatrix);

        let numNgonsRendered = 0;

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
                    const dstPolyElement = svgElement.children[numNgonsRendered++];

                    Luu.rasterize(transformedNgon, dstPolyElement);
                }
            }
        }

        renderCallInfo.numNgonsRendered = numNgonsRendered;

        return;
    }

    function prepare(svgElement, meshesToBeRendered)
    {
        const numNgonsInMeshes = meshesToBeRendered.reduce((ngonCount, mesh)=>(ngonCount += mesh.ngons.length), 0);  
        
        if (svgElement.children.length < numNgonsInMeshes)
        {
            const deltaNgons = (numNgonsInMeshes - svgElement.children.length);

            Luu.log(`Resizing the polygon cache's capacity from ${svgElement.children.length} to ${numNgonsInMeshes}`);
            
            for (let i = 0; i < deltaNgons; i++)
            {
                const polyElement = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
                
                polyElement.setAttribute("fill", "transparent");
                polyElement.setAttribute("pointer-events", "none");

                svgElement.appendChild(polyElement);
            }
        }

        return;
    }
}

Luu.render.defaultOptions = {
    viewPosition: Luu.vector3(0, 0, 0),
    viewRotation: Luu.vector3(0, 1, 0),
    nearPlane: 1,
    farPlane: 1000,
    fov: 43,
};
