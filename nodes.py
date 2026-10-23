import json
from pathlib import Path

from comfy_api.latest import io

ITEMS = json.loads((Path(__file__).parent / "web" / "lighting.json").read_text(encoding="utf-8"))
TAGS = {key: item["prompt"] for item in ITEMS for key in [item["id"], *item.get("aliases", [])]}


def build_prompt(selected):
    try:
        ids = json.loads(selected)
    except (json.JSONDecodeError, TypeError):
        return ""
    if not isinstance(ids, list):
        return ""
    return ", ".join(dict.fromkeys(TAGS[key] for key in ids if isinstance(key, str) and key in TAGS))


class LightingPromptPalette(io.ComfyNode):
    @classmethod
    def define_schema(cls):
        return io.Schema(
            node_id="LightingPromptPalette",
            display_name="Lighting Prompt Palette",
            category="PALEALLOY / Prompt",
            inputs=[io.String.Input("selected", default="[]", socketless=True)],
            outputs=[io.String.Output("prompt")],
        )

    @classmethod
    def execute(cls, selected="[]"):
        return io.NodeOutput(build_prompt(selected))
