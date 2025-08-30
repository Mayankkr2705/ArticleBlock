const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    articleId: { type: Schema.Types.ObjectId, ref: 'Article', required: true, index: true }, // target article
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },     // owner
    content: { type: String, required: true, maxlength: 2000 },                               // text body
    parentId: { type: Schema.Types.ObjectId, ref: 'Comment', default: null, index: true },    // for replies
    repliesCount: { type: Number, default: 0 },                                               // denormalized count
    isEdited: { type: Boolean, default: false },                                              // flag if updated
    deletedAt: { type: Date, default: null },                                                 // soft delete
  },
  { timestamps: true }
);

// Helpful indexes
CommentSchema.index({ articleId: 1, createdAt: -1 }); // paginate comments for an article
CommentSchema.index({ articleId: 1, parentId: 1, createdAt: 1 }); // fetch a thread in order

export default model('Comment', CommentSchema);
