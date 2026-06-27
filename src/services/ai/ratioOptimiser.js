const createRatioOptimiser = (state = {}) => {
    let baseline = 0;
    const temperature = 0.5; // Higher temperature = Greedy (Exploit > Explore)

    const ensure = (key) => { // Ensure key has a valid value
        if (!(key in state)) state[key] = 0;
    };

    const softmax = (logits, keys) => { // Turn values into a ratio 
        const max = Math.max(...keys.map(k => logits[k]));
        const exps = {};
        let sum = 0;

        for (const key of keys) {
            exps[key] = Math.exp(logits[key] - max);
            sum += exps[key];
        }
        
        const result = {};
        for (const key of keys) result[key] = exps[key] / sum;
        return result;
    };

    const propose = (keys) => { // Propose a ratio based on past scores
        keys.forEach(ensure);
        const noisyLogits = {};
        for (const key of keys) {
            const u = Math.random();
            const gumbel = -Math.log(-Math.log(u + 1e-10) + 1e-10);
            noisyLogits[key] = state[key] + temperature * gumbel; // Add randomness to encourage exploration
        }
        return softmax(noisyLogits, keys);
    };

    const update = (proposal, reward) => { // Update states based on how high a reward the proposal earnt
        const lr = 0.5;
        const keys = Object.keys(proposal);
        const n = keys.length;

        baseline = 0.95 * baseline + 0.05 * reward;
        const advantage = reward - baseline;

        for (const key of keys) {
            ensure(key);
            state[key] += lr * advantage * (proposal[key] - 1 / n); 
            // Reward based on learning rate, how high the score was and how much the key contributed to the ratio
        }
    };

    const getState = () => structuredClone(state); // Get state for storing

    return { propose, update, getState};
};

module.exports = createRatioOptimiser;