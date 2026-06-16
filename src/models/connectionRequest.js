const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId
    },
    status:{
        type: String,
        enum: {
            values: ['ignore', 'accepted', 'rejected', 'interested'],
            message: `{VALUE} is not a valid status`
        }
    },
    
},
    {
        timestamps: true
    }
);

connectionRequestSchema.index({fromUserId: 1, toUserId: 1}, {unique: true});

connectionRequestSchema.pre('save', async function(next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("You can't send a connection request to yourself");
    }
    next();
});

const ConnectionRequest = mongoose.model('ConnectionRequest',connectionRequestSchema);

module.exports = ConnectionRequest;