const tags = require('./tags')
const [div, _svg, path, circle, line] = tags('div, svg, path, circle, line')

const svg = (props, children) => {
    props.width = '100%',
    props.heihgt = '100%',
    props.xmlns = 'http://www.w3.org/2000/svg'
    return _svg(props, children)
}

const fSvg = children => svg({viewBox: '-50 -50 100 100'}, children)
const [fCircle, fLine, fPath] = (tags => tags.map(tag => props => {
    props.fill = 'transparent'
    props['stroke-width'] = 5
    props['stroke-linecap'] = 'round'
    return tag(props)
}))([circle, line, path])

const icons = {
    
    chevron: svg({viewBox: '-10 -20 20 40'}, [
        path({
            d: 'M -7 -17 L 7 0 L -7 17',
            'stroke-linecap': 'butt',
            'stroke-width': '3'
        })
    ]),
    
    noFace: fSvg([ fCircle({cx: 0, cy: 0, r: 40}) ]),

    veryHappyFace: fSvg([
        fCircle({cx: 0, cy: 0, r: 40}),
        fLine({x1: -18, y1: -10, x2: -8, y2: -18}),
        fLine({x1: 18, y1: -10, x2: 8, y2: -18}),
        fPath({d: 'M -15 15 C 0 20 0 20 15 15'}),
    ]),
    
    happyFace: fSvg([
        fCircle({cx: 0, cy: 0, r: 40}),
        fCircle({cx: -15, cy: -8, r: 2}),
        fCircle({cx: 15, cy: -8, r: 2}),
        fPath({d: 'M -15 15 C 0 20 0 20 15 15'}),
    ]),

    uncertainFace: fSvg([
        fCircle({cx: 0, cy: 0, r: 40 }),
        fCircle({cx: -15, cy: -8, r: 2 }),
        fCircle({cx: 15, cy: -8, r: 2}),
        fLine({x1: -8, y1: 15, x2: 8, y2: 15}),
    ]),

    unhappyFace: fSvg([
        fCircle({cx: 0, cy: 0, r: 40}),
        fCircle({cx: -15, cy: -8, r: 2}),
        fCircle({cx: 15, cy: -8, r: 2}),
        fPath({d: 'M -15 15 C 0 10 0 10 15 15'}),
    ]),

    veryUnhappyFace: fSvg([
        fCircle({cx: 0, cy: 0, r: 40}),
        fLine({x1: -15, y1: -7, x2: -8, y2: -15}),
        fLine({x1: -8, y1: -15, x2: -15,  y2: -18}),
        fLine({x1: 15, y1: -7, x2: 8, y2: -15}),
        fLine({x1: 8, y1: -15, x2: 15, y2: -18}),
        fPath({d: 'M -18 20 C -15 5 15 5 18 20'}),
    ])
}

module.exports = ({name, effect}) => div({class: `icon ${effect}`}, [icons[name]])