from comfy_api.latest import ComfyExtension
from .nodes import LightingPromptPalette

WEB_DIRECTORY = "./web"


class LightingPaletteExtension(ComfyExtension):
    async def get_node_list(self):
        return [LightingPromptPalette]


async def comfy_entrypoint():
    return LightingPaletteExtension()
