const normalRandom = () => {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
};

const sampleGammaGE1 = (shape) => {
    const d = shape - 1 / 3;
    const c = 1 / Math.sqrt(9 * d);

    while (true) {
        let x, v;
        do {
            x = normalRandom();
            v = Math.pow(1 + c * x, 3);
        } while (v <= 0);

        const u = Math.random();
        const logAccept = 0.5 * x * x + d - d * v + d * Math.log(v);

        if (Math.log(u) < logAccept) {
            return d * v;
        }
    }
};

const sampleGamma = (shape) => {
    if (shape <= 0) shape = 1e-3;
    if (shape < 1) {
        const g = sampleGammaGE1(shape + 1);
        const u = Math.random();
        return g * Math.pow(u, 1 / shape);
    }
    return sampleGammaGE1(shape);
};

const sampleBeta = (a, b) => {
    const mean = a / (a + b);
    const noise = (Math.random() - 0.5) * 0.1
    return Math.max(0, Math.min(1, mean + noise));
};

const suggest = (state = {}, keys = []) => {
    const result = {}
    let sum = 0

    for (const key of keys) {
        
        const param = state[key]

        const alpha = param?.alpha ?? 1
        const beta = param?.beta ?? 1

        const value = sampleBeta(alpha, beta)
        result[key] = value
        sum += value
    }

    for (const key of keys) {
        result[key] /= sum
    }

    return result
}

module.exports = { suggest }