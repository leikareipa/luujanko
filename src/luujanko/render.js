/*
 * 2019, 2020 Tarpeeksi Hyvae Soft
 *
 * Software: Luujanko
 * 
 */

"use strict";

{

// Holds a bunch of pre-created SVG <polygon> elements that can be appended into an SVG
// image being rendered.
const polygonElementCache = [];

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

    prepare_cache(polygonElementCache, meshes);
    wipe(targetSVGElement);
    draw(meshes, targetSVGElement);

    renderCallInfo.totalRenderTimeMs = (performance.now() - renderCallInfo.totalRenderTimeMs);

    return renderCallInfo;

    function wipe(svgElement)
    {
        while (svgElement.lastChild)
        {
            svgElement.removeChild(svgElement.lastChild);
        }

        return;
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
                    Luu.assert && (numNgonsRendered < polygonElementCache.length)
                               || Luu.throw("Overflowing the polygon element cache.");
                               
                    const dstPolyElement = polygonElementCache[numNgonsRendered];

                    Luu.rasterize(transformedNgon, dstPolyElement, svgElement);

                    numNgonsRendered++;
                }
            }
        }

        renderCallInfo.numNgonsRendered = numNgonsRendered;

        return;
    }

    function prepare_cache(cache, meshesToBeRendered)
    {
        const numNgonsInMeshes = meshesToBeRendered.reduce((ngonCount, mesh)=>(ngonCount += mesh.ngons.length), 0);  
        
        if (cache.length < numNgonsInMeshes)
        {
            const deltaNgons = (numNgonsInMeshes - cache.length);

            Luu.log(`Resizing the polygon cache's capacity from ${cache.length} to ${numNgonsInMeshes}`);
            
            for (let i = 0; i < deltaNgons; i++)
            {
                const newElement = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

                newElement.setAttribute("fill", "transparent");
                newElement.setAttribute("pointer-events", "none");

                cache.push(newElement);
            }
        }

        return;
    }
}

Luu.render.defaultOptions = {
    viewPosition: Luu.vector3(0, 0, 0),
    viewRotation: Luu.vector3(0, 0, 0),
    nearPlane: 1,
    farPlane: 1000,
    fov: 43,
};

}
