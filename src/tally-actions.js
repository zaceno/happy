import $ from './dispatch-tally'

const ResetVotes = $(_ => ({ num: 0, tot: 0 }))

const CommitVote = $(({ num, tot }, vote) => ({
    num: num + 1,
    tot: tot + vote,
}))

const Init = ResetVotes

export { ResetVotes, CommitVote, Init }
