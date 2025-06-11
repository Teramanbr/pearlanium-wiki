const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// This is the key to fixing the web build
config.resolver.sourceExts.push('cjs');

// This is the key to fixing the native build
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
