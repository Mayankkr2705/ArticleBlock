const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    contentHtml: { type: String, required: true }, // from TinyMCE
    featuredImage: { type: String }, 
    status: { type: String, enum: ['draft','published'], default: 'draft', index: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Article', ArticleSchema);
