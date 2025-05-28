const express = require('express');
const { MongoClient } = require('mongodb');
const { marked } = require('marked');
const hljs = require('highlight.js');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB 连接配置
const MONGODB_URI = 'mongodb://localhost:27017';
const DB_NAME = 'flyanima';
const COLLECTION_NAME = 'langchain_docs';

// 配置 marked 使用 highlight.js
marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value;
      } catch (err) {}
    }
    return hljs.highlightAuto(code).value;
  },
  breaks: true,
  gfm: true
});

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB 客户端
let db;

// 连接 MongoDB
async function connectToMongoDB() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);
    console.log('✅ 成功连接到 MongoDB');
  } catch (error) {
    console.error('❌ MongoDB 连接失败:', error);
    process.exit(1);
  }
}

// 路由：主页
app.get('/', async (req, res) => {
  try {
    const collection = db.collection(COLLECTION_NAME);
    const documents = await collection.find({}).limit(20).toArray();
    
    res.render('index', { 
      documents: documents,
      title: 'MongoDB Markdown 文档查看器'
    });
  } catch (error) {
    console.error('获取文档列表失败:', error);
    res.status(500).json({ error: '获取文档列表失败' });
  }
});

// API：获取所有文档列表
app.get('/api/documents', async (req, res) => {
  try {
    const collection = db.collection(COLLECTION_NAME);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const documents = await collection.find({})
      .skip(skip)
      .limit(limit)
      .toArray();
    
    const total = await collection.countDocuments();
    
    res.json({
      documents: documents,
      pagination: {
        page: page,
        limit: limit,
        total: total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('获取文档失败:', error);
    res.status(500).json({ error: '获取文档失败' });
  }
});

// API：根据 ID 获取单个文档
app.get('/api/document/:id', async (req, res) => {
  try {
    const collection = db.collection(COLLECTION_NAME);
    const { ObjectId } = require('mongodb');
    const document = await collection.findOne({ _id: new ObjectId(req.params.id) });
    
    if (!document) {
      return res.status(404).json({ error: '文档未找到' });
    }
    
    // 将 Markdown 转换为 HTML
    if (document.content) {
      document.htmlContent = marked(document.content);
    }
    
    res.json(document);
  } catch (error) {
    console.error('获取文档失败:', error);
    res.status(500).json({ error: '获取文档失败' });
  }
});

// 路由：查看单个文档
app.get('/document/:id', async (req, res) => {
  try {
    const collection = db.collection(COLLECTION_NAME);
    const { ObjectId } = require('mongodb');
    const document = await collection.findOne({ _id: new ObjectId(req.params.id) });
    
    if (!document) {
      return res.status(404).render('error', { 
        error: '文档未找到',
        title: '错误'
      });
    }
    
    // 将 Markdown 转换为 HTML
    if (document.content) {
      document.htmlContent = marked(document.content);
    }
    
    res.render('document', { 
      document: document,
      title: document.title || '文档详情'
    });
  } catch (error) {
    console.error('获取文档失败:', error);
    res.status(500).render('error', { 
      error: '获取文档失败',
      title: '错误'
    });
  }
});

// API：搜索文档
app.get('/api/search', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: '搜索查询不能为空' });
    }
    
    const collection = db.collection(COLLECTION_NAME);
    const documents = await collection.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { url: { $regex: query, $options: 'i' } }
      ]
    }).limit(20).toArray();
    
    res.json({ documents: documents });
  } catch (error) {
    console.error('搜索失败:', error);
    res.status(500).json({ error: '搜索失败' });
  }
});

// 启动服务器
async function startServer() {
  await connectToMongoDB();
  
  app.listen(PORT, () => {
    console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
    console.log(`📚 MongoDB 数据库: ${DB_NAME}`);
    console.log(`📄 集合: ${COLLECTION_NAME}`);
  });
}

startServer().catch(console.error);