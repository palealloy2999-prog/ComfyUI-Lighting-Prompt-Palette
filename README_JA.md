# ComfyUI Lighting Prompt Palette

画像からライティング用語を選び、英語プロンプトをSTRINGで出力するノードです。5カテゴリ・55項目に、新規生成した256×256 WebP画像と英語・日本語ラベルを用意しています。

## インストール

ComfyUIフォルダーの親ディレクトリから、次のコマンドを実行します。

```sh
cd ComfyUI/custom_nodes
git clone https://github.com/palealloy2999-prog/ComfyUI-Lighting-Prompt-Palette
```

インストール後はComfyUIを再起動し、ブラウザーをCtrl＋F5で更新します。`comfy_api.latest` とDOMウィジェットに対応するComfyUIが必要です。追加の実行時依存、APIキー、モデルのダウンロードは不要です。

## 使い方

**PALEALLOY / Prompt → Lighting Prompt Palette** を追加します。全カテゴリを連続した一覧で表示し、カードのクリックで選択・解除します。上部固定のカテゴリボタンで各見出しへ移動でき、ボタンと見出しには「選択数／項目数」を表示します。カードにマウスを重ねると、日本語の説明文をツールチップで表示します。

通常はサムネイル付きの5列表示です。ノード幅が320px以下になると画像を隠した2列表示へ切り替わり、幅を広げると元に戻ります。カードの選択・解除と全解除はComfyUIの変更履歴へ通知します。

**prompt (STRING)** を、入力に変換したCLIP Text Encodeのtextなどへ接続します。**Clear All / 全解除** で選択をリセットできます。

選択順に小文字の英語タグをカンマで結合します。カテゴリ間で同じタグは1回だけ出力し、`spotlight` と `spot light` は別の用語として保持します。解除して再選択すると末尾へ移動します。選択ID・最後に移動したカテゴリ・ノードサイズはワークフローへ保存し、画像データは埋め込みません。

出力例: `god rays, bloom, ray tracing`

[サンプルワークフロー](example_workflows/lighting_palette.json) は、標準のPreview as Textノードへ接続する例です。

![新規生成サムネイル一覧](docs/thumbnails.jpg)

## 英語の説明文に切り替える

説明文はComfyUI本体の言語設定に関係なく、標準では日本語です。英語の項目名・説明文を使う場合は、このノードのフォルダー内にある `web/lighting.json` をバックアップし、[launguage/en/lighting.json](launguage/en/lighting.json) を `web/lighting.json` へ上書きコピーしてください。ComfyUIを再起動し、ブラウザーをCtrl＋F5で更新すると反映されます。

選択ID・出力タグ・カテゴリ・画像参照は変わりません。カテゴリボタンなどの操作部分は日英併記のままです。日本語に戻す場合はバックアップを復元してください。更新時に差し替えたファイルが置き換わる場合があるため、必要に応じて更新後に再コピーしてください。

## タグ一覧

**Optical Effects / 光学効果 (8):** lens flare, anamorphic flare, starburst, light leak, bokeh, bloom, light streaks, light trails.

**Light Effects / 光の演出 (16):** god rays, volumetric lighting, atmospheric scattering, prism light, caustics, dappled light, glitter, sparkle, sparks, light particles, neon glow, halo, laser beam, light ribbon, radial light burst, light sweep.

**Lighting / 照明 (18):** ambient light, directional light, point light, spot light, area light, spotlight, gobo lighting, emissive lighting, rim lighting, backlighting, soft lighting, hard lighting, low-key lighting, high-key lighting, rembrandt lighting, split lighting, butterfly lighting, negative fill.

**Material / 材質 (3):** fresnel reflection, subsurface scattering, specular.

**Rendering / レンダリング (10):** global illumination, indirect lighting, radiosity, path tracing, ray tracing, light bounce, ambient occlusion, screen space ambient occlusion, hdr lighting, tone mapping.

## 注意事項

サムネイルは用語の参考例です。タグの効果は画像生成モデルに依存し、レンダラーの設定を変更するものではありません。特にpath tracing・ray tracing・screen space ambient occlusionなどの技法は、静止画像だけで厳密には識別できません。出力文字列はJSON定義を基にPython側で確定します。選択変更は実行入力とキャッシュキーに反映されます。

定義は `web/lighting.json`、画像はComfyUIの拡張ディレクトリ配信を利用する `web/thumbnails/` にあります。生成プロンプトは `tools/thumbnail_prompts.json` に保存しています。`tools/resize_thumbnails.py 元画像フォルダー` で `<項目ID>.png` を変換できます。この開発用ツールと `tools/validate_assets.py` はPillowを使用します。

開発用検証（ComfyUIのPython環境を使用し、ComfyUIルートを `PYTHONPATH` に指定）: `python -m unittest discover -s tests -v`、`node tests/frontend.mjs`、`python tools/validate_assets.py`。フロントエンド検証はDOMフィクスチャを用いる単体検証であり、実ブラウザーやQueueの動作を証明するものではありません。

[検証結果と実行環境の制約](tests/VERIFICATION.md) も参照してください。

[English](README.md)
