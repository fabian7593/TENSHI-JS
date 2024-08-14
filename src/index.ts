//*************************************** */
//              IMPORTS
//*************************************** */

// General libraries
import 'module-alias/register';
import 'reflect-metadata';
import express, { Router, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

//*************************************** */
//              EXPORTS
//*************************************** */

// Express-related exports
export { express, cors, bodyParser, Router, Request, Response, NextFunction, fs, path };

// Generics and Internal Classes
export { AppConfig } from '../tenshi/config/ConfigManager';
export { default as RequestHandler } from '../tenshi/generics/RequestHandler/RequestHandler';
export { default as RequestHandlerBuilder } from '../tenshi/generics/RequestHandler/RequestHandlerBuilder';
export { default as GenericController } from '../tenshi/generics/Controller/GenericController';
export { default as GenericRepository } from '../tenshi/generics/Repository/GenericRepository';
export { default as GenericRoutes } from '../tenshi/generics/Route/GenericRoutes';
export { default as IAdapterFromBody } from '../tenshi/generics/Adapter/IAdapterFromBody';

// Objects
export { default as JWTObject } from '../tenshi/objects/JWTObject';
export { default as ControllerObject } from '../tenshi/objects/ControllerObject';

// Entity
export { default as RoleRepository } from '../tenshi/generics/Role/RoleRepository';

// TypeORM entities and utilities
export { EntityTarget, FindManyOptions, FindOneOptions, Repository, EntityManager } from 'typeorm';

// External libraries
export { default as multer } from 'multer';

// Utils & Helpers
export { debuggingMessage, insertLogBackend, insertLogTracking } from '../tenshi/utils/logsUtils';
export { default as StartMiddleware } from '../tenshi/middlewares/StartMiddleware';
export { DBPersistanceFactory } from '../tenshi/persistance/DBPersistanceFactory';
export { Database } from '../tenshi/persistance/TypeORMConnection';
export { default as EmailService } from '../tenshi/services/EmailServices/EmailService';
export { encryptPassword, decryptPassword } from '../tenshi/utils/encryptionUtils';
export { getUrlParam, toSnakeCase, getCurrentFunctionName } from '../tenshi/utils/generalUtils';
export { getEmailTemplate, getMessageEmail } from '../tenshi/utils/htmlTemplateUtils';

// Additional exports
export { default as ConfigManager } from '../tenshi/config/ConfigManager';
export { default as RateLimitMiddleware } from '../tenshi/middlewares/RateLimitMiddleware';
export { default as Validations } from '../tenshi/helpers/Validations';
export { default as HttpAction } from '../tenshi/helpers/HttpAction';
export { default as JWTService } from '../tenshi/helpers/JWT';
export { ConstGeneral, ConstHTTPRequest, ConstLogs, ConstMessagesJson, ConstStatusJson } from '../tenshi/consts/Const';
