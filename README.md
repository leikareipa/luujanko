# Luujanko

An SVG wireframe renderer.

You can view interactive render samples [here](https://tarpeeksihyvaesoft.com/experimental/luujanko/samples/).

## Features
- Straightforward API
- Single-file distributable
- No dependencies
- Vanilla JS

![](./screenshots/luujanko-alpha.0.png)
**Level E1M1 from Quake** being rendered by Luujanko. (Based on 3D models produced by id Software for *Quake*. id Software is not associated with Luujanko.)

# User's guide

*(Todo.)*

## Minimal rendering example

```html
<svg id="rendering" width="500" height="500"></svg>

<script type="module">
    const targetSVG = document.getElementById("rendering");

    import {Luu} from "./distributable/luujanko.js";

    const rect = Luu.ngon([Luu.vertex(-1, -1, 3),
                           Luu.vertex( 1, -1, 3),
                           Luu.vertex( 1,  1, 3),
                           Luu.vertex(-1,  1, 3)]);

    const rectMesh = Luu.mesh([rect]);

    Luu.render([rectMesh], targetSVG);
</script>
```

The above HTML/JavaScript code will display a single rectangle rendered by Luujanko in an SVG image of 500 x 500 pixels.

The example can be broken down into the following steps:
1. Create an SVG element to be rendered into.
2. Import the Luujanko renderer from [distributable/luujanko.js](./distributable/luujanko.js).
3. Create a rectangle (via `Luu.ngon()`, standing for *n*-sided polygon) positioned in front of the default Luujanko camera.
4. Create a mesh containing the rectangle.
5. Pass the rectangle mesh into `Luu.render()`, where it gets rendered into the given SVG element.

# Developer's guide

The contents of the repo are organized into directories in the following manner:
- [src/](./src/) - The source code to Luujanko.
- [samples/](./samples/) - Samples of Luujanko in action. Look here for concrete examples of how to render things with Luujanko.
- [distributable/](./distributable/) - Luujanko's source code compiled into a distributable file. This file is built by [build-distributable.sh](./build-distributable.sh).

*(Todo.)*
