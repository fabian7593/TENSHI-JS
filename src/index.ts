//*************************************** */
//              IMPORTS
//*************************************** */

// General libraries
import 'module-alias/register';
import 'reflect-metadata';
import { default as express, Router, Request, Response, NextFunction } from 'express';
import { default as cors } from 'cors';
import { default as bodyParser } from 'body-parser';
import config from '../tenshi-config';
import fs from 'fs';
import path from 'path';

// Internal classes and functions
import { debuggingMessage, insertLogBackend, insertLogTracking } from '@utils/logsUtils';
import StartMiddleware from '@middlewares/StartMiddleware';
import { executeQuery } from '@utils/executionDBUtils';
import { Database } from "@config/TypeORMConnection";
import { sendMail, replaceCompanyInfoEmails } from "@utils/sendEmailsUtils";
import { encryptPassword, decryptPassword } from "@utils/encryptionUtils";
import { getUrlParam, toSnakeCase, getCurrentFunctionName } from "@utils/generalUtils";
import { getEmailTemplate, getMessageEmail } from "@utils/htmlTemplateUtils";

// Generics
export { default as RequestHandler} from "@generics/RequestHandler/RequestHandler";
export { default as RequestHandlerBuilder } from "@generics/RequestHandler/RequestHandlerBuilder";
export { default as GenericController } from "@generics/Controller/GenericController";
export { default as GenericRepository } from "@generics/Repository/GenericRepository";
export { default as GenericRoutes } from "@generics/Route/GenericRoutes";
export { default as IAdapterFromBody } from "@generics/Adapter/IAdapterFromBody";

// Objects
import JWTObject from '@objects/JWTObject';
import ControllerObject from "@objects/ControllerObject";

// Entity
import RoleRepository from "@index/generics/Role/RoleRepository";

// TypeORM entities and utilities
import { EntityTarget, FindManyOptions, FindOneOptions, Repository, EntityManager } from "typeorm";

// External libraries
import multer from "multer";

//*************************************** */
//              EXPORTS
//*************************************** */

// Express-related exports
export { express, cors, bodyParser, Router, Request, Response, NextFunction };

// Objects
export { JWTObject, ControllerObject };

// Utils & helpers
export { default as Validations } from '@helpers/Validations';
export { default as HttpAction } from '@helpers/HttpAction';
export { sendMail, replaceCompanyInfoEmails, debuggingMessage, insertLogBackend, insertLogTracking, config, StartMiddleware, Database, executeQuery };
export { encryptPassword, decryptPassword };
export { getUrlParam, toSnakeCase, getCurrentFunctionName };
export { getEmailTemplate, getMessageEmail };


// Repository
export { RoleRepository };

// External libraries
export { multer, fs, path };

// TypeORM entities and utilities
export { EntityTarget, FindManyOptions, FindOneOptions, Repository, EntityManager };

export {default as JWTService} from '@helpers/JWT'