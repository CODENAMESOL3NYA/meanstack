const mongoose = require('mongoose');
const {providerSchema} = require('../schemas/provider.schema');

//Create a provider model
const Provider = mongoose.model('Providers',providerSchema);
module.exports = {Provider};
