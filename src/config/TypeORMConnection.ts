// src/utils/Database.ts
import { DataSource, EntitySchema } from "typeorm";
import { default as config } from "@root/tenshi-config";
import { debuggingMessage } from "@index/index";
import { Log } from "@entity/Log";

// Cambiar MixedList a Array<Function | string | EntitySchema> para que sea iterable
export class Database {

private static instance: DataSource;
    private constructor() {}

    public static getInstance(entities?: Array<Function | string | EntitySchema>): DataSource {

        entities = entities ? [...entities, Log] : [Log];
        
        if (!Database.instance) {
            Database.instance = new DataSource({
                type: "mariadb",
                host: config.DB.HOST,
                port: config.DB.PORT,
                username: config.DB.USER,
                password: config.DB.PASSWORD,
                database: config.DB.NAME,
                entities: [Log],
                synchronize: true,
            });

            Database.instance.initialize()
                .then(() => {
                    debuggingMessage("Data Source has been initialized!");
                })
                .catch((err) => {
                    throw err;
                });
        }

        return Database.instance;
    }


    
   
}
