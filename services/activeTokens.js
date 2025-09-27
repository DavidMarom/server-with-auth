
const activeTokens = [];

const isTokenActive = (token) => {
    return activeTokens.includes(token);
}

const addActiveToken = (token) => {
    activeTokens.push(token);
}

const removeActiveToken = (token) => {
    const index = activeTokens.indexOf(token);
    if (index > -1) {
        activeTokens.splice(index, 1);
    }
}

module.exports = { activeTokens, isTokenActive, addActiveToken, removeActiveToken };
