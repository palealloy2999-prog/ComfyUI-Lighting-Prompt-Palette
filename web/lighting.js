import { app } from "../../scripts/app.js";

const base = new URL(".", import.meta.url);
const catalog = fetch(new URL("lighting.json", base)).then(response => {
    if (!response.ok) throw new Error(`Lighting catalog: ${response.status}`);
    return response.json();
});
const style = document.createElement("link");
style.rel = "stylesheet";
style.href = new URL("lighting.css", base).href;
document.head.append(style);

function createPalette(node) {
    const selected = node.widgets.find(widget => widget.name === "selected");
    selected.type = "converted-widget";
    selected.computeSize = () => [0, -4];
    selected.draw = () => {};
    const root = document.createElement("div");
    root.className = "lighting-palette";
    const navigation = document.createElement("nav");
    navigation.className = "lp-nav";
    navigation.setAttribute("aria-label", "Categories / カテゴリへ移動");
    const grid = document.createElement("div");
    grid.className = "lp-grid";
    const footer = document.createElement("div");
    footer.className = "lp-footer";
    const count = document.createElement("span");
    const clear = document.createElement("button");
    clear.textContent = "Clear All / 全解除";
    const preview = document.createElement("textarea");
    preview.readOnly = true;
    preview.setAttribute("aria-label", "Prompt preview / プロンプト");
    footer.append(count, clear);
    root.append(navigation, grid, footer, preview);
    const events = new AbortController();
    let items = [], ids = [], removed = false;
    let categories = [];
    const cards = new Map();
    const headings = new Map();
    let scrollFrame = 0;
    const categoryLabels = {
        optical_effects: "Optical Effects / 光学効果",
        light_effects: "Light Effects / 光の演出",
        lighting: "Lighting / 照明",
        material: "Material / 材質",
        rendering: "Rendering / レンダリング",
    };
    node.properties ??= {};
    function category() {
        const saved = node.properties.lighting_category;
        return categories.includes(saved) ? saved : categories[0];
    }
    function refresh() {
        const chosen = new Set(ids);
        for (const card of cards.values()) {
            const active = chosen.has(card.dataset.id);
            card.classList.toggle("selected", active);
            card.setAttribute("aria-pressed", String(active));
        }
        for (const button of navigation.children) {
            const key = button.dataset.category;
            const entries = items.filter(item => item.category === key);
            const selectedCount = entries.filter(item => chosen.has(item.id)).length;
            const label = `${categoryLabels[key] ?? key.replaceAll("_", " ")} (${selectedCount}/${entries.length})`;
            button.textContent = label;
            button.setAttribute("aria-current", key === category() ? "location" : "false");
            headings.get(key).textContent = label;
        }
        const byId = new Map(items.map(item => [item.id, item.prompt]));
        preview.value = [...new Set(ids.map(id => byId.get(id)).filter(Boolean))].join(", ");
        count.textContent = `Selected / 選択: ${ids.length}`;
    }
    function restore() {
        try { ids = JSON.parse(selected.value); } catch { ids = []; }
        if (!Array.isArray(ids)) ids = [];
        const canonical = new Map(items.flatMap(item => [item.id, ...(item.aliases ?? [])].map(id => [id, item.id])));
        ids = [...new Set(ids.map(id => canonical.get(id)).filter(Boolean))];
        render();
    }
    function commit() {
        const value = JSON.stringify(ids);
        if (value === selected.value) return;
        const graph = node.graph;
        graph?.beforeChange();
        try {
            selected.value = value;
            selected.callback?.(value);
            graph?.change();
            node.setDirtyCanvas(true, true);
            refresh();
        } finally {
            graph?.afterChange();
        }
    }
    function render() {
        grid.replaceChildren();
        cards.clear();
        headings.clear();
        for (const key of categories) {
            const heading = document.createElement("h3");
            heading.className = "lp-heading";
            headings.set(key, heading);
            grid.append(heading);
            for (const item of items.filter(item => item.category === key)) {
                const card = document.createElement("button");
                card.className = "lp-card";
                card.dataset.id = item.id;
                card.title = `${item.name}${item.name_ja ? ` / ${item.name_ja}` : ""}\n${item.description}`;
                const image = document.createElement("img");
                image.src = new URL(`thumbnails/${item.image}`, base).href;
                image.alt = item.name;
                image.loading = "lazy";
                image.width = image.height = 256;
                image.draggable = false;
                image.onload = () => image.classList.add("loaded");
                image.onerror = () => { image.hidden = true; card.title += " — Image unavailable / 画像未読込"; };
                const name = document.createElement("strong");
                name.textContent = item.name;
                card.append(image, name);
                if (item.name_ja) {
                    const ja = document.createElement("small");
                    ja.textContent = item.name_ja;
                    card.append(ja);
                }
                grid.append(card);
                cards.set(item.id, card);
            }
        }
        refresh();
        cancelAnimationFrame(scrollFrame);
        scrollFrame = requestAnimationFrame(() => {
            if (!removed) jumpToCategory(category(), "instant");
        });
    }
    function jumpToCategory(key, behavior) {
        const heading = headings.get(key);
        if (heading) grid.scrollTo({ top: heading.offsetTop, behavior });
    }
    root.addEventListener("pointerdown", event => event.stopPropagation(), { signal: events.signal });
    root.addEventListener("wheel", event => event.stopPropagation(), { signal: events.signal });
    navigation.addEventListener("click", event => {
        const button = event.target.closest("button");
        if (!button) return;
        node.properties.lighting_category = button.dataset.category;
        jumpToCategory(button.dataset.category, "smooth");
        refresh();
        node.graph?.change();
    }, { signal: events.signal });
    grid.addEventListener("click", event => {
        const card = event.target.closest(".lp-card");
        if (!card) return;
        const id = card.dataset.id;
        ids = ids.includes(id) ? ids.filter(value => value !== id) : [...ids, id];
        commit();
    }, { signal: events.signal });
    clear.addEventListener("click", () => { ids = []; commit(); }, { signal: events.signal });
    const display = node.addDOMWidget("lighting_palette", "lighting_palette", root, {
        serialize: false, hideOnZoom: false,
        getMinHeight: () => 420,
    });
    display.serialize = false;
    node.size = [390, 650];
    const resize = node.onResize;
    const thumbCutOffSize = 320;
    node.onResize = function (size, ...args) {
        const result = resize?.call(this, size, ...args);
        root.classList.toggle('lp-compact', size[0] <= thumbCutOffSize)
        return result;
    };
    const configure = node.onConfigure;
    node.onConfigure = function (...args) {
        const result = configure?.apply(this, args);
        root.classList.toggle('lp-compact', node.size[0] <= thumbCutOffSize);
        restore();
        return result;
    };
    const onRemoved = node.onRemoved;
    node.onRemoved = function (...args) {
        removed = true;
        cancelAnimationFrame(scrollFrame);
        events.abort();
        return onRemoved?.apply(this, args);
    };
    catalog.then(data => {
        if (removed) return;
        items = data;
        categories = [...new Set(items.map(item => item.category))];
        for (const key of categories) {
            const button = document.createElement("button");
            button.dataset.category = key;
            navigation.append(button);
        }
        restore();
    }).catch(error => {
        if (!removed) grid.textContent = `Catalog unavailable / 一覧を読み込めません: ${error.message}`;
    });
}

app.registerExtension({
    name: "PALEALLOY.LightingPromptPalette",
    nodeCreated(node) {
        if (node.comfyClass === "LightingPromptPalette") createPalette(node);
    },
});
