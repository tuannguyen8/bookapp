const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TokenSchema = new Schema(
    {
        userId:{
            type: Schema.Types.ObjectId,
            //required: true,
            ref: "User",
        },
        token: {
            type: String,
            //required: true,
        },
    },
    {
        collection: "nb-tokens",
        timestamps: true,
    }
);
//đánh index ở field createdAt (timestamps)
//Như vậy trong collectionc có 2 cái index, 1 cái index là _id, 1 cái index là createdAt
TokenSchema.index({ createdAt: 1 } , {expireAfterSeconds: +process.env.TOKEN_EXPIRED})
//TokenSchema.index({ createdAt: 1 } , {expireAfterSeconds: 300})
module.exports = mongoose.model("Token", TokenSchema);