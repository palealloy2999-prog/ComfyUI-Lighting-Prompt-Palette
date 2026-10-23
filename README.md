[日本語](README_JA.md)

# ComfyUI Lighting Prompt Palette

Choose lighting words visually and output an English prompt string. Includes 55 entries in five categories, each with an original 256×256 WebP thumbnail and English / Japanese labels.

<img width="586" height="657" alt="image" src="https://github.com/user-attachments/assets/02d1dd94-6870-420c-8041-c9ab1afc749c" />

## Installation

Run these commands from the parent directory of your ComfyUI folder:

```sh
cd ComfyUI/custom_nodes
git clone https://github.com/palealloy2999-prog/ComfyUI-Lighting-Prompt-Palette
```

Restart ComfyUI, then refresh the browser with Ctrl+F5.

## Usage

Add **PALEALLOY / Prompt → Lighting Prompt Palette**. Browse all categories in one list and click cards to select or deselect them. Use the fixed category buttons to scroll to a heading. Buttons and headings show selected / total counts. Hover over a card to read its description in a tooltip.

The default layout has five columns with thumbnails. At a node width of 320px or less, it switches to two columns without images; widening the node restores the thumbnails.

Connect **prompt (STRING)** to a text input, such as CLIP Text Encode with its text widget converted to an input. Use **Clear All** to reset selections.

Selections are joined in click order, in lowercase, separated by commas. Identical tags across categories appear once; `spotlight` and `spot light` remain distinct. Deselecting and reselecting an item moves it to the end. The workflow stores selection IDs, last category anchor, and node size; image data is never embedded.

Example: `god rays, bloom, ray tracing`

Load [the example workflow](example_workflows/lighting_palette.json) to connect the palette to the built-in Preview as Text node.

## English descriptions

Japanese descriptions are the default, regardless of ComfyUI's UI language. To use English item labels and descriptions, back up `web/lighting.json`, then copy [language/en/lighting.json](language/en/lighting.json) over `web/lighting.json` in this node's folder. Restart ComfyUI and refresh the browser with Ctrl+F5.

Selection IDs, prompt tags, categories, and image references remain unchanged. Category buttons and other controls remain bilingual. Restore your backup to return to Japanese descriptions. Updates may replace the customized file; repeat the copy after updating if needed.

## Tags

**Optical Effects / 光学効果 (8):** lens flare, anamorphic flare, starburst, light leak, bokeh, bloom, light streaks, light trails.

**Light Effects / 光の演出 (16):** god rays, volumetric lighting, atmospheric scattering, prism light, caustics, dappled light, glitter, sparkle, sparks, light particles, neon glow, halo, laser beam, light ribbon, radial light burst, light sweep.

**Lighting / 照明 (18):** ambient light, directional light, point light, spot light, area light, spotlight, gobo lighting, emissive lighting, rim lighting, backlighting, soft lighting, hard lighting, low-key lighting, high-key lighting, rembrandt lighting, split lighting, butterfly lighting, negative fill.

**Material / 材質 (3):** fresnel reflection, subsurface scattering, specular.

**Rendering / レンダリング (10):** global illumination, indirect lighting, radiosity, path tracing, ray tracing, light bounce, ambient occlusion, screen space ambient occlusion, hdr lighting, tone mapping.

## Notes

Thumbnails illustrate terminology; tags influence the selected image model and do not configure a renderer.
