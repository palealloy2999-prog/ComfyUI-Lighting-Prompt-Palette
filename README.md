# ComfyUI Lighting Prompt Palette

Choose lighting words visually and output an English prompt string. Includes 55 entries in five categories, each with an original 256×256 WebP thumbnail and English / Japanese labels.

## Installation

Run these commands from the parent directory of your ComfyUI folder:

```sh
cd ComfyUI/custom_nodes
git clone https://github.com/palealloy2999-prog/ComfyUI-Lighting-Prompt-Palette
```

Restart ComfyUI, then refresh the browser with Ctrl+F5. Requires a ComfyUI version supporting `comfy_api.latest` and DOM widgets. No additional runtime dependencies, API keys, or model downloads are needed.

## Usage

Add **PALEALLOY / Prompt → Lighting Prompt Palette**. Browse all categories in one list and click cards to select or deselect them. Use the fixed category buttons to scroll to a heading. Buttons and headings show selected / total counts. Hover over a card to read its Japanese description in a tooltip.

The default layout has five columns with thumbnails. At a node width of 320px or less, it switches to two columns without images; widening the node restores the thumbnails. Selection, deselection, and Clear All notify ComfyUI's change history.

Connect **prompt (STRING)** to a text input, such as CLIP Text Encode with its text widget converted to an input. Use **Clear All** to reset selections.

Selections are joined in click order, in lowercase, separated by commas. Identical tags across categories appear once; `spotlight` and `spot light` remain distinct. Deselecting and reselecting an item moves it to the end. The workflow stores selection IDs, last category anchor, and node size; image data is never embedded.

Example: `god rays, bloom, ray tracing`

Load [the example workflow](example_workflows/lighting_palette.json) to connect the palette to the built-in Preview as Text node.

![Original thumbnail catalog](docs/thumbnails.jpg)

## English descriptions

Japanese descriptions are the default, regardless of ComfyUI's UI language. To use English item labels and descriptions, back up `web/lighting.json`, then copy [launguage/en/lighting.json](launguage/en/lighting.json) over `web/lighting.json` in this node's folder. Restart ComfyUI and refresh the browser with Ctrl+F5.

Selection IDs, prompt tags, categories, and image references remain unchanged. Category buttons and other controls remain bilingual. Restore your backup to return to Japanese descriptions. Updates may replace the customized file; repeat the copy after updating if needed.

## Tags

**Optical Effects / 光学効果 (8):** lens flare, anamorphic flare, starburst, light leak, bokeh, bloom, light streaks, light trails.

**Light Effects / 光の演出 (16):** god rays, volumetric lighting, atmospheric scattering, prism light, caustics, dappled light, glitter, sparkle, sparks, light particles, neon glow, halo, laser beam, light ribbon, radial light burst, light sweep.

**Lighting / 照明 (18):** ambient light, directional light, point light, spot light, area light, spotlight, gobo lighting, emissive lighting, rim lighting, backlighting, soft lighting, hard lighting, low-key lighting, high-key lighting, rembrandt lighting, split lighting, butterfly lighting, negative fill.

**Material / 材質 (3):** fresnel reflection, subsurface scattering, specular.

**Rendering / レンダリング (10):** global illumination, indirect lighting, radiosity, path tracing, ray tracing, light bounce, ambient occlusion, screen space ambient occlusion, hdr lighting, tone mapping.

## Notes

Thumbnails illustrate terminology; tags influence the selected image model and do not configure a renderer. Some techniques, particularly path tracing, ray tracing, and screen space ambient occlusion, cannot be distinguished conclusively from a still image. Prompt output is rebuilt in Python from the JSON catalog; changing selections changes the execution input and cache key.

Catalog: `web/lighting.json`. Static assets live under `web/thumbnails/` so ComfyUI serves them through its extension directory. Generation prompts are in `tools/thumbnail_prompts.json`. Use `tools/resize_thumbnails.py SOURCE_FOLDER` to convert originals named `<item-id>.png`; this development tool and `tools/validate_assets.py` use Pillow.

Developer checks (run with ComfyUI's Python environment and the ComfyUI root on `PYTHONPATH`): `python -m unittest discover -s tests -v`, `node tests/frontend.mjs`, `python tools/validate_assets.py`. The frontend test uses a DOM fixture; it does not establish actual browser or Queue behavior.

See [verification results and runtime limitations](tests/VERIFICATION.md).

[日本語](README_JA.md)
