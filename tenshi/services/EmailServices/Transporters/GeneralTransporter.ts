import { IEmailTransporter } from '../Interfaces/IEmailTransporter';
import nodemailer from 'nodemailer';
import ConfigManager  from "tenshi/config/ConfigManager";
import { IEmailOptions } from '../Interfaces/IEmailOptions';
import { ConstLogs } from 'tenshi/consts/Const';
import logger from 'tenshi/utils/logger';
const config = ConfigManager.getInstance().getConfig();

export class GeneralTransporter implements IEmailTransporter {
    private emailTransporter: any; 

    constructor() {
        
        this.emailTransporter = nodemailer.createTransport({
            service: config.EMAIL.SERVICE,
            auth: {
                user: config.EMAIL.AUTH_USER, 
                pass: config.EMAIL.AUTH_PASSWORD     
            }
        });
    }

    async sendMail(options: IEmailOptions): Promise<boolean> {
        const mailOptions = {
            from: config.EMAIL.EMAIL_FROM,      
            to: options.toMail,  
            subject: options.subject,      
            html: options.message,
            attachments: options.attachments || []
        };
    
        try {
            await this.emailTransporter.sendMail(mailOptions);
            return true;
        } catch (error) {
            await logger(ConstLogs.LOG_ERROR, `GmailTransporter.sendMail: ` + error);
            return false;
        }
    }
}


