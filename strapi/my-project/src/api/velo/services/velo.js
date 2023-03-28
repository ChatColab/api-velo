'use strict';

/**
 * velo service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::velo.velo');
