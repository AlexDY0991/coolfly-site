# CoolFly 官网

CoolFly 新版官网：静态网站，内容通过 [Pages CMS](https://pagescms.org) 后台编辑，保存后由 GitHub Actions 自动构建发布。

- **运营同事请看：[docs/运营手册.md](docs/运营手册.md)**（后台使用、新闻、落地页、广告追踪、询盘接收）
- 预览网址：https://alexdy0991.github.io/coolfly-site/（已设置不被搜索引擎收录）

## 本地运行

需要 Node.js 18 或更高版本。

```bash
npm install
npm run preview   # 构建并在 http://localhost:4173 预览
npm run build     # 只构建，输出到 dist/
```

## 目录结构

```
content/                 所有可在后台编辑的内容（JSON / Markdown）
  settings.json          追踪代码、表单接收、弹窗、联系方式
  home.json              首页
  aircraft/*.json        三款产品
  news/*.md              新闻（含从旧 WordPress 导入的 48 篇）
  landing/*.md           投放落地页 → /lp/<slug>.html
  pages/*.md             隐私政策等文本页
  dealers.json, company.json, milestones.json, seo.json
.pages.yml               后台配置（菜单、字段、中文标签）
src/
  content.mjs            读取 content/
  partials/              页头、页脚、弹窗、Cookie 横幅、通用组件
  pages/                 页面模板
public/assets/           样式、脚本、字体、图片、视频
scripts/
  build.mjs              构建：生成页面、sitemap.xml、robots.txt、_redirects，压缩大图
  serve.mjs              本地预览服务器
  import-wordpress.mjs   从旧 WordPress 导入新闻（已执行过，重复运行只会补充新文章）
.github/workflows/pages.yml  推送后自动发布到 GitHub Pages（预览）
```

## 构建产物

- 每个页面一个 HTML 文件；新闻在 `news/`，落地页在 `lp/`。
- `sitemap.xml` 和 `robots.txt`。设置了 `SITE_PREVIEW` 时，所有页面都会带上 `noindex`。
- `_redirects`：旧 WordPress 网址到新网址的 301 跳转，Cloudflare Pages 和 Netlify 都能识别。
- 结构化数据：Organization、Product、NewsArticle、FAQPage。

## 追踪与表单

- 在 `content/settings.json` 里填写 `tracking.gtmId` 后，页面会自动加载 GTM，并开启 Google Consent Mode v2：EEA、英国、瑞士默认拒绝，其他地区默认允许，访客可以在横幅里修改。
- 事件通过 `dataLayer` 发送：`generate_lead`、`form_start`、`form_error`、`cta_click`、`email_click`、`popup_open`、`popup_close`、`consent_update`。
- 表单接收方式（`forms.provider`）可选 `none`、`hubspot` 或 `webhook`。每条询盘都会附带 UTM 参数、各平台点击 ID、落地页地址和来源页（referrer）。

## 正式上线

1. 用 Cloudflare Pages（或 Netlify）连接本仓库：构建命令 `npm run build`，输出目录 `dist`，不设置 `SITE_PREVIEW`。
2. 把 `coolflyaircraft.com` 指向新站点，并在 Search Console 提交 sitemap。

上线前需要核实的内容，见运营手册第 11 节。

## 素材

图片和视频取自现有的 coolflyaircraft.com。新闻里的图片在导入时已经统一缩放到 1600px。
