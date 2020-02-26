/* Written by Ye Liu */

import Joi from '@hapi/joi';

const schemas = {
    '/login': Joi.object({
        username: Joi.string().trim().max(20).required(),
        password: Joi.string().alphanum().length(32).required()
    }),

    '/logout': Joi.object(),

    '/getDataset': Joi.object({
        id: Joi.string().trim().max(20).required()
    }),

    '/search': Joi.object({
        keyword: Joi.string().trim().max(100).required(),
        options: Joi.object().keys({
            gid: Joi.boolean(),
            name: Joi.boolean(),
            pinyin: Joi.boolean(),
            introduction: Joi.boolean()
        }).required()
    }),

    '/insert': Joi.object({
        name: Joi.string().trim().max(50).required(),
        pinyin: Joi.string().trim().max(100).required(),
        introduction: Joi.string().trim().max(500).required(),
        geometry: Joi.object().keys({
            id: Joi.string().alphanum().length(32),
            type: Joi.string().min(7).max(17).required(),
            properties: Joi.object().required(),
            geometry: Joi.object().required()
        }).required(),
        image: Joi.object().keys({
            longitude: Joi.boolean(),
            src: Joi.string().max(1048576)
        })
    }),

    '/update': Joi.object({
        gid: Joi.number().integer().required(),
        name: Joi.string().trim().max(50),
        pinyin: Joi.string().trim().max(100),
        introduction: Joi.string().trim().max(500),
        geometry: Joi.object().keys({
            id: Joi.string().alphanum().length(32),
            type: Joi.string().min(7).max(17).required(),
            properties: Joi.object().required(),
            geometry: Joi.object().required()
        }),
        image: Joi.object().keys({
            longitude: Joi.boolean(),
            src: Joi.string().max(1048576)
        })
    }),

    '/delete': Joi.object({
        gid: Joi.number().integer().required()
    })
};

export default async (ctx, next) => {
    // Return if schema not found
    if (!schemas[ctx.path]) {
        return;
    }

    // Validate parameters
    const result = Joi.validate(ctx.method === 'GET' ? ctx.query : ctx.request.body, schemas[ctx.path]);
    if (result.error) {
        // Response error
        ctx.body = {
            success: false,
            errMsg: `${result.error.name}: ${result.error.details[0].message}.`
        };
        return;
    }

    // Call next middleware
    await next();
};
