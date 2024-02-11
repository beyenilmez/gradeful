const LicensePlugin = require('webpack-license-plugin');

module.exports = function override(config, env) {
    // Add the LicensePlugin to the plugins array
    config.plugins.push(
        new LicensePlugin({
            outputFilename: 'licenses.json'
        }),
    );

    return config;
};
