const bayesian = require("./bayesian.js")

const createBandits = () => {

    const state = {}

    const getState = () => {
        return JSON.parse(JSON.stringify(state))
    }

    const ensureParam = (key) => {
        if (!state[key]) {
            state[key] = { alpha: 1, beta: 1}
        }
        
        return state[key]
    }

    const propose = (keys) => bayesian.suggest(state, keys)

    const update = (params, score) => {


        for (const key in params) { 

            const param = ensureParam(key)
            const value = params[key]

            const reward = score * value
            const penalty = (1 - score) * value

            //console.log({score})
            //console.log({param})
            //console.log({params})

            /*

            if (score >= 0.5) {
                param.alpha += score * value
            } else {
                param.beta += (1 - (score)) * value
            }
                */

            param.alpha += reward
            param.beta += penalty
            
            
        }
    }
    return { propose, update, getState }
}

module.exports = createBandits