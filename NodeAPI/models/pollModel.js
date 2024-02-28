const mongoose = require('mongoose')

const pollSchema = mongoose.Schema(
    {
        question: {
            type: String,
            required: true
        },
        // questionOwner: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User',
        //     required: true
        // },
        totalVotes: {
            type: Map,
            of: Number,
            default: {},
        },
        options: {
            type: [String],
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;