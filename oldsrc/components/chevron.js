import Icon from './icon'
export default ({ direction }) =>
    Icon({
        name: 'chevron',
        effect: direction === 'right' ? 'hflip' : '',
    })
