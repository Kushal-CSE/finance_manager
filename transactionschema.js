const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    itemName: { type: String, required: true },  // ✅ Renamed from 'description' to match frontend
    itemCost: { type: Number, required: true },  // ✅ Matches frontend 'itemCost'
    gainSpent: { type: String, enum: ['gain', 'spent'], required: true },  // ✅ Matches radio button
    balance: { type: Number, required: true },  // ✅ Used for tracking balance changes
    date: { type: Date, required: true } // ✅ Must be manually provided instead of defaulting to now
});

module.exports = mongoose.model('Transaction', transactionSchema);
