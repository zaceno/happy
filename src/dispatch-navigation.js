import $ from './dispatch-main'
export default f =>
    $((state, payload) => {
        let news = f(state.navigation, payload)
        let fx = []
        if (Array.isArray(news)) [news, ...fx] = news
        news = { ...state, navigation: news }
        return fx.length ? [news, ...fx] : news
    })
