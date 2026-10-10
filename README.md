# CoolFly 官网（新版前端）

CoolFly 官网的重新设计版本，纯静态前端，不依赖任何第三方库或后端服务。

设计思路：整体框架参考 Pivotal 的航空质感（全屏实拍飞行画面、留白、精确参数），产品展示借用 XREAL 的手法（产品阵列、大数字），另外单独搭建经销商招募板块。网站语言为英文，面向海外经销商和客户。

## 页面

| 文件 | 内容 |
| --- | --- |
| `index.html` | 首页：飞行视频、公司实力、三款产品、安全、应用场景、法规与培训、展会、经销商招募、新闻 |
| `urban.html` / `dream-st.html` / `dream-pro.html` | 产品页，由同一个模板加 `src/data/aircraft.mjs` 中的数据生成 |
| `compare.html` | 三款产品参数对比和选型建议 |
| `safety.html` | 安全设计四个层次、各市场法规、保险与 CE/FCC 声明 |
| `dealers.html` | 经销商招募：合作理由、招募区域、厂家支持、合作流程、申请表、常见问题 |
| `company.html` | 公司介绍、CEO 寄语、发展时间线、办公室、新闻 |
| `contact.html` | 按业务分流的联系方式和联系表单 |
| `404.html` | 找不到页面 |

## 使用方法

需要 Node.js 18 或更高版本，无需安装任何依赖。

```bash
npm run build     # 生成 dist/ 目录，可以直接部署到任何静态托管服务
npm run preview   # 构建后在 http://localhost:4173 本地预览
```

`dist/` 里是最终的静态文件，可以上传到 Netlify、Vercel、Cloudflare Pages、阿里云 OSS 或任何网页服务器。

## 目录结构

```
src/
  data/aircraft.mjs   三款产品的全部文案和参数（产品页、对比页、首页共用）
  data/site.mjs       导航、联系方式、办公室、新闻、时间线
  partials/           页头、页脚和通用组件
  pages/              每个页面一个文件
public/
  assets/css/site.css 全站样式
  assets/js/site.js   菜单、视频、标签切换、表单
  assets/img, video   图片和视频（取自现有官网素材）
  assets/fonts        自托管字体（Archivo、Instrument Sans、JetBrains Mono，均为 OFL 授权）
scripts/build.mjs     构建脚本
```

修改产品参数或文案时，只需要改 `src/data/` 里的文件，然后重新运行 `npm run build`。

## 表单

经销商申请表和联系表单目前**没有连接后端**。访客提交时，表单会先检查必填项，然后提示"表单尚未连接，请直接发邮件"。

接入方法：在 `public/assets/js/site.js` 顶部的 `FORM_ENDPOINTS` 里填入接收地址（例如 Formspree、HubSpot、飞书表单的 webhook，或自建接口）。表单会以 JSON 格式 POST 过去。

## 上线前需要 CoolFly 核实的内容

代码里所有需要核实的地方都用 `// confirm:` 注释标出了。

1. **Urban 的最大起飞重量**：现有官网写的是 254 kg，按 90 kg 载重推算空机约 164 kg，远超美国 Part 103 的 254 磅（约 115 kg）上限，很可能是单位写错了。新网站暂时没有显示这一项。
2. **Dream PRO 的合规类别**：重量 ≤147 kg，超过 Part 103 的空机重量上限，需要说明它在各市场按什么类别销售。
3. **交付时间**：新网站没有写具体的交付年份。确认统一口径后再加。
4. **产品图对应关系**：Dream ST 用的是橙色机型图，Dream PRO 用的是黑色机型图，请确认是否对应正确。Dream PRO 页面的主图是白色 Dream 的飞行画面。
5. **经销商支持内容**：`dealers.html` 里"What partners receive"的六项支持（培训、教练认证、样机、备件、市场物料、法规指导）是根据行业惯例起草的，需要商务团队确认。
6. **常见问题中的政策描述**：例如"来自经销商区域的客户询盘会转给经销商"，需要确认。
7. **巴黎和巴西办公室的地址**：现有官网只写了城市名。
8. **Facebook 和 YouTube 账号**：现有官网上没有找到可用的链接，目前页脚只放了 LinkedIn 和 Instagram。

## 素材说明

图片和视频全部取自现有的 coolflyaircraft.com。我们有意没有使用现有新闻稿里由 AI 生成的场景图，以免和"真实飞行器，不是概念图"的定位相矛盾。
