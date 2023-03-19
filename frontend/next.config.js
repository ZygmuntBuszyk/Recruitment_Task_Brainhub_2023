const withImages = require('next-images');

module.exports = (_phase, { defaultConfig }) => {
    const plugins = [withImages]
    return plugins.reduce((acc, plugin) => plugin(acc), { ...defaultConfig, ...config })
}