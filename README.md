# MongoDB Markdown 文档查看器

## 🆕 UI 升级亮点 (2024 最新版)

### 🎨 现代化年轻人界面
- **🌌 深色主题**: 时尚的深蓝色背景配色
- **💜 渐变设计**: 紫蓝渐变主色调，高级感十足
- **✨ 玻璃拟态**: Glassmorphism 效果，透明模糊背景
- **🌟 霓虹发光**: 边框和按钮的发光效果

### 🎮 炫酷交互动画
- **🔮 粒子系统**: 动态粒子背景动画
- **📝 打字机效果**: 标题逐字显示动画
- **🃏 3D 卡片**: 鼠标悬停卡片倾斜效果
- **💥 粒子爆炸**: 代码复制成功的特效
- **🌊 波纹效果**: 按钮点击波纹动画

### 🚀 用户体验优化
- **🔍 发光搜索**: 搜索框聚焦发光效果
- **🎨 关键词高亮**: 搜索结果彩色高亮
- **📱 响应式设计**: 完美适配移动设备
- **⚡ 流畅动画**: 60fps 硬件加速动画

## 📖 内容可视化优化 (新增)

### 📚 文档详情页面重构
- **🎯 清晰信息卡片**: 结构化的文档元数据展示
- **🎨 悬停交互效果**: 美观的信息项动画
- **🏷️ 彩色标签系统**: 类型和章节的视觉标识
- **🔗 优雅链接样式**: 外部链接的视觉增强

### 📝 Markdown 渲染优化
- **🌟 渐变标题**: 多层次的标题视觉效果
- **📏 完美排版**: 合理的行间距和字体层级
- **💫 动态链接**: 炫酷的链接悬停动画
- **📖 增强引用**: 带引号的视觉引用块
- **✨ 文本高亮**: 强调和斜体的特殊效果
- **💫 分隔线**: 渐变色的分隔线样式

### 🔧 代码展示优化
- **🌙 深色主题**: GitHub Dark 代码高亮
- **📋 复制功能**: 一键复制带动画反馈
- **🎨 玻璃效果**: 代码块的现代化样式
- **💾 专业字体**: JetBrains Mono 等宽字体
- **🔥 语法增强**: 更清晰的代码着色

---

一个基于 Web 的 MongoDB Markdown 文档可视化工具，使用现代化技术将数据库中的 Markdown 文档以美观的方式展示出来。

## 🌟 功能特性

- 📚 **文档列表展示**：以卡片形式展示所有 Markdown 文档
- 🔍 **实时搜索**：支持标题、内容、URL 的全文搜索
- 📖 **Markdown 渲染**：完美渲染 Markdown 格式，支持代码高亮
- 📱 **响应式设计**：适配桌面和移动设备
- 🎨 **现代化 UI**：基于 Bootstrap 5 的美观界面
- ⚡ **高性能**：快速加载和搜索
- 🔗 **外部链接**：自动识别并标记外部链接
- 📊 **阅读体验**：目录导航、进度指示、全屏阅读

## 🛠️ 技术栈

- **后端**: Node.js + Express
- **数据库**: MongoDB
- **前端**: Bootstrap 5 + Vanilla JavaScript
- **模板引擎**: EJS
- **Markdown 解析**: marked.js
- **代码高亮**: highlight.js

## 📋 系统要求

- Node.js >= 16.0.0
- MongoDB >= 4.0
- 现代浏览器（Chrome、Firefox、Safari、Edge）

## 🚀 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/flyanima/markdown-viewer.git
cd markdown-viewer
```

### 2. 安装依赖

```bash
npm install
```

### 3. 确保 MongoDB 运行

```bash
# 检查 MongoDB 状态
ps aux | grep mongod

# 如果未运行，启动 MongoDB
mongod --config /path/to/your/mongod.conf
```

### 4. 启动应用

```bash
# 生产模式
npm start

# 开发模式（需要安装 nodemon）
npm run dev
```

### 5. 访问应用

打开浏览器访问：http://localhost:3000

## 📊 数据库配置

应用默认连接到以下 MongoDB 配置：

- **主机**: localhost
- **端口**: 27017
- **数据库**: flyanima
- **集合**: langchain_docs

如需修改配置，请编辑 `server.js` 文件中的以下变量：

```javascript
const MONGODB_URI = 'mongodb://localhost:27017';
const DB_NAME = 'flyanima';
const COLLECTION_NAME = 'langchain_docs';
```

## 🎯 主要功能

### 文档列表页面
- 显示所有文档的卡片视图
- 每个卡片包含标题、URL、内容预览、类型标签
- 支持点击查看详情

### 文档详情页面
- **📊 信息展示**: 清晰的文档元数据卡片
- **📖 内容渲染**: 优化的 Markdown 显示效果
- **🎯 导航功能**: 自动生成的目录导航
- **📊 阅读辅助**: 进度指示器和全屏模式
- **🔧 实用工具**: 代码复制和打印功能

### 搜索功能
- 实时搜索（输入时自动搜索）
- 支持标题、内容、URL 搜索
- 搜索结果高亮显示
- 搜索历史保持

## 🎨 界面预览

### 主页面
- 现代化深色主题
- 玻璃拟态效果
- 响应式卡片布局
- 实时搜索功能

### 文档详情页
- 优化的 Markdown 渲染
- 代码语法高亮
- 自动生成目录
- 阅读进度指示

## 🔧 开发

### 项目结构

```
markdown-viewer/
├── server.js          # 主服务器文件
├── package.json       # 项目依赖
├── views/             # EJS 模板
│   ├── index.ejs     # 主页模板
│   ├── document.ejs  # 文档详情模板
│   └── error.ejs     # 错误页面模板
├── public/           # 静态资源
│   ├── css/         # 样式文件
│   └── js/          # JavaScript 文件
└── README.md        # 项目说明
```

### API 端点

- `GET /` - 主页面
- `GET /document/:id` - 文档详情页面
- `GET /api/documents` - 获取文档列表 API
- `GET /api/document/:id` - 获取单个文档 API
- `GET /api/search?q=keyword` - 搜索文档 API

## 📝 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系

如有问题，请通过 GitHub Issues 联系。