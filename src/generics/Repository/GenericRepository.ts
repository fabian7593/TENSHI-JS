

import { EntityTarget, FindManyOptions, FindOneOptions, Repository, EntityManager } from "typeorm";
import { Database } from "../../config/TypeORMConnection";
import IGenericRepository from "./IGenericRepository";
import { DataSource } from 'typeorm';

/*
    This class have the Connection to DB with ORM &&
    This class have all the necessary and generic methods some of gets,
    update, delete, logical delete, and add
*/

export default  class GenericRepository implements IGenericRepository{

    //the ds to get it on hereby
    private dataSource: DataSource;

    //This is the dynamic object for entitie DB
    private entityTarget: EntityTarget<any>;

    //this variable is for do dynamic crud, sending the specific entity target
    private entityManager: EntityManager;
    
    //this variable is protected, because we need to use it on hereby classes
    //to do specific CRUDS, to specifics repositories
    private repository: Repository<any>;
   
    //the constructor method init the Singleton of DB connection and send it the entity target
    constructor(entityTarget : EntityTarget<any>) {
        this.dataSource = Database.getInstance();
        this.repository = this.dataSource.getRepository(entityTarget);
        this.entityManager = this.dataSource.manager;
        this.entityTarget = entityTarget;
    }

     /**
     * Getter and Setters
     */
     public getRepository(): Repository<any> {
        return this.repository;
    }

    public getDataSource(): DataSource {
        return this.dataSource;
    }
    
    async add(entity: any): Promise<any> {

        try {
            const savedEntity = await this.entityManager.save(this.entityTarget,entity);
            return savedEntity;

        } catch (error : any) {
            throw error;
        } 
    }

    async update(id: number, 
                 newData: Partial<any>, 
                 hasLogicalDeleted : boolean): Promise<any | undefined> {
        try {
            //update the entity by id, with the new data
            await this.entityManager.update(this.entityTarget, id, newData);

            let options: FindOneOptions<any> = {
                where: { id: id }
            };
            if(hasLogicalDeleted){
                if (typeof options.where === 'object' && options.where !== null) {
                    options.where = {
                        ...options.where,
                        "is_deleted": 0
                    };
                }
            }
            const updatedEntity = await this.entityManager.findOne(this.entityTarget, options); 
            return updatedEntity; 
        } catch (error : any) {
            throw error;
        }
    }

    async remove(id: number): Promise<any> {

        try {
            let options : FindOneOptions;
            options = { where: { id : id }  }; 

            const entity = await this.entityManager.findOne(this.entityTarget, options); 

            //update the entity by id, with the new data
            await this.entityManager.delete(this.entityTarget, id);
            return entity;
           
        } catch (error : any) {
            throw error;
        } 
    }

    async logicalRemove(id: number): Promise<any> {
        try {
            let options : FindOneOptions;
            options = { where: { id : id }  }; 

            const entity = await this.entityManager.findOne(this.entityTarget, options); 

            if (entity["is_deleted"] !== undefined) {
                entity["is_deleted"] = true;
            }
            
            //update the entity by id, with the new data
            await this.entityManager.update(this.entityTarget, id, entity);
            return entity;

        } catch (error : any) {
            throw error;
        } 
    }

    async findById(id: number, 
                   hasLogicalDeleted : boolean): Promise<any> {
        try {
            let options : FindOneOptions;
            options = { where: { id : id}  }; 

            if(hasLogicalDeleted){
                if (typeof options.where === 'object' && options.where !== null) {
                    options.where = {
                        ...options.where,
                        "is_deleted": 0
                    };
                }
            }
            const entity = await this.entityManager.findOne(this.entityTarget, options); 
            return entity;

        } catch (error : any) {
            throw error;

        } 
    }

    async findByCode(code: string, 
                     hasLogicalDeleted : boolean): Promise<any> {
        try {
            let options : FindManyOptions;
            options = { where: { code : code}  }; 

            if(hasLogicalDeleted){
                if (typeof options.where === 'object' && options.where !== null) {
                    options.where = {
                        ...options.where,
                        "is_deleted": 0
                    };
                }
            }
            const entity = await this.entityManager.findOne(this.entityTarget, options); 
            return entity;

        } catch (error : any) {
            throw error;
        } 
    }

    async findAll(hasLogicalDeleted: boolean, 
                  page: number = 1, size: number = 3000): Promise<any[] | null> {
        try {

            const offset = (page - 1) * size;

            //find by user and password
            let options : FindManyOptions;
            if(hasLogicalDeleted){
                options = { where: { "is_deleted" : 0 }  }; 
            }else{
                options = { }; 
            }
            
            options.skip = offset;
            options.take = size;
            const getEntities = await this.entityManager.find(this.entityTarget, options); 
           
            return getEntities;
        } catch (error : any) {
            throw error;
        } 
    }

    async findByFilters(options: FindManyOptions, hasLogicalDeleted: boolean,
                        page: number = 1, size: number = 3000
    ): Promise<any>{
        try {
            const offset = (page - 1) * size;

            if(hasLogicalDeleted){
                if (typeof options.where === 'object' && options.where !== null) {
                    options.where = {
                        ...options.where,
                        "is_deleted": 0
                    };
                }
            }

            options.skip = offset;
            options.take = size;
            const getEntities = await this.entityManager.find(this.entityTarget, options); 
            return getEntities;
        } catch (error : any) {
            throw error;
        }
    }
    
    //Execute query scripting and stored procedures.
    /*async executeQueryExample(user: User): Promise<void>{
       await executeQuery(async (conn) => {
            await conn.query(
                'CALL createUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [user.card_id, user.full_name, user.email, user.status, 
                    user.type, user.password, user.gender, user.birth_date, 
                user.country_iso_code, user.role_code]
            );
        });
    }*/
}

