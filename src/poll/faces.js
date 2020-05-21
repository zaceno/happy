import html from 'hyperlit'
import css from './style.css'

const Face = (_, features) => html`
    <svg class=${css.face} viewBox="-50 -50 100 100">
        <circle cx="0" cy="0" r="40" />
        ${features}
    </svg>`

export const None = () => Face({}, [])

export const VeryHappy = () => html`
    <${Face}>
        <line x1="-18" y1="-10" x2="-8" y2="-18" />
        <line x1="18" y1="-10" x2="8" y2="-18" />
        <path d="M -15 15 C 0 20 0 20 15 15" />
    <//>`

export const Happy = () => html`
    <${Face}>
        <circle cx="-15" cy="-8" r="2" />
        <circle cx="15" cy="-8" r="2" />
        <path d="M -15 15 C 0 20 0 20 15 15" />
    <//>`

export const Meh = () => html`
    <${Face}>
        <circle cx="-15" cy="-8" r="2" />
        <circle cx="15" cy="-8" r="2" />
        <line x1="-15" y1="15" x2="15" y2="15" />
    <//>`

export const Unhappy = () => html`
    <${Face}>
        <circle cx="-15" cy="-8" r="2" />
        <circle cx="15" cy="-8" r="2" />
        <path d="M -15 15 C 0 10 0 10 15 15" />
    <//>`

export const VeryUnhappy = () => html`
    <${Face}>
        <line x1="-15" y1="-7" x2="-8" y2="-15" />
        <line x1="-8" y1="-15" x2="-15" y2="-18" />
        <line x1="15" y1="-7" x2="8" y2="-15" />
        <line x1="8" y1="-15" x2="15" y2="-18" />
        <path d="M -18 20 C -15 5 15 5 18 20" />
    <//>`


