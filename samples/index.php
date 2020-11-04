<!DOCTYPE html>
<html>
    <head>
        <title>Render samples - Luujanko</title>
        <style>
            :root
            {
                --header-height: 47px;
            }
            body
            {
                background-color: white;
                color: black;
                overflow-y: hidden;
                margin: 0;
                padding: 0;
                height: 100vh;
                font-family: sans-serif;
            }

            #header
            {
                display: flex;
                box-sizing: border-box;
                position: relative;
                z-index: 1;
                width: 100%;
                height: var(--header-height);
                background-color: white;
                color: lightgray;
                border-bottom: 1px solid lightgray;
            }

            .selector-container
            {
                height: 100%;
                display: flex;
                align-items: center;
                background-color: white;
                width: 50%;
            }

            .selector-container select
            {
                height: var(--header-height);
                border: none;
                background-color: white;
                color: black;
                border-radius: 0;
                padding: 6px;
                outline: none;
                flex-basis: 100%;
                font-family: sans-serif;
                font-size: 100%;
                border-bottom: 1px solid lightgray;
                border-left: 1px solid lightgray;
            }

            .selector-container .selector-tag
            {
                padding: 14px;
                background-color: transparent;
                border: none;
                color: black;
                white-space: nowrap;
                font-weight: bold;
            }

            #content
            {
                position: relative;
                z-index: 0;
                margin: 0;
                padding: 0;
                border: none;
                width: 100%;
                height: calc(100% - var(--header-height));
            }
        </style>
    </head>
    <body>
        <div id="header">
            <div id="sample-selector-container"
                 class="selector-container"
                 style="width: 100%;">
                <div class="selector-tag">Sample</div>
                <select id="sample-selector"
                        style="min-width: 150px;"
                        onchange="set_sample(event.target.value);">
                    <optgroup label="Simple"></optgroup>
                    <option value="rotating-triangle">Rotating triangle</option>
                    <option value="rotating-cube-model">Rotating cube model</option>
                    <optgroup label="Ideas"></optgroup>
                    <option value="first-person-camera">First-person camera</option>
                    <?php if (is_file("./extra-samples.php")) include("./extra-samples.php");?>
                </select>
            </div>
        </div>
        <iframe id="content"></iframe>
    </body>

    <script>
        const defaultSample = "<?php echo (is_file("./extra-samples.php")? "quake-e1m1" : "rotating-cube-model");?>";

        const urlParams = new URLSearchParams(window.location.search);
        const sample = (urlParams.get("sample") || defaultSample);

        const sampleSelectorContainer = document.getElementById("sample-selector-container");
        const sampleSelector = document.getElementById("sample-selector");

        if (!Array.from(sampleSelector.options).map(o=>o.value).includes(sample))
        {
            urlParams.set("sample", defaultSample);
            window.location.search = urlParams.toString();
        }
        else
        {
            sampleSelector.value = sample;
            document.getElementById("content").src = `./${sample}/`;
        }

        function set_sample(newTestName)
        {
            urlParams.set("sample", newTestName);
            window.location.search = urlParams.toString();
        }
    </script>
</html>
