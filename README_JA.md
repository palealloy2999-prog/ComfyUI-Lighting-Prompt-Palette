[English](README.md)

# ComfyUI Lighting Prompt Palette

画像からライティング用語を選び、英語プロンプトをSTRINGで出力するノードです。5カテゴリ・55項目に、新規生成した256×256 WebP画像と英語・日本語ラベルを用意しています。

<img width="586" height="657" alt="image" src="https://github.com/user-attachments/assets/02d1dd94-6870-420c-8041-c9ab1afc749c" />

## インストール

ComfyUIフォルダーの親ディレクトリから、次のコマンドを実行します。

```sh
cd ComfyUI/custom_nodes
git clone https://github.com/palealloy2999-prog/ComfyUI-Lighting-Prompt-Palette
```

インストール後はComfyUIを再起動し、ブラウザーをCtrl＋F5で更新します。

## 使い方

**PALEALLOY / Prompt → Lighting Prompt Palette** を追加します。全カテゴリを連続した一覧で表示し、カードのクリックで選択・解除します。上部固定のカテゴリボタンで各見出しへ移動でき、ボタンと見出しには「選択数／項目数」を表示します。カードにマウスを重ねると、説明文をツールチップで表示します。

通常はサムネイル付きの5列表示です。ノード幅が320px以下になると画像を隠した2列表示へ切り替わり、幅を広げると元に戻ります。

**prompt (STRING)** を、入力に変換したCLIP Text Encodeのtextなどへ接続します。**Clear All / 全解除** で選択をリセットできます。

選択順に小文字の英語タグをカンマで結合します。カテゴリ間で同じタグは1回だけ出力し、`spotlight` と `spot light` は別の用語として保持します。解除して再選択すると末尾へ移動します。選択ID・最後に移動したカテゴリ・ノードサイズはワークフローへ保存し、画像データは埋め込みません。

出力例: `god rays, bloom, ray tracing`

[サンプルワークフロー](example_workflows/lighting_palette.json) は、標準のPreview as Textノードへ接続する例です。



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

サムネイルは用語の参考例です。タグの効果は画像生成モデルに依存し、レンダラーの設定を変更するものではありません。

