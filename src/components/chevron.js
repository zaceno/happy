const Icon = require('./icon')
module.exports = ({direction}) => Icon({
    name: 'chevron',
    effect: ((direction === 'back') ? 'hflip' : '')
})